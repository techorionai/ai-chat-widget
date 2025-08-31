import { GroupProps, PaperProps, TextProps, ThemeIconProps } from "@mantine/core";
/** Common events to both the main script and iframe. Round-trip events. */
type CommonEventTypes = "toggleExpand" | "chatProviderListSessions" | "chatProviderCreateSession" | "chatProviderListSessionMessages" | "chatProviderSendMessage";
/** Function to send an event from the main script to the iframe */
export type sendMainEventFn = (type: EventTypeMain, data?: Record<string, any>) => void;
/** Events sent from the main script */
export type EventTypeMain = CommonEventTypes | "set_config" | "toggleColorScheme";
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
/** Represents the configuration for the chat widget. */
export interface ChatWidgetConfig {
    /** Set to true to view logs in the console */
    debug?: boolean;
    /** HTML for the widget button. Override the default button */
    widgetButton?: string;
    /** Configuration for the chat window, where users send messages */
    chatWindow?: ChatWindowConfig;
    /** Interface for a chat provider adapter. */
    chatProvider?: ChatProvider;
    /** Map of action names to the corresponding function or URL, for actions suggested by the agent.
     *
     * If a function value is provided, it will be executed when the user clicks on the action.
     *
     * If a string value is provided, it will be treated as a URL and the user will be redirected to that URL.
     */
    actionsMap?: Record<string, Function | string>;
    /** Configuration for the home screen, what the user see's when they open the chat widget */
    homeScreenConfig?: HomeScreenConfig;
    /** Configuration for the chat sessions list, where users can see their list of chat sessions */
    sessionsListConfig?: SessionsListConfig;
    /** Disable close button. Don't allow closing on any screen */
    disableCloseButton?: boolean;
    /** Configuration for the footer, shown on home and sessions list */
    footerConfig?: FooterConfig;
}
export interface ChatWindowConfig {
    /** Override options for default colors */
    defaults?: ChatWidgetDefaults;
    /** Header configuration options in the chat window */
    header?: ChatWindowHeaderConfig;
    /** Whether the chat window is expanded to full window height by default */
    expanded?: boolean;
    /** Whether the user can manually expand/collapse the chat window */
    disallowExpand?: boolean;
    /** Welcome message configuration for the chat window */
    welcomeMessage?: ChatWindowWelcomeMessageConfig;
    /** Hide assistant avatar in messages */
    hideAssistantMessageAvatar?: boolean;
    /** Hide user avatar in messages */
    hideUserMessageAvatar?: boolean;
}
export interface ChatWindowWelcomeMessageConfig {
    /** First message a user sees when they open the chat widget */
    message?: string;
    /** Optional list of actions that the user can take from the welcome message
     *
     * These actions must have a corresponding entry in the `actionsMap` of the ChatWidgetConfig.
     */
    actions?: string[];
    /** Optional text to display at the top of the chat to provide context or instructions to the user */
    infoText?: string;
}
export interface ChatWindowHeaderConfig {
    /** Config for the avatars displayed in the header */
    avatars?: ChatWidgetHeaderAvatarConfig[];
    /** Maximum number of avatars to show in the header
     * If more avatars than this are available, the rest will be hidden
     */
    maxShownAvatars?: number;
    /** Config for the title displayed in the header */
    title?: ChatWidgetHeaderTitleConfig;
    /** Background color of the header. Override is for both light and dark modes */
    bg?: string;
    /** Text color of the header. Override is for both light and dark modes */
    color?: string;
}
export interface ChatWidgetHeaderAvatarConfig {
    /** Name of the avatar, added as tooltip */
    name?: string;
    /** URL of the avatar image */
    url?: string;
}
export interface ChatWidgetHeaderTitleConfig {
    /** Title text to display in the header */
    title?: string;
    /** Whether to show the online status subtitle */
    showOnlineSubtitle?: boolean;
}
export interface ChatWidgetDefaults {
    /** Default colors for the chat widget */
    colors?: ChatWidgetDefaultColors;
    /** Default color scheme for the chat widget */
    colorScheme?: "light" | "dark";
    /** Primary Color for the chat widget. One of the following. Default is blue */
    primaryColor?: "dark" | "gray" | "red" | "pink" | "grape" | "violet" | "indigo" | "blue" | "cyan" | "green" | "lime" | "yellow" | "orange" | "teal" | string;
    /** Mantine theme override for the chat widget. Refer: https://mantine.dev/theming/theme-object/ */
    mantineThemeOverride?: Record<string, any>;
    /** Border/Corner radius for each message. Can be one of the predefined sizes or a custom CSS value for border-radius property. */
    messageRadius?: "xs" | "sm" | "md" | "lg" | "xl" | string;
    /** Default colors for the chat widget messages from the assistant */
    assistantMessage?: ChatWidgetDefaultColors;
    /** Default colors for the chat widget messages from the user */
    userMessage?: ChatWidgetDefaultColors;
}
export interface ChatWidgetDefaultColors {
    /** Default colors for light mode */
    light?: ChatWidgetDefaultColorPair;
    /** Default colors for dark mode */
    dark?: ChatWidgetDefaultColorPair;
}
export interface ChatWidgetDefaultColorPair {
    /** Background color */
    bg?: string;
    /** Text color */
    color?: string;
}
export interface HomeScreenConfig {
    /** Background color configuration for the home screen */
    bgColor?: HomeBgConfig;
    /** Logo URL for the home screen header */
    logoUrl?: string;
    /** Logo URL for the home screen header (dark mode). Light mode logo is used by default. */
    logoUrlDark?: string;
    /** Config for the avatars displayed in the header on the home screen */
    avatars?: ChatWidgetHeaderAvatarConfig[];
    /** First heading text displayed on the home screen */
    heading?: string;
    /** Second heading text displayed on the home screen */
    heading2?: string;
    /** Configuration for the "Send us a message" section */
    sendUsAMessageConfig?: SendUsAMessageConfig;
    /** Configuration for the cards displayed on the home screen */
    additionalCards?: AdditionalCardConfig[];
    /** Props to pass to the container element. Example: { mb: "2rem" } */
    headerContainerProps?: GroupProps;
}
export interface HomeBgConfig {
    /** Type of background color
     *
     * - plain: No background color, just plain. No need to set background.
     * - custom: Custom background color, set the `background` CSS property.
     * - default: Default background color, which is a gradient color based on the theme.
     */
    type?: "plain" | "custom" | "default";
    /** Custom background color, used when `type` is set to "custom" */
    background?: string;
}
/** Represents a card configuration for the home screen. */
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
    /** Option to hide the "Send us a message" section */
    hidden?: boolean;
    /** Alternative title for the section */
    title?: string;
    /** Alternative description for the section */
    description?: string;
}
export interface ButtonCardConfig {
    /** Optional title text for the button card */
    title?: string;
    /** Description text for the button card */
    description: string;
    /** Button text to display on the card */
    buttonText: string;
    /** Action to perform when the button is clicked. Can be a function or a string URL.
     *
     * If a function is provided, it will be executed when the button is clicked.
     *
     * If a string is provided, it will be treated as a URL and the user will be redirected to that URL.
     */
    action: Function | string;
}
export interface ImageCardConfig {
    /** URL of the image to display on the card */
    imageUrl: string;
    /** Optional title text for the image card */
    title?: string;
    /** Description text for the image card */
    description: string;
    /** Action to perform when the image card is clicked. Can be a function or a string URL.
     *
     * If a function is provided, it will be executed when the image card is clicked.
     *
     * If a string is provided, it will be treated as a URL and the user will be redirected to that URL.
     */
    action: Function | string;
}
export interface LinkCardConfig {
    /** Optional title text for the link card */
    title?: string;
    /** Description text for the link card */
    description: string;
    /** Action to perform when the image card is clicked. Can be a function or a string URL.
     *
     * If a function is provided, it will be executed when the image card is clicked.
     *
     * If a string is provided, it will be treated as a URL and the user will be redirected to that URL.
     */
    action: Function | string;
}
export interface SessionsListConfig {
    /** Alternative Title text for the sessions list */
    title?: string;
    /** Config options for the new session button */
    newSessionButton?: {
        /** Alternative text to display on the new session button */
        text?: string;
    };
}
export interface FooterConfig {
    /** Props to pass to the container element. Example: { mb: "2rem" } */
    containerProps?: PaperProps;
    /** Configuration for the home tab */
    home: FooterTabProps;
    /** Configuration for the messages tab */
    messages: FooterTabProps;
}
export interface FooterTabProps {
    /** Alternative text for the tab */
    text?: string;
    /** Props to pass to the text element. Example: { fw: "500" } */
    props?: TextProps;
    /** Props to pass to the icon element. Example: { size: "4rem" } */
    iconProps?: ThemeIconProps;
    /** Alternative icon to display. Any icon path from the icons directory (https://assets.navigable.ai/icons/) or a URL to an SVG icon. */
    altIcon?: string;
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
     * List all chat sessions for a user.
     * @param options - Options for listing sessions.
     * @returns Promise resolving to an array of chat sessions.
     */
    listSessions: (options: ChatProviderListSessionsOptions) => Promise<ChatProviderSession[]>;
    /**
     * Create a new chat session.
     * @returns Promise resolving to the created session id.
     */
    createSession: () => Promise<string | void>;
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
export interface NavigableChatProviderOptions {
    /** Navigable AI Embed ID for the chat provider. */
    embedId?: string;
    /** Optional user ID to initialize the provider with. If not provided, UUID v7 is used. */
    userId?: string;
}
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
export {};
