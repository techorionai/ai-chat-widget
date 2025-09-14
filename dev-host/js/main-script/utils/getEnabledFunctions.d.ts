import { ChatWidgetConfig } from "../types.js";
declare const getEnabledFunctions: () => string[];
export declare const getEnabledFunctionsMap: (unconfiguredFunctionsMap?: ChatWidgetConfig["functionsMap"]) => Record<string, Function>;
export default getEnabledFunctions;
