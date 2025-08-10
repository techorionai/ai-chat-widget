import logger from "../../utils/logger.js";
import sendEventToIframe from "../../utils/sendEvent.js";
const chatProviderListSessionMessagesEventHandler = async (data) => {
    try {
        if (!window.$aiChatWidget.chatProvider) {
            throw new Error("Chat provider is not initialized.");
        }
        if (!window.$aiChatWidget.chatProvider.listSessionMessages) {
            throw new Error("Chat provider does not support listing sessions.");
        }
        const result = await window.$aiChatWidget.chatProvider?.listSessionMessages(data);
        logger.log("chatProviderListSessionMessages result:", result);
        if (!result) {
            throw new Error("An error occurred while listing sessions.");
        }
        // Send the result back to the iframe
        sendEventToIframe("chatProviderListSessionMessages", {
            data: result,
            sessionId: data.sessionId || "new",
        });
    }
    catch (error) {
        logger.error("Error handling chatProviderListSessionMessages event:", error);
        // Send error back to iframe
        sendEventToIframe("chatProviderListSessionMessages", {
            error: error instanceof Error ? error.message : String(error),
            sessionId: data.sessionId || "new",
        });
    }
};
export default chatProviderListSessionMessagesEventHandler;
