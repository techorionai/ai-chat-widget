import { ChatProvider, ChatProviderListSessionMessagesOptions, ChatProviderListSessionMessagesMessage, ChatProviderListSessionsOptions, ChatProviderSession, ChatProviderSendMessageOptions, HTTPMethods } from "../../../types.js";
export interface ProxyChatProviderOptions {
    userId?: string;
    commonHeaders?: Record<string, string>;
    sharedSecretKeyConfig?: import("../../../types.js").SharedSecretKeyConfig;
    endpoints: {
        listSessions?: {
            url: string;
            method: HTTPMethods;
            headers?: Record<string, string>;
        };
        createSession?: {
            url: string;
            method: HTTPMethods;
            headers?: Record<string, string>;
        };
        listSessionMessages?: {
            url: string;
            method: HTTPMethods;
            headers?: Record<string, string>;
        };
        sendMessage?: {
            url: string;
            method: HTTPMethods;
            headers?: Record<string, string>;
        };
    };
}
declare class NavigableProxyChatProvider implements ChatProvider {
    userId: string;
    options: ProxyChatProviderOptions;
    constructor(options: ProxyChatProviderOptions);
    listSessions(options?: ChatProviderListSessionsOptions): Promise<ChatProviderSession[]>;
    createSession(): Promise<string | void>;
    listSessionMessages(options: ChatProviderListSessionMessagesOptions): Promise<ChatProviderListSessionMessagesMessage[]>;
    sendMessage(options: ChatProviderSendMessageOptions): Promise<ChatProviderListSessionMessagesMessage>;
}
export default NavigableProxyChatProvider;
/**
 * ProxyChatProvider usage example:
 *
 * import { ProxyChatProvider } from "../adapters/ChatProvider/index.js";
 *
 * const proxyProvider = new ProxyChatProvider({
 *   userId: "user-123",
 *   commonHeaders: { "Authorization": "Bearer TOKEN" },
 *   endpoints: {
 *     listSessions: {
 *       url: "https://your-proxy.com/api/sessions?user={userId}",
 *       method: "GET"
 *     },
 *     createSession: {
 *       url: "https://your-proxy.com/api/sessions/create?user={userId}",
 *       method: "POST"
 *     },
 *     listSessionMessages: {
 *       url: "https://your-proxy.com/api/sessions/{sessionId}/messages?user={userId}",
 *       method: "GET"
 *     },
 *     sendMessage: {
 *       url: "https://your-proxy.com/api/sessions/{sessionId}/send?user={userId}",
 *       method: "POST"
 *     }
 *   }
 * });
 */
