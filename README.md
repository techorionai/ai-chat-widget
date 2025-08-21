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

Note: The default NavigableChatProvider implements all required methods (`listSessions`, `createSession`, `listSessionMessages`, `sendMessage`). For advanced customization, see the sections below.

## Theme and Color Customization

The chat widget offers extensive theme and color customization through its configuration options. You can control colors, appearance, and layout for both light and dark modes.

### Chat Window Theme (`chatWindow.defaults`)

- **primaryColor**: Predefined theme color (`"dark"`, `"gray"`, `"red"`, `"pink"`, `"grape"`, `"violet"`, `"indigo"`, `"blue"`, `"cyan"`, `"green"`, `"lime"`, `"yellow"`, `"orange"`, `"teal"`)
- **colorScheme**: `"light"` or `"dark"`
- **messageRadius**: Border radius for messages (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` or any CSS value)
- **colors**: Custom colors for widget background and text (see below)
- **assistantMessage** / **userMessage**: Custom colors for assistant/user messages, supporting light/dark mode

**Note:** All `bg` and `color` properties throughout the widget (including `chatWindow.defaults`, `assistantMessage`, `userMessage`, header, and home screen) support both predefined color names (e.g., `"blue"`, `"violet"`, `"gray"`, etc.) and hex codes (e.g., `"#22223b"`, `"#fff"`), as well as standard CSS color values.

#### Example

```js
chatWindow: {
  defaults: {
    primaryColor: "violet",
    colorScheme: "dark",
    messageRadius: "lg",
    colors: {
      light: { bg: "#f8f9fa", color: "#222" },
      dark: { bg: "#22223b", color: "#fff" }
    },
    assistantMessage: {
      light: { bg: "#e0e7ff", color: "#3730a3" },
      dark: { bg: "#3730a3", color: "#e0e7ff" }
    },
    userMessage: {
      light: { bg: "#fffbe6", color: "#92400e" },
      dark: { bg: "#92400e", color: "#fffbe6" }
    }
  }
}
```

### Chat Window Header (`chatWindow.header`)

- **bg**: Header background color (applies to both light and dark modes)
- **color**: Header text color

#### Example

```js
header: {
  bg: "#22223b",
  color: "#fff"
}
```

### Home Screen Background (`homeScreenConfig.bgColor`)

- **type**: `"plain"`, `"custom"`, or `"default"`
- **background**: Custom CSS background (if `type` is `"custom"`)

#### Example

```js
homeScreenConfig: {
  bgColor: {
    type: "custom",
    background: "linear-gradient(135deg, #f0f4f8, #e0e7ed)"
  }
}
```

### Switching Color Schemes

You can toggle between light and dark modes programmatically:

```js
window.$aiChatWidget.toggleColorScheme("light");
window.$aiChatWidget.toggleColorScheme("dark");
```

### Tips

- Use hex, rgb, or CSS color values for maximum flexibility.
- Combine predefined theme colors with custom overrides for unique branding.
- All color options support both light and dark modes for accessibility.

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
