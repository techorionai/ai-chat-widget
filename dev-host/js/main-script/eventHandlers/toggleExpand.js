import logger from "../utils/logger.js";
import sendEventToIframe from "../utils/sendEvent.js";
export const defaultNormalSize = {
    width: "400px",
    height: "704px",
};
export const defaultExpandedSize = {
    width: "688px",
    height: "calc(100vh - 48px)",
};
const toggleExpandEventHandler = (data) => {
    try {
        if (!data?.hasOwnProperty("expanded")) {
            throw new Error("toggleExpand event data missing 'expanded' property:", data);
        }
        if (!window.$aiChatWidget.Iframe) {
            throw new Error("toggleExpand event received but iframe is not initialized or missing");
        }
        const { expanded } = data;
        if (expanded) {
            window.$aiChatWidget.Iframe.style.width = defaultExpandedSize.width;
            window.$aiChatWidget.Iframe.style.height = defaultExpandedSize.height;
        }
        else {
            window.$aiChatWidget.Iframe.style.width = defaultNormalSize.width;
            window.$aiChatWidget.Iframe.style.height = defaultNormalSize.height;
        }
        sendEventToIframe("toggleExpand", {
            success: true,
            expanded,
        });
    }
    catch (error) {
        logger.error("Error handling toggleExpand event:", error);
        sendEventToIframe("toggleExpand", {
            success: false,
            error: "Failed to toggle expand state",
        });
    }
};
export default toggleExpandEventHandler;
