import getEnabledActions from "../../utils/getEnabledActions.js";
import logger from "../../utils/logger.js";
import sendEventToIframe from "../../utils/sendEvent.js";
const chatProviderSendMessageEventHandler = async (data) => {
    try {
        if (!window.$aiChatWidget.chatProvider) {
            throw new Error("Chat provider is not initialized.");
        }
        if (!window.$aiChatWidget.chatProvider.sendMessage) {
            throw new Error("Chat provider has not implemented sending messages.");
        }
        const enabledActions = getEnabledActions();
        data.enabledActions = enabledActions;
        const result = await window.$aiChatWidget.chatProvider?.sendMessage(data);
        if (!result) {
            throw new Error("An error occurred while sending the message.");
        }
        // Send the result back to the iframe
        sendEventToIframe("chatProviderSendMessage", {
            data: result,
        });
    }
    catch (error) {
        logger.error("Error handling chatProviderSendMessage event:", error);
        // Send error back to iframe
        sendEventToIframe("chatProviderSendMessage", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
export default chatProviderSendMessageEventHandler;
