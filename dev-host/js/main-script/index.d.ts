import { ChatProvider, ChatWidgetConfig, sendMainEventFn } from "./types.js";
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
    }
}
export * from "./consts.js";
export * from "./inject.js";
export * from "./types.js";
export * from "./adapters/ChatProvider/index.js";
