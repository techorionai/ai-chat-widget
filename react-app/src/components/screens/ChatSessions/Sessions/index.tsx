import {
  Blockquote,
  Box,
  Button,
  Group,
  Paper,
  Text,
  Collapse,
  ScrollArea,
} from "@mantine/core";
import { useQueries } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";
import { CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY } from "../../../../consts/queryKeys";
import useConfigColors from "../../../../hooks/useConfigColors";
import {
  ChatProviderSession,
  DataOrError,
} from "../../../../types/mainProcess";
import getPrettyDate from "../../../../utils/getPrettyDate";
import getQueryDataOrError from "../../../../utils/getQueryDataOrError";
import sendEventToMain from "../../../../utils/sendEvent";
import ChatWindowHeaderAvatar from "../../ChatWindow/Header/Avatar";
import { IconSend2 } from "@tabler/icons-react";
import { useMainEventListener } from "../../../../hooks/useMainEventListener";
import { useForm } from "@mantine/form";

import { useDisclosure } from "@mantine/hooks";
import useElementSizeById from "../../../../hooks/useElementSizeById";
import { AI_CHAT_WINDOW_SESSIONS_HEADER_ID } from "../../../../consts/elementIds";

export default function SessionsList() {
  const navigate = useNavigate();
  const { borderColor } = useConfigColors();

  const form = useForm({
    initialValues: {
      newSessionError: null as string | null,
      newSessionLoading: false,
    },
  });

  const [opened, { toggle }] = useDisclosure(false);

  const pad = 32;
  const { height: headerHeight } = useElementSizeById(
    AI_CHAT_WINDOW_SESSIONS_HEADER_ID
  );
  const occupiedHeight = headerHeight + pad;

  const [sessionsListRes] = useQueries({
    queries: [
      {
        queryKey: CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY,
        queryFn: async () => {
          sendEventToMain("chatProviderListSessions");
          return {
            loading: true,
            data: [] as ChatProviderSession[],
          } as DataOrError<ChatProviderSession[]>;
        },
      },
    ],
  });

  useMainEventListener({
    chatProviderCreateSession: (data: DataOrError<string>) => {
      if ("error" in data) {
        form.setValues({
          newSessionLoading: false,
          newSessionError: data.error,
        });
      } else if ("data" in data) {
        setTimeout(() => {
          if (data.data !== "new") {
            sendEventToMain("chatProviderListSessions", { newSession: true });
          }
          form.setValues({ newSessionLoading: false, newSessionError: null });
          navigate(`/sessions/${data.data}`);
        }, 500);
      }
    },
  });

  const onCreateSession = () => {
    if (form.values.newSessionLoading) return;
    form.setValues({ newSessionLoading: true, newSessionError: null });
    sendEventToMain("chatProviderCreateSession");
  };

  const {
    component: Component,
    hasError,
    data: sessionList,
  } = getQueryDataOrError(sessionsListRes);
  if (hasError || !sessionList) {
    return Component;
  }

  // Split sessions
  const firstFive = sessionList.slice(0, 5);
  const remaining = sessionList.slice(5);

  return (
    <ScrollArea h={`calc(100vh - ${occupiedHeight}px)`}>
      <Box>
        {firstFive.map((session) => (
          <NavLink
            to={`/sessions/${session.id}?${
              session.closed ? "closed=true" : ""
            }`}
            key={session.id}
          >
            <Paper
              className="cursor-pointer"
              p="sm"
              radius="0px"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <Group align="center">
                <ChatWindowHeaderAvatar />
                <Box>
                  <Text>{session.title}</Text>
                  <Text fz="xs" c="gray">
                    {getPrettyDate(session.createdAt)}
                  </Text>
                </Box>
              </Group>
            </Paper>
          </NavLink>
        ))}
        {remaining.length > 0 && (
          <>
            <Collapse in={opened} id="sessions-collapse">
              {remaining.map((session) => (
                <NavLink
                  to={`/sessions/${session.id}?${
                    session.closed ? "closed=true" : ""
                  }`}
                  key={session.id}
                >
                  <Paper
                    className="cursor-pointer"
                    p="sm"
                    radius="0px"
                    style={{ borderBottom: `1px solid ${borderColor}` }}
                  >
                    <Group align="center">
                      <ChatWindowHeaderAvatar />
                      <Box>
                        <Text>{session.title}</Text>
                        <Text fz="xs" c="gray">
                          {getPrettyDate(session.createdAt)}
                        </Text>
                      </Box>
                    </Group>
                  </Paper>
                </NavLink>
              ))}
            </Collapse>
            <Box ta="center" mt="md">
              <Button
                onClick={toggle}
                aria-expanded={opened}
                aria-controls="sessions-collapse"
                variant="subtle"
                size="xs"
                mb="xs"
              >
                {opened ? "View less" : `View more (${remaining.length})`}
              </Button>
            </Box>
          </>
        )}
        <Box ta="center" mt="sm" pb="xl">
          <Button
            rightSection={<IconSend2 size={18} />}
            mx="auto"
            onClick={onCreateSession}
            loading={form.values.newSessionLoading}
            disabled={form.values.newSessionLoading}
          >
            Send us a message
          </Button>
          {form.values.newSessionError &&
            form.values.newSessionError?.length > 0 && (
              <Blockquote color="red" mt="md" p="xs">
                {form.values.newSessionError}
              </Blockquote>
            )}
        </Box>
      </Box>
    </ScrollArea>
  );
}
