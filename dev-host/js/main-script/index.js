import NavigableChatProvider from "./adapters/ChatProvider/navigable/navigable.js";
import { injectAiChatWidget } from "./inject.js";
export * from "./consts.js";
export * from "./inject.js";
export * from "./types.js";
window.initAiChatWidget = injectAiChatWidget;
window.NavigableChatProvider = NavigableChatProvider;
