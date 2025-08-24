import {
  NavigableChatProvider,
  NavigableProxyChatProvider,
} from "./adapters/ChatProvider/index.js";
import { injectAiChatWidget } from "./inject.js";
import { ChatProvider, ChatWidgetConfig, sendMainEventFn } from "./types.js";

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
    // NavigableChatProvider: typeof NavigableChatProvider;
    // NavigableProxyChatProvider: typeof NavigableProxyChatProvider;
  }
}

export * from "./consts.js";
export * from "./inject.js";
export * from "./types.js";

window.initAiChatWidget = injectAiChatWidget;
// window.NavigableChatProvider = NavigableChatProvider;
// window.NavigableProxyChatProvider = NavigableProxyChatProvider;
