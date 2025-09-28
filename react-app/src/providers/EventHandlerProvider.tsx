import merge from "lodash.merge";
import React, { createContext, useContext, useEffect } from "react";

import {
  ChatProviderListSessionMessagesMessage,
  ChatProviderSession,
  ChatWidgetConfig,
  DataOrError,
  EventTypeMain,
} from "../types/mainProcess";
import logToIframe from "../utils/logger";
import sendEventToMain from "../utils/sendEvent";
import { useConfig } from "./ConfigProvider";
import { useQueryClient } from "@tanstack/react-query";
import {
  CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY,
  CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY,
} from "../consts/queryKeys";
import { useNavigate, useParams } from "react-router";
import { useMantineColorScheme } from "@mantine/core";

// EventHandler context (could be expanded for more event features)
const EventHandlerContext = createContext<null>(null);

export const EventHandlerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { setConfig } = useConfig();
  const queryClient = useQueryClient();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const setConfigEventHandler = (
    data: ChatWidgetConfig = {},
    override?: boolean
  ) => {
    setConfig((prev) => (override ? data : merge({}, prev, data)));
    if (
      data.chatWindow?.defaults?.colorScheme &&
      ["light", "dark"].includes(data.chatWindow.defaults.colorScheme)
    ) {
      if (data.chatWindow.defaults.colorScheme !== colorScheme) {
        setColorScheme(data.chatWindow.defaults.colorScheme);
      }
    }
  };

  const toggleExpandEventHandler = (data: {
    success?: boolean;
    expanded?: boolean;
  }) => {
    if (data.success) {
      setConfig((prevConfig) => {
        // Use prevConfig instead of the captured config
        if (!prevConfig.chatWindow) {
          logToIframe(
            "error",
            "ChatWindow config is missing in toggleExpand handler",
            { prevConfig, data }
          );
          return prevConfig; // Return unchanged if invalid
        }

        return merge({}, prevConfig, {
          chatWindow: {
            expanded: data.expanded,
          },
        });
      });
    }
  };

  const listSessionsEventHandler = (
    data: DataOrError<ChatProviderSession[]> & { newSession?: boolean }
  ) => {
    queryClient.setQueryData(CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY, () => data);
    if (data.newSession && "data" in data) {
      navigate(`/sessions/${data.data?.[0]?.id || "new"}`);
    }
  };

  const listSessionMessagesEventHandler = ({
    sessionId,
    ...data
  }: DataOrError<ChatProviderListSessionMessagesMessage[]> & {
    sessionId: string;
    loading?: boolean;
  }) => {
    const queryKey = CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY(
      sessionId || "new"
    );
    if (sessionId === "new") {
      sendEventToMain("chatProviderListSessions", { newSession: true });
      data.loading = true;
    }
    queryClient.setQueryData(queryKey, () => data);
  };

  const toggleColorSchemeEventHandler = (data: {
    colorScheme?: "light" | "dark";
  }) => {
    if (data.colorScheme && ["light", "dark"].includes(data.colorScheme)) {
      setColorScheme(data.colorScheme);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      logToIframe("log", "Received event from parent:", event.data);
      const eventType = event.data?.type;
      if (!eventType) return;
      switch (eventType as EventTypeMain) {
        case "set_config":
          setConfigEventHandler(event.data?.data);
        case "override_config":
          setConfigEventHandler(event.data?.data, true);
          break;
        case "toggleExpand":
          toggleExpandEventHandler(event.data?.data);
          break;
        case "chatProviderListSessions":
          listSessionsEventHandler(event.data?.data);
          break;
        case "chatProviderListSessionMessages":
          listSessionMessagesEventHandler(event.data?.data);
          break;
        case "chatProviderSendMessage":
          // Handled at the component level
          break;
        case "chatProviderCreateSession":
          // Handled at the component level
          break;
        case "toggleColorScheme":
          toggleColorSchemeEventHandler(event.data?.data);
          break;
        default:
          console.warn(`Unhandled event type: ${eventType}`, event.data);
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    sendEventToMain("init", {});
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <EventHandlerContext.Provider value={null}>
      {children}
    </EventHandlerContext.Provider>
  );
};

export const useEventHandler = () => useContext(EventHandlerContext);
