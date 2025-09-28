import navigableResponseHandler from "../../../utils/navigableResponseHandler.js";
import request from "../../../utils/request.js";
import generateTULIP from "../../../utils/tulip.js";
const API_ENDPOINT = "https://www.navigable.ai/api/embed/v1";
class NavigableChatProvider {
    apiMode = "unknown";
    embedId = undefined;
    userId = generateTULIP();
    lastNewSessionRequest = undefined;
    constructor(options) {
        if (options?.userId &&
            typeof options.userId === "string" &&
            options.userId.trim() !== "") {
            this.userId = options.userId;
        }
        if (!options?.userId) {
            const lsUserId = localStorage.getItem("navigableUserId");
            if (lsUserId && lsUserId.trim() !== "") {
                this.userId = lsUserId;
            }
            else {
                localStorage.setItem("navigableUserId", this.userId);
            }
        }
        if (options?.embedId) {
            this.embedId = options.embedId;
            this.apiMode = "embed";
        }
        if (!options?.embedId) {
            throw new Error("Please provide an embedId or proxy API config to use NavigableChatProvider.");
        }
    }
    async listSessionMessages(options) {
        try {
            if (options.sessionId?.trim() === "new") {
                return [];
            }
            const res = await request({
                url: `${API_ENDPOINT}/chat/sessions/${options.sessionId}?identifier=${this.userId}`,
                method: "GET",
                headers: {
                    "x-embed-id": this.embedId || "",
                },
            });
            if (!res) {
                throw new Error("No response received from the API");
            }
            navigableResponseHandler(res);
            return res?.data.map((message) => ({
                role: navigableSenderMap[message.sender],
                content: message.content,
                suggestedActions: message.action ? [message.action] : undefined,
                createdAt: message.createdAt,
                toolCalls: message.toolCalls ?? undefined,
                toolCallId: message.tool_call_id ?? undefined,
            }));
        }
        catch (error) {
            throw new Error(`Failed to list session messages: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async createSession() {
        try {
            this.lastNewSessionRequest = {
                time: new Date(),
                fulfilled: false,
            };
        }
        catch (error) {
            throw new Error(`Failed to create session: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async sendMessage(options) {
        try {
            // Check if a new session is needed
            let newSession = false;
            if (this.lastNewSessionRequest &&
                !this.lastNewSessionRequest.fulfilled &&
                (!options.sessionId || options.sessionId === "new")) {
                newSession = true;
            }
            let functionCallId = undefined;
            if (options.toolCallResults && options.toolCallResults.length > 0) {
                // Navigable API supports only 1 tool call/result at a time
                options.content = options.toolCallResults[0].result;
                functionCallId = options.toolCallResults[0].id;
            }
            // Send the message
            const res = await request({
                url: `${API_ENDPOINT}/chat`,
                method: "POST",
                body: {
                    identifier: this.userId,
                    new: newSession,
                    message: options.content,
                    markdown: true,
                    configuredActions: options.enabledActions || [],
                    configuredFunctions: options.enabledFunctions || [],
                    functionCallId,
                },
                headers: {
                    "x-embed-id": this.embedId || "",
                },
            });
            if (!res) {
                throw new Error("No response received from the API");
            }
            navigableResponseHandler(res);
            // If successful, mark the new session request as fulfilled
            if (newSession && this.lastNewSessionRequest) {
                this.lastNewSessionRequest.fulfilled = true;
            }
            return {
                role: "assistant",
                content: res.data.assistantMessage,
                suggestedActions: res.data.action ? [res.data.action] : undefined,
                createdAt: new Date().toISOString(),
                toolCalls: res.data.toolCalls ?? undefined,
            };
        }
        catch (error) {
            throw new Error(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async listSessions(options) {
        try {
            const res = await request({
                url: `${API_ENDPOINT}/chat/sessions?identifier=${this.userId}`,
                method: "GET",
                headers: {
                    "x-embed-id": this.embedId || "",
                },
            });
            if (!res) {
                throw new Error("No response received from the API");
            }
            navigableResponseHandler(res);
            return res.data;
        }
        catch (error) {
            throw new Error(`Failed to list sessions: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
const navigableSenderMap = {
    USER: "user",
    ASSISTANT: "assistant",
    TOOL: "tool",
    "ASSISTANT-LOADING": "user",
    ERROR: "user",
};
export default NavigableChatProvider;
if (typeof window !== "undefined") {
    window.NavigableChatProvider = NavigableChatProvider;
}
