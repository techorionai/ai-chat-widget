import logger from "./logger.js";
import sendEventToIframe from "./sendEvent.js";
export const toggleColorScheme = (colorScheme) => {
    if (!window.$aiChatWidget) {
        logger.error("AI Chat Widget is not initialized.");
        return;
    }
    if (colorScheme && !["light", "dark"].includes(colorScheme || "")) {
        logger.error("Invalid color scheme. Must be 'light' or 'dark'.");
        return;
    }
    if (!colorScheme) {
        colorScheme =
            window.$aiChatWidget.colorScheme === "light" ? "dark" : "light";
    }
    logger.log(`Toggling color scheme to: ${colorScheme}`);
    sendEventToIframe("toggleColorScheme", { colorScheme });
    window.$aiChatWidget.colorScheme = colorScheme;
};
export const getColorScheme = () => {
    if (!window.$aiChatWidget) {
        logger.error("AI Chat Widget is not initialized.");
        return "light"; // Default to light if not initialized
    }
    return window.$aiChatWidget.colorScheme;
};
