// ProxyChatProvider adapter for Navigable AI
import request from "../../../utils/request.js";
import navigableResponseHandler from "../../../utils/navigableResponseHandler.js";
import generateTULIP from "../../../utils/tulip.js";
// Same sender mapping as NavigableChatProvider
const navigableSenderMap = {
    USER: "user",
    ASSISTANT: "assistant",
    TOOL: "tool",
    "ASSISTANT-LOADING": "user",
    ERROR: "user",
};
class NavigableProxyChatProvider {
    userId;
    options;
    lastNewSessionRequest = undefined;
    constructor(options) {
        this.options = options;
        this.userId =
            options.userId &&
                typeof options.userId === "string" &&
                options.userId.trim() !== ""
                ? options.userId
                : generateTULIP(); // fallback userId
    }
    async listSessions(options) {
        try {
            const endpoint = this.options.endpoints.listSessions;
            if (!endpoint)
                throw new Error("listSessions endpoint not configured");
            const headers = {
                ...(this.options.commonHeaders || {}),
                ...(endpoint.headers || {}),
            };
            const res = await request({
                url: endpoint.url.replace("{userId}", this.userId),
                method: endpoint.method,
                headers,
                signaturePayload: this.userId,
            }, this.options.sharedSecretKeyConfig
                ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
                : undefined);
            if (!res) {
                throw new Error("No response received from the API");
            }
            navigableResponseHandler(res);
            // NavigableSession transformation (direct mapping)
            return res.data.map((session) => ({
                id: session.id,
                title: session.title,
                createdAt: session.createdAt,
                closed: session.closed,
            }));
        }
        catch (error) {
            console.log("[NavigableProxyChatProvider] listSessions error:", error);
            throw new Error(`Failed to list sessions: ${error instanceof Error ? error.message : String(error)}`);
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
            console.log("[NavigableProxyChatProvider] createSession error:", error);
            throw new Error(`Failed to create session: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async listSessionMessages(options) {
        try {
            const endpoint = this.options.endpoints.listSessionMessages;
            if (!endpoint)
                throw new Error("listSessionMessages endpoint not configured");
            if (!options?.sessionId)
                throw new Error("sessionId required");
            if (options.sessionId.trim() === "new") {
                return [];
            }
            const headers = {
                ...(this.options.commonHeaders || {}),
                ...(endpoint.headers || {}),
            };
            const url = endpoint.url
                .replace("{userId}", this.userId)
                .replace("{sessionId}", options.sessionId);
            const res = await request({
                url,
                method: endpoint.method,
                headers,
                signaturePayload: this.userId,
            }, this.options.sharedSecretKeyConfig
                ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
                : undefined);
            if (!res) {
                throw new Error("No response received from the API");
            }
            navigableResponseHandler(res);
            return res.data.map((message) => ({
                role: navigableSenderMap[message.sender],
                content: message.content,
                suggestedActions: message.action ? [message.action] : undefined,
                createdAt: typeof message.createdAt === "string"
                    ? message.createdAt
                    : message.createdAt instanceof Date
                        ? message.createdAt.toISOString()
                        : String(message.createdAt),
            }));
        }
        catch (error) {
            console.log("[NavigableProxyChatProvider] listSessionMessages error:", error);
            throw new Error(`Failed to list session messages: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async sendMessage(options) {
        const endpoint = this.options.endpoints.sendMessage;
        if (!endpoint)
            throw new Error("sendMessage endpoint not configured");
        // Check if a new session is needed
        let newSession = false;
        if (this.lastNewSessionRequest &&
            !this.lastNewSessionRequest.fulfilled &&
            (!options.sessionId || options.sessionId === "new")) {
            newSession = true;
        }
        const headers = {
            ...(this.options.commonHeaders || {}),
            ...(endpoint.headers || {}),
        };
        const url = endpoint.url
            .replace("{userId}", this.userId)
            .replace("{sessionId}", options.sessionId || "");
        const body = {
            identifier: this.userId,
            message: options.content,
            configuredActions: options.enabledActions,
            new: newSession,
            markdown: true,
        };
        const res = await request({
            url,
            method: endpoint.method,
            headers,
            body,
            signaturePayload: options.content,
        }, this.options.sharedSecretKeyConfig
            ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
            : undefined);
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
        };
    }
}
export default NavigableProxyChatProvider;
if (typeof window !== "undefined") {
    window.NavigableProxyChatProvider = NavigableProxyChatProvider;
}
