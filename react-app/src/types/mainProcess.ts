export type sendMainEventFn = (
  type: EventTypeMain,
  data?: Record<string, any>
) => void;

export type EventTypeMain = "set_config" | "toggleExpand";

export type sendIframeEventFn = (
  type: EventTypeIframe,
  data?: Record<string, any>
) => void;

export type EventTypeIframe = "init" | "LOG" | "toggleExpand";

export type EventHandler = <T extends any>(
  data: MessageEvent<T>["data"]
) => void;

export interface ChatWidgetConfig {
  debug?: boolean;
  chatWindow?: ChatWindowConfig;
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
}

/**
 * Interface for a chat provider adapter.
 * Implementations must set the userId property.
 * Implementations should provide methods for session and message management.
 */
export interface ChatProvider {
  /** Unique identifier for the user using this provider. */
  userId: string;

  /**
   * Optional: List all chat sessions for a user.
   * @param options - Options for listing sessions.
   * @returns Promise resolving to an array of chat sessions.
   */
  listSessions?: (
    options: ChatProviderListSessionsOptions
  ) => Promise<ChatProviderSession[]>;

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
