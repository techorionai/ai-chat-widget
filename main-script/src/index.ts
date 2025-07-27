import { injectAiChatWidget } from "./inject.js";
import { sendMainEventFn, ChatWidgetConfig } from "./types.js";

// Extend the Window interface to $aiChatWidget & initAiChatWidget
declare global {
  interface Window {
    $aiChatWidget: {
      Iframe?: HTMLIFrameElement;
      sendEvent: sendMainEventFn;
      initialConfig?: ChatWidgetConfig;
    };
    initAiChatWidget: (config: ChatWidgetConfig) => void;
  }
}

export * from "./consts.js";
export * from "./types.js";
export * from "./inject.js";

window.initAiChatWidget = injectAiChatWidget;
