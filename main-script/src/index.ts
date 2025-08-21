import NavigableChatProvider from "./adapters/ChatProvider/navigable.js";
import { injectAiChatWidget } from "./inject.js";
import { sendMainEventFn, ChatWidgetConfig, ChatProvider } from "./types.js";
import toggleColorScheme from "../../dev-host/js/main-script/utils/toggleColorScheme";
import { getColorScheme } from "./utils/toggleColorScheme";

// Extend the Window interface to $aiChatWidget & initAiChatWidget
declare global {
  interface Window {
    $aiChatWidget: {
      Iframe?: HTMLIFrameElement;
      sendEvent: sendMainEventFn;
      initialConfig?: ChatWidgetConfig;
      chatProvider?: ChatProvider;
      toggle: () => void;
      open: () => void;
      close: () => void;
      colorScheme: "light" | "dark";
      toggleColorScheme: (colorScheme?: "light" | "dark") => void;
      getColorScheme: () => "light" | "dark";
    };
    initAiChatWidget: (config: ChatWidgetConfig) => void;
    NavigableChatProvider: typeof NavigableChatProvider;
  }
}

export * from "./consts.js";
export * from "./types.js";
export * from "./inject.js";

window.initAiChatWidget = injectAiChatWidget;
window.NavigableChatProvider = NavigableChatProvider;
