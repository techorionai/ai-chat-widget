const getEnabledActions = () => {
  const actionsMap = window.$aiChatWidget.initialConfig?.actionsMap || {};
  const enabledActions: string[] = [];
  Object.keys(actionsMap).forEach((action) => {
    if (
      typeof actionsMap[action] === "function" ||
      typeof actionsMap[action] === "string"
    ) {
      enabledActions.push(action);
    }
  });
  return enabledActions;
};

export const getEnabledActionsMap = (
  unconfiguredActionsMap?: Record<string, string | Function>
) => {
  const actionsMap =
    unconfiguredActionsMap ||
    window.$aiChatWidget?.initialConfig?.actionsMap ||
    {};
  const enabledActionsMap: Record<string, string | Function> = {};
  Object.keys(actionsMap).forEach((action) => {
    if (
      typeof actionsMap[action] === "function" ||
      typeof actionsMap[action] === "string"
    ) {
      enabledActionsMap[action] = actionsMap[action];
    }
  });
  return enabledActionsMap;
};

export default getEnabledActions;
