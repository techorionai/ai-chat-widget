import { sendMainEventFn, ChatWidgetConfig } from "./types.js";
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
