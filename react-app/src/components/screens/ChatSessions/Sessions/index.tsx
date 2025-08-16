import { Box, Group, Paper, Text } from "@mantine/core";
import { useQueries } from "@tanstack/react-query";
import { NavLink } from "react-router";
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

export default function SessionsList() {
  const { borderColor } = useConfigColors();

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
    </Box>
  );
}
