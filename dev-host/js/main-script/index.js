import NavigableChatProvider from "./adapters/ChatProvider/navigable.js";
import { injectAiChatWidget } from "./inject.js";
export * from "./consts.js";
export * from "./types.js";
export * from "./inject.js";
window.initAiChatWidget = injectAiChatWidget;
window.NavigableChatProvider = NavigableChatProvider;
