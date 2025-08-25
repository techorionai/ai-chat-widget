const getEnabledActions = () => {
    const actionsMap = window.$aiChatWidget.initialConfig?.actionsMap || {};
    const enabledActions = [];
    Object.keys(actionsMap).forEach((action) => {
        if (typeof actionsMap[action] === "function" ||
            typeof actionsMap[action] === "string") {
            enabledActions.push(action);
        }
    });
    return enabledActions;
};
export const getEnabledActionsMap = (unconfiguredActionsMap) => {
    const actionsMap = unconfiguredActionsMap ||
        window.$aiChatWidget?.initialConfig?.actionsMap ||
        {};
    const enabledActionsMap = {};
    Object.keys(actionsMap).forEach((action) => {
        if (typeof actionsMap[action] === "function" ||
            typeof actionsMap[action] === "string") {
            enabledActionsMap[action] = actionsMap[action];
        }
    });
    return enabledActionsMap;
};
export default getEnabledActions;
