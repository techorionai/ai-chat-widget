import { ChatProvider, ChatProviderListSessionMessagesMessage, ChatProviderListSessionMessagesOptions, ChatProviderListSessionsOptions, ChatProviderSendMessageOptions, ChatProviderSession } from "../../../types.js";
export interface MockChatProviderOptions {
    /** Optional initial session title */
    initialSessionTitle?: string;
    /** Optional custom response delay in milliseconds (default: 400ms) */
    delayMs?: number;
    /** Optional simulated assistant message generator */
    responseGenerator?: (message: string) => string;
}
declare class MockChatProvider implements ChatProvider {
    multiSession: boolean;
    private delayMs;
    private sessions;
    private messagesBySession;
    private responseGenerator;
    constructor(options?: MockChatProviderOptions);
    listSessions(options?: ChatProviderListSessionsOptions): Promise<ChatProviderSession[]>;
    createSession(): Promise<string | void>;
    listSessionMessages(options: ChatProviderListSessionMessagesOptions): Promise<ChatProviderListSessionMessagesMessage[]>;
    sendMessage(options: ChatProviderSendMessageOptions): Promise<ChatProviderListSessionMessagesMessage>;
}
export default MockChatProvider;
