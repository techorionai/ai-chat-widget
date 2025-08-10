import { useParams } from "react-router";
import { useConfig } from "../../../../providers/ConfigProvider";
import { CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY } from "../../../../consts/queryKeys";
import sendEventToMain from "../../../../utils/sendEvent";
import { useQueries } from "@tanstack/react-query";
import {
  ChatProviderListSessionMessagesMessage,
  DataOrError,
} from "../../../../types/mainProcess";
import getQueryDataOrError from "../../../../utils/getQueryDataOrError";
import { Stack } from "@mantine/core";
import ChatWindowMessage from "./Message";

export default function ChatWindowMessages() {
  const { config } = useConfig();
  const { sessionId } = useParams();
  const isNewSession = sessionId === "new" || !sessionId;

  const queryKey = CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY(
    isNewSession ? "new" : (sessionId as string)
  );

  const [messagesListRes] = useQueries({
    queries: [
      {
        queryKey,
        queryFn: async () => {
          if (!isNewSession) {
            sendEventToMain("chatProviderListSessionMessages", {
              sessionId: sessionId || "new",
              queryKey,
            });
          }
          return {
            loading: true,
            data: {
              sessionId: sessionId || "new",
              messages: [],
            } as {
              sessionId: string;
              messages: ChatProviderListSessionMessagesMessage[];
            },
          } as DataOrError<ChatProviderListSessionMessagesMessage[]>;
        },
      },
    ],
  });

  const {
    component: Component,
    hasError,
    data: messagesList,
  } = getQueryDataOrError(messagesListRes);
  if (hasError || !messagesList) {
    return Component;
  }

  return (
    <Stack>
      {messagesList.map((message, idx) => (
        <ChatWindowMessage
          {...message}
          key={`message-${message.content}-${message.createdAt}-${idx}`}
        />
      ))}
    </Stack>
  );
}
