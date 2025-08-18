import getEnabledActions from "../utils/getEnabledActions.js";
const runActionEventHandler = (data) => {
    try {
        if (!window.$aiChatWidget.initialConfig) {
            throw new Error("Initial config is not available.");
        }
        if (!window.$aiChatWidget.initialConfig?.actionsMap) {
            throw new Error("No actions map configured.");
        }
        const enabledActions = getEnabledActions();
        const enabledActionsMap = {};
        enabledActions.forEach((action) => {
            enabledActionsMap[action] =
                window.$aiChatWidget.initialConfig?.actionsMap?.[action];
        });
        const action = enabledActionsMap[data.name];
        if (!action) {
            throw new Error(`Action "${data.name}" is not enabled or does not exist.`);
        }
        if (typeof action === "function") {
            action();
        }
        else if (typeof action === "string") {
            window.location.href = action;
        }
    }
    catch (error) {
        console.error("Error handling runAction event:", error);
        alert("An error occurred while trying to run the action: " +
            (error instanceof Error ? error.message : String(error)));
    }
};
export default runActionEventHandler;
