import { Blockquote, ScrollArea, Stack } from "@mantine/core";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router";
import { CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY } from "../../../../consts/queryKeys";
import {
  ChatProviderListSessionMessagesMessage,
  DataOrError,
} from "../../../../types/mainProcess";
import getQueryDataOrError from "../../../../utils/getQueryDataOrError";
import sendEventToMain from "../../../../utils/sendEvent";
import ChatWindowMessage from "./Message";
import useElementSizeById from "../../../../hooks/useElementSizeById";
import {
  AI_CHAT_WINDOW_HEADER_ID,
  AI_CHAT_WINDOW_MESSAGE_BOX_ID,
} from "../../../../consts/elementIds";
import { useEffect, useRef } from "react";
import logToIframe from "../../../../utils/logger";

interface IChatWindowMessagesProps {
  isResponding?: boolean;
  respondingMessage?: string;
  respondingError?: string | null;
}

export default function ChatWindowMessages(props: IChatWindowMessagesProps) {
  const { sessionId } = useParams();
  const isNewSession = sessionId === "new" || !sessionId;

  const queryKey = CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY(
    isNewSession ? "new" : (sessionId as string)
  );

  const scrollAreaViewportRef = useRef<HTMLDivElement | null>(null);

  const pad = 48;
  const { height: headerHeight } = useElementSizeById(AI_CHAT_WINDOW_HEADER_ID);
  const { height: messageBoxHeight } = useElementSizeById(
    AI_CHAT_WINDOW_MESSAGE_BOX_ID
  );
  const occupiedHeight = headerHeight + messageBoxHeight + pad;

  const [messagesListRes] = useQueries({
    queries: [
      {
        queryKey,
        queryFn: async () => {
          if (!isNewSession) {
            sendEventToMain("chatProviderListSessionMessages", {
              sessionId: sessionId || "new",
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

  const scrollToBottom = () => {
    setTimeout(() => {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (scrollAreaViewportRef.current) {
          const viewport = scrollAreaViewportRef.current;
          logToIframe(
            `Scrolling to bottom of messages list for session ${sessionId}`,
            viewport.scrollHeight
          );
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: "smooth", // Optional: adds smooth scrolling animation
          });
        }
      });
    }, 100);
  };

  const {
    component: Component,
    hasError,
    data: messagesList,
  } = getQueryDataOrError(messagesListRes);

  // Scroll when messages change and data is actually loaded
  useEffect(() => {
    if (messagesList && messagesList.length > 0 && !messagesListRes.isLoading) {
      scrollToBottom();
    }
  }, [messagesList, messagesListRes.isLoading, props.isResponding]);

  // Also scroll when the component first mounts with existing messages
  useEffect(() => {
    if (messagesList && messagesList.length > 0) {
      // Small delay to ensure ScrollArea is fully rendered
      setTimeout(scrollToBottom, 100);
    }
  }, []);

  if (hasError || !messagesList) {
    return Component;
  }

  return (
    <ScrollArea
      h={`calc(100vh - ${occupiedHeight}px)`}
      viewportRef={scrollAreaViewportRef}
    >
      <Stack p="md">
        {messagesList.map((message, idx) => (
          <ChatWindowMessage
            {...message}
            key={`message-${message.content}-${message.createdAt}-${idx}`}
          />
        ))}
        {props.isResponding &&
          props.respondingMessage &&
          props.respondingMessage?.length > 0 && (
            <ChatWindowMessage
              role="user"
              content={props.respondingMessage}
              createdAt={new Date().toISOString()}
            />
          )}
        {props.isResponding && (
          <ChatWindowMessage
            role="assistant"
            content=""
            isLoading={true}
            createdAt={new Date().toISOString()}
          />
        )}
        {props.respondingError && (
          <Blockquote color="red" p="xs">
            {props.respondingError}
          </Blockquote>
        )}
      </Stack>
    </ScrollArea>
  );
}
