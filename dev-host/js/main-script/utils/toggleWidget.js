import logger from "./logger.js";
export const toggleWidget = () => {
    if (window.$aiChatWidget.Iframe) {
        if (window.$aiChatWidget.Iframe.style.display === "block") {
            window.$aiChatWidget.Iframe.style.display = "none";
        }
        else {
            window.$aiChatWidget.Iframe.style.display = "block";
        }
    }
};
export const openWidget = () => {
    if (window.$aiChatWidget.Iframe) {
        window.$aiChatWidget.Iframe.style.display = "block";
    }
    else {
        logger.warn("Widget iframe not found. Please inject the widget first.");
    }
};
export const closeWidget = () => {
    if (window.$aiChatWidget.Iframe) {
        window.$aiChatWidget.Iframe.style.display = "none";
    }
    else {
        logger.warn("Widget iframe not found. Please inject the widget first.");
    }
};
