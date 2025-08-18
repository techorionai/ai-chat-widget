import logger from "../utils/logger.js";
import sendEventToIframe from "../utils/sendEvent.js";
const initEventHandler = (data) => {
    try {
        if (!window.$aiChatWidget.initialConfig) {
            throw new Error("Chat widget initial config is not set.");
        }
        const safeInitialConfig = {
            ...window.$aiChatWidget.initialConfig,
            actionsMap: JSON.parse(JSON.stringify(window.$aiChatWidget.initialConfig.actionsMap || {})),
        };
        sendEventToIframe("set_config", safeInitialConfig);
    }
    catch (error) {
        logger.error(error);
    }
};
export default initEventHandler;
