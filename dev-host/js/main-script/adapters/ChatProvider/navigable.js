import uuid from "uuid";
import request from "../../utils/request.js";
import navigableResponseHandler from "../../utils/navigableResponseHandler.js";
const API_ENDPOINT = "https://www.navigable.ai/api/embed/v1";
class NavigableChatProvider {
    apiMode = "unknown";
    embedId = undefined;
    userId = uuid.v7();
    lastNewSessionRequest = undefined;
    constructor(options) {
        if (options?.userId &&
            typeof options.userId === "string" &&
            options.userId.trim() !== "") {
            this.userId = options.userId;
        }
        if (options?.embedId) {
            this.embedId = options.embedId;
            this.apiMode = "embed";
        }
    }
    async listSessionMessages(options) {
        try {
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
            if (this.lastNewSessionRequest && !this.lastNewSessionRequest.fulfilled) {
                newSession = true;
            }
            // Send the message
            const res = await request({
                url: `${API_ENDPOINT}/chat`,
                method: "POST",
                body: {
                    identifier: this.userId,
                    new: newSession,
                    message: options.content,
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
                content: res.data.content,
                suggestedActions: res.data.action ? [res.data.action] : undefined,
                createdAt: res.data.createdAt,
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
