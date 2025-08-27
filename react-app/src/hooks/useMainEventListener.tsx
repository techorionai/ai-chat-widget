import { useEffect } from "react";
import { EventTypeMain } from "../types/mainProcess";

export function useMainEventListener(
  handlers: Partial<Record<EventTypeMain, (data: any) => void>>
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const eventType = event.data?.type as EventTypeMain | undefined;
      if (!eventType) return;
      const handler = handlers[eventType];
      if (typeof handler === "function") {
        handler(event.data?.data);
      }
    };
    window.addEventListener("message", handleMessage);
    // Optionally send "init" event here if needed
    return () => window.removeEventListener("message", handleMessage);
  }, [handlers]);
}
