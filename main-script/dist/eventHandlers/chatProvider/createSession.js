import logger from "../../utils/logger.js";
import sendEventToIframe from "../../utils/sendEvent.js";
const chatProviderCreateSessionHandler = async () => {
    try {
        if (!window.$aiChatWidget.chatProvider) {
            throw new Error("Chat provider is not initialized.");
        }
        if (!window.$aiChatWidget.chatProvider.createSession) {
            throw new Error("Chat provider does not support listing sessions.");
        }
        let sessionId = await window.$aiChatWidget.chatProvider?.createSession();
        // If the sessionId is undefined or null, we set it to "new"
        // If the provider throws an error, only then we say it has failed
        if (!sessionId) {
            sessionId = "new";
        }
        // Send the result back to the iframe
        sendEventToIframe("chatProviderCreateSession", {
            data: sessionId,
        });
    }
    catch (error) {
        logger.error("Error handling createSession event:", error);
        sendEventToIframe("chatProviderCreateSession", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
export default chatProviderCreateSessionHandler;
