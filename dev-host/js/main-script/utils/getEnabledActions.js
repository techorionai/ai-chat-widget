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
export default getEnabledActions;
