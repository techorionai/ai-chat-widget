/** Common events to both the main script and iframe. Round-trip events. */
type CommonEventTypes = "toggleExpand" | "chatProviderListSessions" | "chatProviderCreateSession" | "chatProviderListSessionMessages" | "chatProviderSendMessage";
/** Function to send an event from the main script to the iframe */
export type sendMainEventFn = (type: EventTypeMain, data?: Record<string, any>) => void;
/** Events sent from the main script */
export type EventTypeMain = CommonEventTypes | "set_config";
/** Function to send an event from the iframe to the main script */
export type sendIframeEventFn = (type: EventTypeIframe, data?: Record<string, any>) => void;
/** Events sent from the iframe */
export type EventTypeIframe = CommonEventTypes | "init" | "LOG" | "runAction" | "closeWidget" | "runHomeCardAction";
export type EventHandler = <T extends any>(data: MessageEvent<T>["data"]) => void;
export type DataOrError<T> = DataResponse<T> | {
    error: string;
} | {
    loading: boolean;
};
export interface DataResponse<T> {
    data: T;
}
export interface ChatWidgetConfig {
    debug?: boolean;
    chatWindow?: ChatWindowConfig;
    chatProvider?: ChatProvider;
    actionsMap?: Record<string, Function | string>;
    homeScreenConfig?: HomeScreenConfig;
    sessionsListConfig?: SessionsListConfig;
}
export interface ChatWindowConfig {
    defaults?: ChatWidgetDefaults;
    header?: ChatWindowHeaderConfig;
    expanded?: boolean;
    disallowExpand?: boolean;
    welcomeMessage?: ChatWindowWelcomeMessageConfig;
}
export interface ChatWindowWelcomeMessageConfig {
    message?: string;
    actions?: string[];
    infoText?: string;
}
export interface ChatWindowHeaderConfig {
    avatars?: ChatWidgetHeaderAvatarConfig[];
    maxShownAvatars?: number;
    title?: ChatWidgetHeaderTitleConfig;
    bg?: string;
    color?: string;
}
export interface ChatWidgetHeaderAvatarConfig {
    name?: string;
    url?: string;
}
export interface ChatWidgetHeaderTitleConfig {
    title?: string;
    showOnlineSubtitle?: boolean;
}
export interface ChatWidgetDefaults {
    colors?: ChatWidgetDefaultColors;
}
export interface ChatWidgetDefaultColors {
    light?: ChatWidgetDefaultColorPair;
    dark?: ChatWidgetDefaultColorPair;
}
export interface ChatWidgetDefaultColorPair {
    bg?: string;
    color?: string;
}
export interface HomeScreenConfig {
    bgColor?: HomeBgConfig;
    logoUrl?: string;
    avatars?: ChatWidgetHeaderAvatarConfig[];
    heading?: string;
    heading2?: string;
    sendUsAMessageConfig?: SendUsAMessageConfig;
    additionalCards?: AdditionalCardConfig[];
}
export interface HomeBgConfig {
    type?: "plain" | "custom" | "default";
    background?: string;
}
export type AdditionalCardConfig = {
    type: "button";
    config: ButtonCardConfig;
} | {
    type: "image";
    config: ImageCardConfig;
} | {
    type: "link";
    config: LinkCardConfig;
};
export interface SendUsAMessageConfig {
    hidden?: boolean;
    title?: string;
    description?: string;
}
export interface ButtonCardConfig {
    title?: string;
    description: string;
    buttonText: string;
    action: Function | string;
}
export interface ImageCardConfig {
    imageUrl: string;
    title?: string;
    description: string;
    action: Function | string;
}
export interface LinkCardConfig {
    title?: string;
    description: string;
    action: Function | string;
}
export interface SessionsListConfig {
    title?: string;
    newSessionButton?: {
        text?: string;
    };
}
/**
 * Options for listing chat sessions for a user.
 */
export interface ChatProviderListSessionsOptions {
}
/**
 * Represents a single chat session.
 */
