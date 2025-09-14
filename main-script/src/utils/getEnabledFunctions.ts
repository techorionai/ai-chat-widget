import { ChatWidgetConfig } from "../types.js";

const getEnabledFunctions = () => {
  const functionsMap = window.$aiChatWidget.initialConfig?.functionsMap || {};
  const enabledFunctions: string[] = [];
  Object.keys(functionsMap).forEach((fn) => {
    if (typeof functionsMap[fn].fn === "function") {
      enabledFunctions.push(fn);
    }
  });
  return enabledFunctions;
};

export const getEnabledFunctionsMap = (
  unconfiguredFunctionsMap?: ChatWidgetConfig["functionsMap"]
) => {
  const functionsMap =
    unconfiguredFunctionsMap ||
    window.$aiChatWidget?.initialConfig?.functionsMap ||
    {};
  const enabledFunctionsMap: Record<string, Function> = {};
  Object.keys(functionsMap).forEach((fn) => {
    if (typeof functionsMap[fn].fn === "function") {
      enabledFunctionsMap[fn] = functionsMap[fn].fn;
    }
  });
  return enabledFunctionsMap;
};

export default getEnabledFunctions;
