import logger from "../utils/logger.js";
const runHomeCardAction = (data) => {
    try {
        if (!window.$aiChatWidget || !window.$aiChatWidget.initialConfig) {
            throw new Error("AI Chat Widget is not initialized.");
        }
        if (!window.$aiChatWidget.initialConfig?.homeScreenConfig?.additionalCards ||
            !Array.isArray(data.actionIdx) ||
            data.actionIdx.length === 0) {
            throw new Error("Invalid action index or no additional cards configured.");
        }
        let action = undefined;
        const card = window.$aiChatWidget.initialConfig.homeScreenConfig.additionalCards[data.actionIdx[0]];
        if (data.actionIdx.length === 1) {
            if (card && card.config) {
                switch (card.type) {
                    case "button":
                        action = card.config.action;
                        break;
                    case "image":
                        action = card.config.action;
                        break;
                    case "link":
                        action = card.config.action;
                        break;
                    default:
                        throw new Error(`Unknown card type: ${card["type"]}`);
                }
            }
        }
        if (!action) {
            throw new Error("No action found for the specified index.");
        }
        if (typeof action === "function") {
            action();
        }
        else if (typeof action === "string") {
            window.open(action, "_blank");
        }
        else {
            throw new Error(`Unsupported action type: ${typeof action}`);
        }
    }
    catch (error) {
        logger.error("Error handling runHomeCardAction event:", error);
    }
};
export default runHomeCardAction;