export interface ChatProviderSession {
    /** Unique session identifier. */
    id: string;
    /** Human-readable session title. */
    title: string;
    /** ISO string of session creation date/time. */
    createdAt: string;
    /** Whether the session is closed (optional). */
    closed?: boolean;
}
/**
 * Options for listing messages in a chat session.
 */
export interface ChatProviderListSessionMessagesOptions {
    /** The session ID to fetch messages for (optional). */
    sessionId?: string;
}
/**
 * Represents a single message within a chat session.
 */
export interface ChatProviderListSessionMessagesMessage {
    /** The role of the message sender. */
    role: "user" | "assistant" | "system" | "tool";
    /** The message content. */
    content: string;
    /** Optional list of suggested actions for the user. */
    suggestedActions?: string[];
    /** ISO string of message creation date/time (optional). */
    createdAt?: string;
}
/**
 * Options for sending a message to a chat session.
 */
export interface ChatProviderSendMessageOptions {
    /** The session ID to send the message to (optional). */
    sessionId?: string;
    /** The message content to send. */
    content: string;
    /** List of navigation actions that the agent is allowed to use. Use this to enable the agent to suggest actions for the user to take. */
    enabledActions?: string[];
}
/**
 * Interface for a chat provider adapter.
 *
 * Implementations should provide methods for message management. Session management is optional.
 *
 * If multi-session is enabled, the provider should implement session management methods.
 */
export interface ChatProvider {
    /**
     * Optional: List all chat sessions for a user.
     * @param options - Options for listing sessions.
     * @returns Promise resolving to an array of chat sessions.
     */
    listSessions?: (options: ChatProviderListSessionsOptions) => Promise<ChatProviderSession[]>;
    /**
     * Optional: Create a new chat session.
     * @returns Promise resolving to the created session id.
     */
    createSession?: () => Promise<string | void>;
    /**
     * List all messages in a given chat session.
     * @param options - Options for listing session messages.
     * @returns Promise resolving to an array of messages.
     */
    listSessionMessages: (options: ChatProviderListSessionMessagesOptions) => Promise<ChatProviderListSessionMessagesMessage[]>;
    /**
     * Send a message to a chat session.
     * @param options - Options for sending a message.
     * @returns Promise resolving to the sent message.
     */
    sendMessage: (options: ChatProviderSendMessageOptions) => Promise<ChatProviderListSessionMessagesMessage>;
}
export type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
export type AgentFunction = (args?: Record<string, any>) => Promise<string | boolean> | ((args?: Record<string, any>) => string | boolean);
export interface SharedSecretKeyConfig {
    /**
     * Shared secret key. Should be securely added on the client. Should be same as the one on your server.
     */
    sharedSecretKey: string;
    /**
     * Placement of the shared secret key in your request.
     */
    placement: "query" | "header";
    /**
     * Name of the shared secret key field in your request, wherever it is placed.
     */
    key: string;
}
export interface APIUrlConfig {
    /**
     * HTTP Method
     */
    method: HTTPMethods;
    /**
     * Full URL of the API endpoint
     */
    url: string;
}
export interface ToolCall {
    id: string;
    type: string;
    function: {
        name: string;
        /**
         * JSON string of arguments
         */
        arguments: string;
    };
}
export interface IChatSendMessageResponse {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: Record<string, string>;
    data: {
        assistantMessage: string;
        action: string | null;
        identifier: string;
        toolCalls: ToolCall[];
    };
}
export interface IChatGetMessageResponse {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: Record<string, string>;
    data: IMessage[];
}
export interface IMessage {
    sender: "USER" | "ASSISTANT" | "ASSISTANT-LOADING" | "ERROR" | "TOOL";
    content: string;
    new: boolean;
    createdAt: Date;
    action: string | null;
}
export interface RequestConfig extends APIUrlConfig {
    headers?: Record<string, string>;
    body?: Record<string, any>;
    signaturePayload?: string;
}
export interface NavigableChatProviderOptions {
    /** Navigable AI Embed ID for the chat provider. */
    embedId?: string;
    /** Optional user ID to initialize the provider with. If not provided, UUID v7 is used. */
    userId?: string;
}
export {};
