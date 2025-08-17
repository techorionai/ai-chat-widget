import {
  ChatProvider,
  ChatProviderListSessionMessagesMessage,
  ChatProviderListSessionMessagesOptions,
  ChatProviderListSessionsOptions,
  ChatProviderSendMessageOptions,
  ChatProviderSession,
  IMessage,
  NavigableChatProviderOptions,
  ToolCall,
} from "../../types.js";
import navigableResponseHandler from "../../utils/navigableResponseHandler.js";
import request from "../../utils/request.js";
import generateTULIP from "../../utils/tulip.js";

// const API_ENDPOINT = "https://www.navigable.ai/api/embed/v1";
const API_ENDPOINT = "http://localhost:3002/embed/v1";

class NavigableChatProvider implements ChatProvider {
  multiSession: boolean = true;
  private apiMode: "unknown" | "embed" | "proxy-api" = "unknown";
  private embedId?: string | undefined = undefined;
  userId: string = generateTULIP();

  lastNewSessionRequest:
    | undefined
    | {
        time: Date;
        fulfilled: boolean;
      } = undefined;

  constructor(options?: NavigableChatProviderOptions) {
    if (
      options?.userId &&
      typeof options.userId === "string" &&
      options.userId.trim() !== ""
    ) {
      this.userId = options.userId;
    }
    if (!options?.userId) {
      const lsUserId = localStorage.getItem("navigableUserId");
      if (lsUserId && lsUserId.trim() !== "") {
        this.userId = lsUserId;
      } else {
        localStorage.setItem("navigableUserId", this.userId);
      }
    }

    if (options?.embedId) {
      this.embedId = options.embedId;
      this.apiMode = "embed";
    }

    if (!options?.embedId) {
      throw new Error(
        "Please provide an embedId or proxy API config to use NavigableChatProvider."
      );
    }

    if (options?.multiSession !== undefined) {
      this.multiSession = Boolean(options.multiSession);
    }
  }

  async listSessionMessages(
    options: ChatProviderListSessionMessagesOptions
  ): Promise<ChatProviderListSessionMessagesMessage[]> {
    try {
      const res = await request<NavigableAPIResponse<NavigableMessage[]>>({
        url: `${API_ENDPOINT}/chat/sessions/${options.sessionId}?identifier=${this.userId}`,
        method: "GET",
        headers: {
          "x-embed-id": this.embedId || "",
        },
      });

      if (!res) {
        throw new Error("No response received from the API");
      }

      navigableResponseHandler(res);

      return res?.data.map((message) => ({
        role: navigableSenderMap[message.sender],
        content: message.content,
        suggestedActions: message.action ? [message.action] : undefined,
        createdAt: message.createdAt,
      }));
    } catch (error) {
      throw new Error(
        `Failed to list session messages: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async createSession(): Promise<void> {
    try {
      this.lastNewSessionRequest = {
        time: new Date(),
        fulfilled: false,
      };
    } catch (error) {
      throw new Error(
        `Failed to create session: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async sendMessage(
    options: ChatProviderSendMessageOptions
  ): Promise<ChatProviderListSessionMessagesMessage> {
    try {
      // Check if a new session is needed
      let newSession = false;
      if (this.lastNewSessionRequest && !this.lastNewSessionRequest.fulfilled) {
        newSession = true;
      }

      // Send the message
      const res = await request<NavigableAPIResponse<NavigableMessage>>({
        url: `${API_ENDPOINT}/chat`,
        method: "POST",
        body: {
          identifier: this.userId,
          new: newSession,
          message: options.content,
          markdown: true,
        },
        headers: {
          "x-embed-id": this.embedId || "",
        },
      });

      if (!res) {
        throw new Error("No response received from the API");
      }

      navigableResponseHandler<NavigableMessage>(res);

      // If successful, mark the new session request as fulfilled
      if (newSession && this.lastNewSessionRequest) {
        this.lastNewSessionRequest.fulfilled = true;
      }

      return {
        role: "assistant",
        content: res.data.content,
        suggestedActions: res.data.action ? [res.data.action] : undefined,
        createdAt: res.data.createdAt,
      };
    } catch (error) {
      throw new Error(
        `Failed to send message: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async listSessions?(
    options?: ChatProviderListSessionsOptions
  ): Promise<ChatProviderSession[]> {
    try {
      const res = await request<NavigableAPIResponse<NavigableSession[]>>({
        url: `${API_ENDPOINT}/chat/sessions?identifier=${this.userId}`,
        method: "GET",
        headers: {
          "x-embed-id": this.embedId || "",
        },
      });

      if (!res) {
        throw new Error("No response received from the API");
      }

      navigableResponseHandler(res);

      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to list sessions: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export interface NavigableAPIResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data: T;
}

interface NavigableMessage {
  sender: IMessage["sender"];
  content: string;
  new: boolean;
  createdAt: string;
  action: string | null;
  toolCalls: ToolCall[];
  tool_call_id: string | null;
  moderationFlagged: boolean | null;
  moderationComment: string | null;
}

interface NavigableSession {
  id: string;
  title: string;
  createdAt: string;
  closed: boolean;
}

const navigableSenderMap: Record<
  IMessage["sender"],
  ChatProviderListSessionMessagesMessage["role"]
> = {
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
  "ASSISTANT-LOADING": "user",
  ERROR: "user",
};

export default NavigableChatProvider;
