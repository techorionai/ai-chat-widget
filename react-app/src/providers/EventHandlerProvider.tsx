import React, { createContext, useContext, useEffect } from "react";
import { useConfig } from "./ConfigProvider";
import sendEventToMain from "../utils/sendEvent";
import {
  ChatWidgetConfig,
  EventHandler,
  EventTypeMain,
} from "../types/mainProcess";
import { PARENT_ORIGIN } from "../consts/parent";

// EventHandler context (could be expanded for more event features)
const EventHandlerContext = createContext<null>(null);

export const EventHandlerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { config, setConfig } = useConfig();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== PARENT_ORIGIN) return;

      const eventType = event.data?.type;
      if (!eventType) return;
      switch (eventType as EventTypeMain) {
        case "set_config":
          setConfigEventHandler(event.data?.data);
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

  const setConfigEventHandler = (data: ChatWidgetConfig = {}) => {
    setConfig({ ...config, ...data });
  };

  return (
    <EventHandlerContext.Provider value={null}>
      {children}
    </EventHandlerContext.Provider>
  );
};

export const useEventHandler = () => useContext(EventHandlerContext);
