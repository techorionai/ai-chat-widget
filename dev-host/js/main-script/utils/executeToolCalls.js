import logger from "./logger.js";
const executeToolCalls = async (toolCalls) => {
    try {
        logger.log("Executing all tool calls");
        return await Promise.all(toolCalls.map(async (toolCall) => {
            const result = await executeToolCall(toolCall);
            return { id: toolCall.id, result };
        }));
    }
    catch (error) {
        console.error("Error executing tool calls:", error);
        return [];
    }
};
export const executeToolCall = async (toolCall) => {
    try {
        logger.log(`Executing tool call: ${toolCall.function.name}`);
        if (!window.$aiChatWidget)
            throw new Error("Chat widget not initialized");
        const fn = window.$aiChatWidget.initialConfig?.functionsMap?.[toolCall.function.name]
            .fn;
        if (!fn)
            throw new Error(`Function ${toolCall.function.name} not found`);
        const args = safeArgsParse(toolCall.function.arguments);
        const result = await fn(args);
        let finalResult = "";
        if (typeof result === "string") {
            finalResult = result;
        }
        else if (typeof result === "boolean") {
            finalResult = result ? "true" : "false";
        }
        else {
            finalResult = JSON.stringify(result);
        }
        return finalResult;
    }
    catch (error) {
        return `Error executing tool call ${toolCall.function.name}: ${error instanceof Error
            ? error.message
            : error
                ? String(error)
                : "Unknown error"}`;
    }
};
const safeArgsParse = (args) => {
    try {
        return JSON.parse(args || "{}");
    }
    catch (error) {
        console.error("Failed to parse function arguments:", error);
        return {};
    }
};
export default executeToolCalls;
