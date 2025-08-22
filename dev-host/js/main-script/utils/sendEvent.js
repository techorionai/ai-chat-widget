import { IFRAME_ORIGIN } from "../consts.js";
import logger from "./logger.js";
const sendEventToIframe = (type, data) => {
    try {
        window.$aiChatWidget.Iframe?.contentWindow?.postMessage({
            type,
            data,
        }, IFRAME_ORIGIN);
    }
    catch (error) {
        logger.error("Error sending event:", error);
    }
};
export default sendEventToIframe;
