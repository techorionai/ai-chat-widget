import logger from "../utils/logger.js";
import sendEventToIframe from "../utils/sendEvent.js";
const initEventHandler = (data) => {
    try {
        if (!window.$aiChatWidget.initialConfig) {
            throw new Error("Chat widget initial config is not set.");
        }
        sendEventToIframe("set_config", window.$aiChatWidget.initialConfig);
    }
    catch (error) {
        logger.error(error);
    }
};
export default initEventHandler;
