export type sendMainEventFn = (
  type: EventTypeMain,
  data?: Record<string, any>
) => void;

export type EventTypeMain = "set_config";

export type sendIframeEventFn = (
  type: EventTypeIframe,
  data?: Record<string, any>
) => void;

export type EventTypeIframe = "init" | "LOG";

export type EventHandler = <T extends any>(
  data: MessageEvent<T>["data"]
) => void;

export interface ChatWidgetConfig {
  debug?: boolean;
}
