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
    lastNewSessionRequest: undefined | {
        time: Date;
        fulfilled: boolean;
    };
    constructor(options: ProxyChatProviderOptions);
    listSessions(options?: ChatProviderListSessionsOptions): Promise<ChatProviderSession[]>;
    createSession(): Promise<void>;
    listSessionMessages(options: ChatProviderListSessionMessagesOptions): Promise<ChatProviderListSessionMessagesMessage[]>;
    sendMessage(options: ChatProviderSendMessageOptions): Promise<ChatProviderListSessionMessagesMessage>;
}
export default NavigableProxyChatProvider;
