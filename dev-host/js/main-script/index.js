import { NavigableChatProvider, NavigableProxyChatProvider, } from "./adapters/ChatProvider/index.js";
import { injectAiChatWidget } from "./inject.js";
export * from "./consts.js";
export * from "./inject.js";
export * from "./types.js";
window.initAiChatWidget = injectAiChatWidget;
window.NavigableChatProvider = NavigableChatProvider;
window.NavigableProxyChatProvider = NavigableProxyChatProvider;
