import { IFRAME_ORIGIN } from "../consts.js";
import logger from "./logger.js";
const sendEventToIframe = (type, data) => {
    try {
        const payload = JSON.parse(JSON.stringify({
            type,
            data,
        }));
        window.$aiChatWidget.Iframe?.contentWindow?.postMessage(payload, IFRAME_ORIGIN);
        logger.log("Sent event to iframe:", payload);
    }
    catch (error) {
        logger.error("Error sending event:", error);
    }
};
export default sendEventToIframe;
