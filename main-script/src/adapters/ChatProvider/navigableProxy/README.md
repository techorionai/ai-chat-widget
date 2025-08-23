# NavigableProxyChatProvider

A flexible ChatProvider adapter for Navigable AI that lets you connect your chat widget to any backend via custom endpoints, methods, headers, and optional shared secret key verification.

## Features

- Configure individual endpoints for each chat operation
- Set custom HTTP methods and headers per endpoint
- Merge common headers for all requests
- Supports optional HMAC shared secret key for request integrity/authentication
- Automatic data transformation to Navigable AI widget format

## Example: Express.js Backend Proxy Server

If your backend uses the [NavigableAI Node.js SDK](https://www.npmjs.com/package/navigableai-node) and exposes endpoints like below:

```txt
// Example endpoints
POST   /assistant/send-message
GET    /assistant/get-messages
GET    /assistant/get-chat-sessions
GET    /assistant/get-session-messages/:sessionId
```

Configure your frontend adapter like this, and pass it to the chat widget:

```typescript
const proxyProvider = new NavigableProxyChatProvider({
  userId: "user-123",
  commonHeaders: { "x-request-signature": "SIGNATURE" }, // Signature is auto-generated
  sharedSecretKeyConfig: {
    sharedSecretKey: "YOUR_SHARED_SECRET_KEY",
    placement: "header",
    key: "x-request-signature",
  },
  endpoints: {
    listSessions: {
      url: "http://localhost:3000/assistant/get-chat-sessions?identifier={userId}",
      method: "GET",
    },
    createSession: {
      url: "http://localhost:3000/assistant/send-message",
      method: "POST",
    },
    listSessionMessages: {
      url: "http://localhost:3000/assistant/get-session-messages/{sessionId}?identifier={userId}",
      method: "GET",
    },
    sendMessage: {
      url: "http://localhost:3000/assistant/send-message",
      method: "POST",
    },
  },
});

initAiChatWidget({
  chatProvider: proxyProvider,
});
```

### Notes

- The adapter will automatically generate and attach the HMAC signature for each request.
- The backend must verify the signature using the same shared secret key.
- The payload signed is:
  - `userId` for session/message listing
  - `content` for sending messages

## API Reference

See [`navigableProxy.ts`](./navigableProxy.ts) for full implementation details.
