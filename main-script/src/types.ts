/** Common events to both the main script and iframe. Round-trip events. */
type CommonEventTypes =
  | "toggleExpand"
  | "chatProviderListSessions"
  | "chatProviderCreateSession"
  | "chatProviderListSessionMessages"
  | "chatProviderSendMessage";

/** Function to send an event from the main script to the iframe */
export type sendMainEventFn = (
  type: EventTypeMain,
  data?: Record<string, any>
) => void;

/** Events sent from the main script */
export type EventTypeMain = CommonEventTypes | "set_config";

/** Function to send an event from the iframe to the main script */
export type sendIframeEventFn = (
  type: EventTypeIframe,
  data?: Record<string, any>
) => void;

/** Events sent from the iframe */
export type EventTypeIframe = CommonEventTypes | "init" | "LOG" | "runAction";

export type EventHandler = <T extends any>(
  data: MessageEvent<T>["data"]
) => void;

export type DataOrError<T> =
  | DataResponse<T>
  | { error: string }
  | { loading: boolean };

export interface DataResponse<T> {
  data: T;
}

export interface ChatWidgetConfig {
  debug?: boolean;
  chatWindow?: ChatWindowConfig;
  chatProvider?: ChatProvider;
  actionsMap?: Record<string, Function | string>;
}

export interface ChatWindowConfig {
  defaults?: ChatWidgetDefaults;
  header?: ChatWindowHeaderConfig;
  expanded?: boolean;
  disallowExpand?: boolean;
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

/**
 * Options for listing chat sessions for a user.
 */
export interface ChatProviderListSessionsOptions {}

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
  multiSession: boolean;

  /**
   * Optional: List all chat sessions for a user.
   * @param options - Options for listing sessions.
   * @returns Promise resolving to an array of chat sessions.
   */
  listSessions?: (
    options: ChatProviderListSessionsOptions
  ) => Promise<ChatProviderSession[]>;

  /**
   * Optional: Create a new chat session.
   * @returns Promise resolving to the created session id.
   */
  createSession?: <T>() => Promise<T | void>;

  /**
   * List all messages in a given chat session.
   * @param options - Options for listing session messages.
   * @returns Promise resolving to an array of messages.
   */
  listSessionMessages: (
    options: ChatProviderListSessionMessagesOptions
  ) => Promise<ChatProviderListSessionMessagesMessage[]>;

  /**
   * Send a message to a chat session.
   * @param options - Options for sending a message.
   * @returns Promise resolving to the sent message.
   */
  sendMessage: (
    options: ChatProviderSendMessageOptions
  ) => Promise<ChatProviderListSessionMessagesMessage>;
}

export type HTTPMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export type AgentFunction = (
  args?: Record<string, any>
) =>
  | Promise<string | boolean>
  | ((args?: Record<string, any>) => string | boolean);

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

export interface NavigableAIOptions {
  /**
   * HTML id of the div to render the chat window.
   */
  id?: string;
  /**
   * Your agent embed ID.
   */
  embedId?: string;
  /**
   * Unique identifier of your user.
   */
  identifier?: string;
  /**
   * Configuration for the shared secret key.
   */
  sharedSecretKeyConfig?: SharedSecretKeyConfig;
  /**
   * Enable markdown in the chat window. This will dynamically import showdown to convert markdown to HTML.
   */
  markdown?: boolean;
  /**
   * Configuration for your Navigable AI proxy API endpoints.
   */
  apiConfig?: {
    /**
     * Proxy API endpoint config for sending messages to the assistant.
     */
    sendMessage?: APIUrlConfig;
    /**
     * Proxy API endpoint config for getting the last 20 messages in the conversation.
     */
    getMessages?: APIUrlConfig;
  };
  /**
   * Navigation actions to be suggested by the assistant.
   */
  actions?: Record<string, Function | string | null>;
  /**
   * Automatically run an action suggested by the assistant.
   *
   * @default false
   */
  autoRunActions?: boolean;
  /**
   * Functions that can be automated through the assistant. The function should return a string with a status message or simply true for success and false for error.
   */
  agentFunctions?: Record<string, AgentFunction>;
  /**
   * Default values for the chat window.
   */
  defaults?: {
    /**
     * Error message to be shown if the request fails.
     */
    error?: string;
    /**
     * Title of the chat window. Default is "Assistant".
     */
    title?: string;
    /**
     * Placeholder text for the input field.
     */
    inputPlaceholder?: string;
    /**
     * Logo for the chat window. HTML string. Default is a sparkles icon.
     */
    logo?: string;
    /**
     * Icon for the close button. HTML string. Default is a cross icon.
     */
    closeIcon?: string;
    /**
     * Icon for the send button. HTML string. Default is a send icon.
     */
    sendIcon?: string;
    /**
     * Loader for the chat window message when the assistant response is loading. HTML string. Default is a dots animation.
     */
    loader?: string;
    /**
     * Button for the chat window. HTML string. Default is a button.
     */
    widgetButton?: string;
  };
  /**
   * Enable dark mode for the chat window.
   */
  darkTheme?: boolean;
  /**
   * Disable the widget button in the chat window. Default is false.
   */
  widgetButtonDisabled?: boolean;
  /**
   * Position of the widget button in the chat window. Default is "bottom-right".
   */
  widgetButtonPosition?: "bottom-right" | "bottom-left";
  /**
   * Default message to be shown when the user opens the chat window for the first time.
   */
  welcomeMessage?: string;
  /**
   * Default actions to suggest to the user when the user opens the chat window for the first time.
   */
  welcomeActions?: string[];
}

export interface NavigableChatProviderOptions {
  /** Navigable AI Embed ID for the chat provider. */
  embedId?: string;

  /** Optional user ID to initialize the provider with. If not provided, UUID v7 is used. */
  userId?: string;

  /** Optional flag to toggle support for multiple chat sessions. */
  multiSession?: boolean;
}
