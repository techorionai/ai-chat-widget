import { ChatProvider, ChatProviderListSessionMessagesMessage, ChatProviderListSessionMessagesOptions, ChatProviderListSessionsOptions, ChatProviderSendMessageOptions, ChatProviderSession, HTTPMethods, NavigableChatProviderOptions } from "../../../types.js";
export declare const HOSTNAME = "www.navigable.ai";
export declare const DEFAULT_TIMEOUT = 30000;
export declare const API_KEY_HEADER = "X-Api-Key";
interface IEndpointParams {
    path: string;
    method: HTTPMethods;
}
type Endpoint = "SEND_MESSAGE" | "GET_MESSAGES" | "GET_CHAT_SESSIONS" | "GET_SESSION_MESSAGES";
export declare const ENDPOINTS: Record<Endpoint, IEndpointParams>;
declare class NavigableChatProvider implements ChatProvider {
    private apiMode;
    private embedId?;
    userId: string;
    lastNewSessionRequest: undefined | {
        time: Date;
        fulfilled: boolean;
    };
    constructor(options?: NavigableChatProviderOptions);
    listSessionMessages(options: ChatProviderListSessionMessagesOptions): Promise<ChatProviderListSessionMessagesMessage[]>;
    createSession(): Promise<void>;
    sendMessage(options: ChatProviderSendMessageOptions): Promise<ChatProviderListSessionMessagesMessage>;
    listSessions(options?: ChatProviderListSessionsOptions): Promise<ChatProviderSession[]>;
}
export interface NavigableAPIResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: Record<string, string>;
    data: T;
}
export default NavigableChatProvider;
