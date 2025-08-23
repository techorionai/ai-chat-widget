import { ChatProvider, ChatProviderListSessionMessagesMessage, ChatProviderListSessionMessagesOptions, ChatProviderListSessionsOptions, ChatProviderSendMessageOptions, ChatProviderSession, NavigableChatProviderOptions } from "../../../types.js";
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
