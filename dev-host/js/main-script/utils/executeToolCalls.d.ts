import { ToolCall, ToolCallResult } from "../types.js";
declare const executeToolCalls: (toolCalls: ToolCall[]) => Promise<ToolCallResult[]>;
export declare const executeToolCall: (toolCall: ToolCall) => Promise<string>;
export default executeToolCalls;
