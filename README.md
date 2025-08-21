# Navigable AI Chat Widget

A highly customizable chat widget for web applications, supporting integration with any backend or LLM.

---

## Table of Contents

- Quickstart with Navigable AI
- Introduction
- Installation / Embedding
- Initialization Example
- Configuration Options
- Widget Controls & Event Handling
- Customization Tips & Advanced Usage
- Implementing a Custom ChatProvider (Connect to Any LLM)
- References

---

## Quickstart with Navigable AI

Get started with the minimal setup:

```js
initAiChatWidget({
  chatProvider: new NavigableChatProvider({
    embedId: "YOUR_EMBED_ID",
    userId: "USER_ID",
  }),
});
```

The default NavigableChatProvider implements all required methods (`listSessions`, `createSession`, `listSessionMessages`, `sendMessage`). For advanced customization, see the sections below.

---

## Introduction

The Navigable AI Chat Widget enables you to add conversational AI to your website or app. It is fully configurable and can connect to any backend or LLM via a custom provider.

---

## Installation / Embedding

Include the main script in your HTML and initialize the widget:

```html
<script src="path/to/main-script.js"></script>
<script>
  initAiChatWidget({
    debug: true,
    chatWindow: {
      /* ... */
    },
    chatProvider: new NavigableChatProvider({
      embedId: "YOUR_EMBED_ID",
      userId: "USER_ID",
    }),
    actionsMap: {
      /* ... */
    },
    homeScreenConfig: {
      /* ... */
    },
    sessionsListConfig: {
      /* ... */
    },
  });
</script>
```

See [`dev-host/js/example.js:1`](dev-host/js/example.js:1) for a complete example.

---

## Initialization Example

```js
initAiChatWidget({
  debug: true,
  chatWindow: {
    defaults: {
      primaryColor: "orange",
      colorScheme: "light",
    },
    header: {
      avatars: [
        { name: "Navigable AI", url: "https://www.navigable.ai/logo/64.png" },
      ],
      maxShownAvatars: 2,
      title: { title: "Support", showOnlineSubtitle: true },
    },
    hideAssistantMessageAvatar: true,
    hideUserMessageAvatar: true,
    welcomeMessage: {
      message: "Hello! I'm Navi, your AI assistant...",
      actions: ["Go to Sign Up", "Go to Log In"],
      infoText: "We help improve and scale your customer support...",
    },
  },
  chatProvider: new NavigableChatProvider({
    embedId: "YOUR_EMBED_ID",
    userId: "USER_ID",
  }),
  actionsMap: {
    // "Go to Support Portal": () => alert("Navigating..."),
    // "Go to Support Portal": "https://www.navigable.ai/contact-us",
  },
  homeScreenConfig: {
    bgColor: { type: "custom", background: "linear-gradient(...)" },
    logoUrl: "https://www.navigable.ai/banner-transparent-bg.png",
    logoUrlDark: "https://www.navigable.ai/logo/64.png",
    additionalCards: [
      {
        type: "button",
        config: { title: "...", description: "...", action: "/" },
      },
      {
        type: "image",
        config: {
          imageUrl: "...",
          title: "...",
          description: "...",
          action: "/",
        },
      },
      {
        type: "link",
        config: { title: "...", description: "...", action: "/" },
      },
    ],
  },
  sessionsListConfig: {
    // title: "Sessions",
    // newSessionButton: { text: "New Session" },
  },
});
```

---

## Configuration Options

The widget is configured via a `ChatWidgetConfig` object. Key options:

- **debug**: Enable console logs (`true`/`false`).
- **chatWindow**: Customize chat window appearance and behavior.
  - `defaults`: Colors, color scheme, message radius, etc.
  - `header`: Avatars, title, background, and text color.
  - `expanded`, `disallowExpand`: Control expand/collapse behavior.
  - `welcomeMessage`: Initial message, actions, info text.
  - `hideAssistantMessageAvatar`, `hideUserMessageAvatar`: Hide avatars in messages.
- **chatProvider**: Adapter for chat backend (e.g., `NavigableChatProvider` or custom).
- **actionsMap**: Map action names to functions or URLs.
- **homeScreenConfig**: Configure home screen (background, logo, avatars, cards).
- **sessionsListConfig**: Customize chat sessions list (title, new session button).

See [`main-script/src/types.ts:50`](main-script/src/types.ts:50) for full type definitions.

---

## Widget Controls & Event Handling

Control the widget programmatically:

- `window.$aiChatWidget.toggle()`: Toggle widget open/closed.
- `window.$aiChatWidget.open()`: Open the widget.
- `window.$aiChatWidget.close()`: Close the widget.
- `window.$aiChatWidget.toggleColorScheme()`: Toggle between light/dark mode.
- `window.$aiChatWidget.toggleColorScheme("light" | "dark")`: Set color scheme directly.
- `window.$aiChatWidget.getColorScheme()`: Get current color scheme.

Example:

```js
document.getElementById("toggle-btn").addEventListener("click", () => {
  window.$aiChatWidget.toggle();
});
```

See [`dev-host/js/example.js:113`](dev-host/js/example.js:113) for more examples.

---

## Customization Tips & Advanced Usage

- **Appearance**: Customize colors, avatars, header, and message radius via `chatWindow.defaults` and `chatWindow.header`.
- **Welcome Message**: Set a custom welcome message, info text, and suggested actions using `chatWindow.welcomeMessage`.
- **Actions Map**: Map action names to functions or URLs for agent-suggested actions (`actionsMap`).
- **Home Screen**: Configure background, logo, avatars, and additional cards (`homeScreenConfig`). Cards can be buttons, images, or links.
- **Session List**: Customize session list title and new session button (`sessionsListConfig`).
- **Chat Provider**: Integrate with your backend by implementing the `ChatProvider` interface.
- **Dark/Light Mode**: Support both color schemes and toggle programmatically.

---

## Implementing a Custom ChatProvider (Connect to Any LLM)

To connect the chat widget to any LLM or backend, implement the [`ChatProvider`](main-script/src/types.ts:333) interface. **All four methods are required:**

- `listSessions(options)`: List all chat sessions.
- `createSession()`: Create a new chat session.
- `listSessionMessages(options)`: Return messages for a session.
- `sendMessage(options)`: Send a message and return the response.

**Example:**

```js
class MyLLMChatProvider {
  async listSessions(options) {
    // Fetch sessions from your backend or LLM API
    return [
      { id: "session1", title: "Chat 1", createdAt: new Date().toISOString() },
    ];
  }

  async createSession() {
    // Create a new session in your backend or LLM API
    return "new-session-id";
  }

  async listSessionMessages({ sessionId }) {
    // Fetch messages from your backend or LLM API
    return [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi, how can I help?" },
    ];
  }

  async sendMessage({ sessionId, content }) {
    // Send message to your LLM and return the assistant's reply
    const response = await fetch("https://api.my-llm.com/chat", {
      method: "POST",
      body: JSON.stringify({ sessionId, content }),
    });
    const data = await response.json();
    return { role: "assistant", content: data.reply };
  }
}

// Usage:
initAiChatWidget({
  chatProvider: new MyLLMChatProvider(),
  // ...other config
});
```

See [`main-script/src/types.ts:333`](main-script/src/types.ts:333) for full interface details.

---

## References

- [`main-script/src/types.ts:50`](main-script/src/types.ts:50) - ChatWidgetConfig and related types
- [`dev-host/js/example.js:1`](dev-host/js/example.js:1) - Example initialization and usage
