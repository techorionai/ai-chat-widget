// ProxyChatProvider adapter for Navigable AI
import request from "../../../utils/request.js";
import navigableResponseHandler from "../../../utils/navigableResponseHandler.js";
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
    constructor(options) {
        this.options = options;
        this.userId =
            options.userId &&
                typeof options.userId === "string" &&
                options.userId.trim() !== ""
                ? options.userId
                : Math.random().toString(36).slice(2); // fallback userId
    }
    async listSessions(options) {
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
    async createSession() {
        const endpoint = this.options.endpoints.createSession;
        if (!endpoint)
            throw new Error("createSession endpoint not configured");
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
        if (!res || !res.success) {
            throw new Error("Failed to create session");
        }
        // Return session id if available, else void
        return res.data?.id || undefined;
    }
    async listSessionMessages(options) {
        const endpoint = this.options.endpoints.listSessionMessages;
        if (!endpoint)
            throw new Error("listSessionMessages endpoint not configured");
        if (!options?.sessionId)
            throw new Error("sessionId required");
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
    async sendMessage(options) {
        const endpoint = this.options.endpoints.sendMessage;
        if (!endpoint)
            throw new Error("sendMessage endpoint not configured");
        const headers = {
            ...(this.options.commonHeaders || {}),
            ...(endpoint.headers || {}),
        };
        const url = endpoint.url
            .replace("{userId}", this.userId)
            .replace("{sessionId}", options.sessionId || "");
        const body = {
            userId: this.userId,
            sessionId: options.sessionId,
            content: options.content,
            enabledActions: options.enabledActions,
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
        return {
            role: "assistant",
            content: res.data.content,
            suggestedActions: res.data.action ? [res.data.action] : undefined,
            createdAt: typeof res.data.createdAt === "string"
                ? res.data.createdAt
                : res.data.createdAt instanceof Date
                    ? res.data.createdAt.toISOString()
                    : String(res.data.createdAt),
        };
    }
}
export default NavigableProxyChatProvider;
