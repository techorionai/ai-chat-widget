import { injectAiChatWidget } from "./inject.js";
export * from "./consts.js";
export * from "./inject.js";
export * from "./types.js";
if (typeof window !== "undefined") {
    window.initAiChatWidget = injectAiChatWidget;
}
