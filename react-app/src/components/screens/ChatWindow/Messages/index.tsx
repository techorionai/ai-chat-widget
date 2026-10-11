import { Blockquote, Box, ScrollArea, Stack, Text } from "@mantine/core";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  AI_CHAT_WINDOW_HEADER_ID,
  AI_CHAT_WINDOW_MESSAGE_BOX_ID,
} from "../../../../consts/elementIds";
import { CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY } from "../../../../consts/queryKeys";
import useElementSizeById from "../../../../hooks/useElementSizeById";
import { useConfig } from "../../../../providers/ConfigProvider";
import {
  ChatProviderListSessionMessagesMessage,
  DataOrError,
} from "../../../../types/mainProcess";
import getQueryDataOrError from "../../../../utils/getQueryDataOrError";
import logToIframe from "../../../../utils/logger";
import sendEventToMain from "../../../../utils/sendEvent";
import ChatWindowMessage from "./Message";

interface IChatWindowMessagesProps {
  isResponding?: boolean;
  respondingMessage?: string;
  respondingError?: string | null;
}

export default function ChatWindowMessages(props: IChatWindowMessagesProps) {
  const { sessionId } = useParams();
  const isNewSession = sessionId === "new" || !sessionId;
  const { config } = useConfig();

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
            loading: sessionId === "new" ? false : true,
            sessionId: sessionId || "new",
            data: [] as ChatProviderListSessionMessagesMessage[],
          } as DataOrError<ChatProviderListSessionMessagesMessage[]> & {
            sessionId: string;
          };
        },
      },
    ],
  });

  const {
    component: Component,
    hasError,
    data: messagesList,
  } = getQueryDataOrError(messagesListRes, {
    containerSize: `calc(100vh - ${occupiedHeight}px)`,
  });

  // Scroll to the bottom, or to the start of the latest message.
  // Returns a function that cancels the scroll that is waiting.
  const scrollToTarget = (
    mode: "bottom" | "latest-start",
    messages: ChatProviderListSessionMessagesMessage[]
  ) => {
    const timer = setTimeout(() => {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        const viewport = scrollAreaViewportRef.current;
        if (!viewport) return;

        let top = viewport.scrollHeight;

        if (mode === "latest-start") {
          // Tool messages render nothing, so skip them
          let latestIndex = -1;
          for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].role !== "tool") {
              latestIndex = i;
              break;
            }
          }
          const element = viewport.querySelector<HTMLElement>(
            `[data-message-index="${latestIndex}"]`
          );
          if (element) {
            top =
              element.getBoundingClientRect().top -
              viewport.getBoundingClientRect().top +
              viewport.scrollTop -
              8;
          }
        }

        logToIframe(
          `Scrolling messages list for session ${sessionId} (${mode})`,
          top
        );
        viewport.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth", // Optional: adds smooth scrolling animation
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  };

  // Scroll when messages change and data is actually loaded.
  // Also runs on mount with existing messages.
  useEffect(() => {
    if (
      !messagesList ||
      messagesList.length === 0 ||
      messagesListRes.isLoading
    ) {
      return;
    }

    // Show the user's message, the loader, or the error at the bottom.
    // Show a reply, or loaded history, from the start of the latest message.
    const mode =
      props.isResponding || props.respondingError ? "bottom" : "latest-start";
    return scrollToTarget(mode, messagesList);
  }, [
    messagesList,
    messagesListRes.isLoading,
    props.isResponding,
    props.respondingError,
  ]);

  if (hasError || !messagesList) {
    return Component;
  }

  return (
    <ScrollArea
      h={`calc(100vh - ${occupiedHeight}px)`}
      viewportRef={scrollAreaViewportRef}
    >
      <Stack p="md">
        {config?.chatWindow?.welcomeMessage &&
          config?.chatWindow?.welcomeMessage?.infoText && (
            <Text size="sm" c="gray" ta="center" px="md">
              {config.chatWindow.welcomeMessage.infoText}
            </Text>
          )}
        {config?.chatWindow?.welcomeMessage &&
          config?.chatWindow?.welcomeMessage?.message && (
            <ChatWindowMessage
              role="assistant"
              content={config.chatWindow.welcomeMessage.message}
              createdAt={new Date().toISOString()}
              suggestedActions={config.chatWindow.welcomeMessage.actions}
            />
          )}
        {messagesList.map((message, idx) => (
          <Box
            data-message-index={idx}
            key={`message-${message.content}-${message.createdAt}-${idx}`}
          >
            <ChatWindowMessage {...message} />
          </Box>
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
