# Navigable AI Chat Widget

A highly customizable chat widget for web applications, supporting integration with any backend or LLM via a custom provider.

This widget is designed to provide a seamless chat experience, with extensive theming options, easy integration, and support for both light and dark modes.

## Powered by

- [Mantine UI](https://mantine.dev/) (theming & UI)
- [Tabler Icons](https://tabler.io/icons) (icons)
- [react-router](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)

## Installation

Install the package via npm:

```bash
npm install navigableai-chat-widget
```

## Quick Start

The following examples demonstrate how to integrate the chat widget into your web application with [Navigable AI](https://www.navigable.ai) as the chat provider. If you want to use a different backend or LLM, implement the `ChatProvider` interface as described in [this section below](#implementing-a-custom-chatprovider).

### Using ES Modules (Recommended)

```javascript
import {
  injectAiChatWidget,
  NavigableChatProvider,
} from "navigableai-chat-widget";

// Initialize the widget with NavigableChatProvider
injectAiChatWidget({
  chatProvider: new NavigableChatProvider({
    embedId: "YOUR_EMBED_ID",
    userId: "USER_ID", // Optional
  }),
  chatWindow: {
    defaults: {
      primaryColor: "blue",
      colorScheme: "light",
    },
  },
});
```

### Using Script Tag

```html
<script
  type="module"
  src="https://www.navigable.ai/widget/scripts/main/index.js"
></script>
<script>
  // The function is available globally as initAiChatWidget
  initAiChatWidget({
    chatProvider: new NavigableChatProvider({
      embedId: "YOUR_EMBED_ID",
      userId: "USER_ID",
    }),
    // ... configuration
  });
</script>
```

## Configuration Options

The widget is configured via a `ChatWidgetConfig` object. Key options:

- **debug**: Enable console logs (`true`/`false`).
- **widgetButton**: Custom HTML for the widget button.
- **chatWindow**: Customize chat window appearance and behavior.
  - `defaults`: Colors, color scheme, message radius, etc.
  - `header`: Avatars, title, background, and text color.
  - `expanded`, `disallowExpand`: Control expand/collapse behavior.
  - `welcomeMessage`: Initial message, actions, info text.
  - `hideAssistantMessageAvatar`, `hideUserMessageAvatar`: Hide avatars in messages.
- **chatProvider**: Adapter for chat backend (required - implement `ChatProvider` interface).
- **actionsMap**: Map action names to functions or URLs. Used for handling agent-suggested actions.
- **homeScreenConfig**: Configure home screen (background, logo, avatars, cards).
- **sessionsListConfig**: Customize chat sessions list (title, new session button).

## Basic Example

```javascript
import { injectAiChatWidget } from "navigableai-chat-widget";

// Example with minimal configuration
injectAiChatWidget({
  debug: true,
  chatWindow: {
    defaults: {
      primaryColor: "violet",
      colorScheme: "light",
    },
    header: {
      avatars: [{ name: "Assistant", url: "https://example.com/avatar.png" }],
      title: { title: "Support Chat", showOnlineSubtitle: true },
    },
    welcomeMessage: {
      message: "Hello! How can I help you today?",
      infoText: "I'm here to assist you with any questions.",
    },
  },
  chatProvider: new NavigableChatProvider({
    embedId: "YOUR_EMBED_ID",
    userId: "USER_ID",
  }),
  actionsMap: {
    "Contact Support": "https://example.com/support",
    "Go to Dashboard": () => (window.location.href = "/dashboard"),
  },
});
```

## Implementing a Custom ChatProvider

To connect the chat widget to any LLM or backend, implement the `ChatProvider` interface. **All four methods are required:**

```javascript
class YourChatProvider {
  async listSessions(options) {
    // Fetch sessions from your backend
    return [
      { id: "session1", title: "Chat 1", createdAt: new Date().toISOString() },
    ];
  }

  async createSession() {
    // Create a new session
    return "new-session-id";
  }

  async listSessionMessages({ sessionId }) {
    // Fetch messages for a session
    return [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi, how can I help?" },
    ];
  }

  async sendMessage({ sessionId, content, enabledActions }) {
    // Send message and return assistant's reply
    const response = await fetch("https://api.your-backend.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, content, enabledActions }),
    });
    const data = await response.json();

    return {
      role: "assistant",
      content: data.reply,
      suggestedActions: data.suggestedActions, // Optional
      createdAt: new Date().toISOString(), // Optional
    };
  }
}
```

## Widget Controls

Control the widget programmatically:

```javascript
// Toggle widget open/closed
window.$aiChatWidget.toggle();

// Open the widget
window.$aiChatWidget.open();

// Close the widget
window.$aiChatWidget.close();

// Toggle color scheme
window.$aiChatWidget.toggleColorScheme("dark");
window.$aiChatWidget.toggleColorScheme("light");

// Get current color scheme
const currentScheme = window.$aiChatWidget.getColorScheme();
```

## Theme and Color Customization

The chat widget offers extensive theme and color customization:

```javascript
chatWindow: {
  defaults: {
    primaryColor: "violet", // or hex code like "#7c3aed"
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
  },
  header: {
    bg: "#22223b",
    color: "#fff"
  }
}
```

## Custom Widget Button

Override the default widget button:

```javascript
injectAiChatWidget({
  widgetButton: `
    <button id="custom-widget-button" aria-label="Open chat" 
            style="background: #7c3aed; color: white; border: none; 
                   border-radius: 50%; position: fixed; bottom: 20px; 
                   right: 20px; width: 60px; height: 60px; cursor: pointer;">
      💬
    </button>
  `,
  // ... other config
});
```

## Browser Environment

This package is designed for browser environments only. It requires `window` and `document` objects and will throw an error if used in Node.js or other non-browser environments.

## TypeScript Support

This package includes TypeScript definitions. All configuration interfaces are exported:

```typescript
import {
  injectAiChatWidget,
  ChatWidgetConfig,
  ChatProvider,
  ChatProviderSession,
  ChatProviderListSessionMessagesMessage,
  NavigableChatProvider,
} from "navigableai-chat-widget";
```

## License

This package is part of the [Navigable AI Chat Widget](https://github.com/techorionai/ai-chat-widget) project. Please refer to the main project repository for licensing information.

## Support

For issues, questions, or contributions, please visit the [main project repository](https://github.com/techorionai/ai-chat-widget).
