import logger from "../../utils/logger.js";
import sendEventToIframe from "../../utils/sendEvent.js";
const chatProviderListSessionsEventHandler = async (data) => {
    try {
        if (!window.$aiChatWidget.chatProvider) {
            throw new Error("Chat provider is not initialized.");
        }
        if (!window.$aiChatWidget.chatProvider.listSessions) {
            throw new Error("Chat provider does not support listing sessions.");
        }
        const result = await window.$aiChatWidget.chatProvider?.listSessions(data || {});
        if (!result) {
            throw new Error("An error occurred while listing sessions.");
        }
        // Send the result back to the iframe
        sendEventToIframe("chatProviderListSessions", {
            data: result,
            newSession: data?.newSession ? data?.newSession : false,
        });
    }
    catch (error) {
        logger.error("Error handling chatProviderListSessions event:", error);
        // Send error back to iframe
        sendEventToIframe("chatProviderListSessions", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
export default chatProviderListSessionsEventHandler;
