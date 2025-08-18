import { Blockquote, Box, Button, Group, Paper, Text } from "@mantine/core";
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

export default function SessionsList() {
  const navigate = useNavigate();
  const { borderColor } = useConfigColors();

  const form = useForm({
    initialValues: {
      newSessionError: null as string | null,
      newSessionLoading: false,
    },
  });

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

  return (
    <Box>
      {sessionList.map((session) => (
        <NavLink
          to={`/sessions/${session.id}?${session.closed ? "closed=true" : ""}`}
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
      <Box ta="center" mt="xl" pb="xl">
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
  );
}
