// ProxyChatProvider adapter for Navigable AI

import {
  ChatProvider,
  ChatProviderListSessionMessagesOptions,
  ChatProviderListSessionMessagesMessage,
  ChatProviderListSessionsOptions,
  ChatProviderSession,
  ChatProviderSendMessageOptions,
  HTTPMethods,
} from "../../../types.js";
import request from "../../../utils/request.js";
import navigableResponseHandler from "../../../utils/navigableResponseHandler.js";
import generateTULIP from "../../../utils/tulip.js";

// Same sender mapping as NavigableChatProvider
const navigableSenderMap: Record<
  import("../../../types.js").IMessage["sender"],
  import("../../../types.js").ChatProviderListSessionMessagesMessage["role"]
> = {
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
  "ASSISTANT-LOADING": "user",
  ERROR: "user",
};

interface NavigableAPIResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data: T;
}

// Proxy adapter configuration interface
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

class NavigableProxyChatProvider implements ChatProvider {
  userId: string;
  options: ProxyChatProviderOptions;
  lastNewSessionRequest:
    | undefined
    | {
        time: Date;
        fulfilled: boolean;
      } = undefined;

  constructor(options: ProxyChatProviderOptions) {
    this.options = options;
    this.userId =
      options.userId &&
      typeof options.userId === "string" &&
      options.userId.trim() !== ""
        ? options.userId
        : generateTULIP(); // fallback userId
  }

  async listSessions(
    options?: ChatProviderListSessionsOptions
  ): Promise<ChatProviderSession[]> {
    const endpoint = this.options.endpoints.listSessions;
    if (!endpoint) throw new Error("listSessions endpoint not configured");

    const headers = {
      ...(this.options.commonHeaders || {}),
      ...(endpoint.headers || {}),
    };

    const res = await request<NavigableAPIResponse<ChatProviderSession[]>>(
      {
        url: endpoint.url.replace("{userId}", this.userId),
        method: endpoint.method,
        headers,
        signaturePayload: this.userId,
      },
      this.options.sharedSecretKeyConfig
        ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
        : undefined
    );

    if (!res) {
      throw new Error("No response received from the API");
    }

    navigableResponseHandler(res);

    // NavigableSession transformation (direct mapping)
    return res.data.map((session: any) => ({
      id: session.id,
      title: session.title,
      createdAt: session.createdAt,
      closed: session.closed,
    })) as ChatProviderSession[];
  }

  async createSession(): Promise<void> {
    this.lastNewSessionRequest = {
      time: new Date(),
      fulfilled: false,
    };
  }

  async listSessionMessages(
    options: ChatProviderListSessionMessagesOptions
  ): Promise<ChatProviderListSessionMessagesMessage[]> {
    const endpoint = this.options.endpoints.listSessionMessages;
    if (!endpoint)
      throw new Error("listSessionMessages endpoint not configured");
    if (!options?.sessionId) throw new Error("sessionId required");

    const headers = {
      ...(this.options.commonHeaders || {}),
      ...(endpoint.headers || {}),
    };

    const url = endpoint.url
      .replace("{userId}", this.userId)
      .replace("{sessionId}", options.sessionId);

    const res = await request<
      NavigableAPIResponse<import("../../../types.js").IMessage[]>
    >(
      {
        url,
        method: endpoint.method,
        headers,
        signaturePayload: this.userId,
      },
      this.options.sharedSecretKeyConfig
        ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
        : undefined
    );

    if (!res) {
      throw new Error("No response received from the API");
    }

    navigableResponseHandler(res);

    return res.data.map((message: import("../../../types.js").IMessage) => ({
      role: navigableSenderMap[message.sender],
      content: message.content,
      suggestedActions: message.action ? [message.action] : undefined,
      createdAt:
        typeof message.createdAt === "string"
          ? message.createdAt
          : message.createdAt instanceof Date
          ? message.createdAt.toISOString()
          : String(message.createdAt),
    })) as ChatProviderListSessionMessagesMessage[];
  }

  async sendMessage(
    options: ChatProviderSendMessageOptions
  ): Promise<ChatProviderListSessionMessagesMessage> {
    const endpoint = this.options.endpoints.sendMessage;
    if (!endpoint) throw new Error("sendMessage endpoint not configured");

    // Check if a new session is needed
    let newSession = false;
    if (this.lastNewSessionRequest && !this.lastNewSessionRequest.fulfilled) {
      newSession = true;
    }

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
      new: newSession,
    };

    const res = await request<
      NavigableAPIResponse<import("../../../types.js").IMessage>
    >(
      {
        url,
        method: endpoint.method,
        headers,
        body,
        signaturePayload: options.content,
      },
      this.options.sharedSecretKeyConfig
        ? { sharedSecretKeyConfig: this.options.sharedSecretKeyConfig }
        : undefined
    );

    if (!res) {
      throw new Error("No response received from the API");
    }

    navigableResponseHandler(res);

    // If successful, mark the new session request as fulfilled
    if (newSession && this.lastNewSessionRequest) {
      this.lastNewSessionRequest.fulfilled = true;
    }

    return {
      role: "assistant",
      content: res.data.content,
      suggestedActions: res.data.action ? [res.data.action] : undefined,
      createdAt:
        typeof res.data.createdAt === "string"
          ? res.data.createdAt
          : res.data.createdAt instanceof Date
          ? res.data.createdAt.toISOString()
          : String(res.data.createdAt),
    } as ChatProviderListSessionMessagesMessage;
  }
}

export default NavigableProxyChatProvider;
