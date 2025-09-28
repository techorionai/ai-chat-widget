# Navigable AI Chat Widget

A highly customizable chat widget for web applications, supporting integration with any backend or LLM via a custom provider.

This widget is designed to provide a seamless chat experience, with extensive theming options, easy integration, and support for both light and dark modes.

## Powered by

- [Mantine UI](https://mantine.dev/) (theming & UI)
- [Tabler Icons](https://tabler.io/icons) (icons)
- [react-router](https://reactrouter.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)

## Table of Contents

- [Quickstart with Navigable AI](#quickstart-with-navigable-ai)
- [Theme and Color Customization](#theme-and-color-customization)
- [Installation / Embedding](#installation--embedding)
- [Initialization Example](#initialization-example)
- [Configuration Options](#configuration-options)
- [Custom Widget Button](#custom-widget-button)
- [Widget Controls & Event Handling](#widget-controls--event-handling)
- [Customization Tips & Advanced Usage](#customization-tips--advanced-usage)
- [Implementing a Custom ChatProvider (Connect to Any LLM)](#implementing-a-custom-chatprovider-connect-to-any-llm)
- [References](#references)

## Quickstart with Navigable AI

Get started with the minimal setup.

### Via CDN

1. Add the script to your HTML:

   ```html
   <script
     type="module"
     src="https://www.navigable.ai/sdk-web/0.9.12/main/index.js"
   ></script>
   <script
     type="module"
     src="https://www.navigable.ai/sdk-web/0.9.12/main/adapters/ChatProvider/navigable/navigable.js"
   ></script>
   ```

   Remember to use type="module" in your script tags to support ES module imports if you're using the CDN approach.

2. Initialize the widget in your JavaScript:

   ```js
   initAiChatWidget({
     chatProvider: new NavigableChatProvider({
       embedId: "YOUR_EMBED_ID",
       // userId: "USER_ID", // Optional, can be used to identify the user
     }),
   });
   ```

### Via NPM

1. Install the package via npm:

   ```bash
   npm install navigableai-chat-widget
   ```

2. Import and initialize the widget in your JavaScript:

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
   });
   ```

Note the name change: `initAiChatWidget` is `injectAiChatWidget` if you are importing the package you installed via npm. All options remain the same.

### Using Other Backends or LLMs

If you're looking to connect via your Navigable AI proxy server, refer to the [NavigableProxyChatProvider](https://github.com/techorionai/ai-chat-widget/blob/master/main-script/src/adapters/ChatProvider/navigableProxy/README.md).

Note: The default NavigableChatProvider implements all required methods (`listSessions`, `createSession`, `listSessionMessages`, `sendMessage`) and is intended for use with [Navigable AI](https://www.navigable.ai/). For building custom providers, [see the sections below](#implementing-a-custom-chatprovider-connect-to-any-llm).

## Theme and Color Customization

The chat widget offers extensive theme and color customization through its configuration options. You can control colors, appearance, and layout for both light and dark modes.

### Chat Window Theme (`chatWindow.defaults`)

- **primaryColor**: Your brand hex color OR Predefined theme color (`"dark"`, `"gray"`, `"red"`, `"pink"`, `"grape"`, `"violet"`, `"indigo"`, `"blue"`, `"cyan"`, `"green"`, `"lime"`, `"yellow"`, `"orange"`, `"teal"`)
- **colorScheme**: `"light"` or `"dark"`
- **mantineThemeOverride**: Custom Mantine theme override object (see [Mantine theming](https://mantine.dev/theming/theme-override/))
- **messageRadius**: Border radius for messages (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` or any CSS value for border-radius)
- **colors**: Custom colors for widget background and text (see below)
- **assistantMessage** / **userMessage**: Custom colors for assistant/user messages, supporting light/dark mode

**Note:** All `bg` and `color` properties throughout the widget (including `chatWindow.defaults`, `assistantMessage`, `userMessage`, header, and home screen) support both predefined color names (e.g., `"blue"`, `"violet"`, `"gray"`, etc.) and hex codes (e.g., `"#22223b"`, `"#fff"`), as well as standard CSS color values.

#### Example

```js
chatWindow: {
  defaults: {
    primaryColor: "violet",
    colorScheme: "dark",
    mantineThemeOverride: {
      // Custom Mantine theme overrides
    },
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

## Installation / Embedding

Include the main script in your HTML and initialize the widget:

```html
<script
  type="module"
  src="https://www.navigable.ai/sdk-web/0.9.12/main/index.js"
></script>
<script
  type="module"
  src="https://www.navigable.ai/sdk-web/0.9.12/main/adapters/ChatProvider/navigable/navigable.js"
></script>
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
    footerConfig: {
      /* ... */
    },
  });
</script>
```

See [`dev-host/js/example.js#L1`](https://github.com/techorionai/ai-chat-widget/blob/master/dev-host/js/example.js#L1) for a complete example.

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
    headerContainerProps: { mb: "2rem" },
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
  disableCloseButton: true, // Prevents users from closing the widget
  footerConfig: {
    containerProps: { p: "md", radius: "lg" }, // Mantine PaperProps
    home: {
      text: "Home",
      props: { fw: 500 }, // Mantine TextProps
      iconProps: { size: "2rem" }, // Mantine ThemeIconProps
    },
    messages: {
      text: "Messages",
      props: { fw: 500 },
      iconProps: { size: "2rem" },
    },
  },
});
```

## Configuration Options

The widget is configured via a `ChatWidgetConfig` object. Key options:

- **debug**: Enable console logs (`true`/`false`).
- **widgetButton**: Custom HTML for the widget button (see [Custom Widget Button](#custom-widget-button)).
- **chatWindow**: Customize chat window appearance and behavior.
  - `defaults`: Colors, color scheme, message radius, etc.
  - `header`: Avatars, title, background, and text color.
  - `expanded`, `disallowExpand`: Control expand/collapse behavior.
  - `welcomeMessage`: Initial message, actions, info text.
  - `hideAssistantMessageAvatar`, `hideUserMessageAvatar`: Hide avatars in messages.
- **chatProvider**: Adapter for chat backend (e.g., `NavigableChatProvider` or custom).
- **actionsMap**: Map action names to functions or URLs. Used for handling agent-suggested actions.
- **homeScreenConfig**: Configure home screen (background, logo, avatars, cards, header container props).
- **sessionsListConfig**: Customize chat sessions list (title, new session button).
- **footerConfig**: Configure the footer shown on the home and sessions list screens.

  - `containerProps`: Mantine [PaperProps](https://mantine.dev/core/paper/) for styling the footer container.
  - `home`: Configuration for the home tab (see below).
  - `messages`: Configuration for the messages tab (see below).

- **disableCloseButton**: Disable the close button on all screens (`true`/`false`). When enabled, users cannot close the widget.

See [`main-script/src/types.ts#L50`](https://github.com/techorionai/ai-chat-widget/blob/master/main-script/src/types.ts#L50) for full type definitions.

### Footer Configuration (`footerConfig`)

The `footerConfig` option allows you to customize the footer displayed on the home and sessions list screens.

**Example:**

```js
footerConfig: {
  containerProps: { p: "md", radius: "lg" }, // Mantine PaperProps for styling
  home: {
    text: "Home",
    props: { fw: 500 }, // Mantine TextProps for text styling
    iconProps: { size: "2rem" }, // Mantine ThemeIconProps for icon styling
    altIcon: "outline/home" // Optional: Custom icon name from Tabler Icons
  },
  messages: {
    text: "Messages",
    props: { fw: 500 },
    iconProps: { size: "2rem" },
    altIcon: "outline/message-2-check" // Optional: Custom icon name from Tabler Icons
  },
}
```

- `containerProps`: Mantine [PaperProps](https://mantine.dev/core/paper/) for the footer container.
- `home` / `messages`: Each tab can be customized with:
  - `text`: Alternative tab text.
  - `props`: Mantine [TextProps](https://mantine.dev/core/text/) for text styling.
  - `iconProps`: Mantine [ThemeIconProps](https://mantine.dev/core/theme-icon/) for icon styling.
  - `altIcon`: Optional custom icon name or URL. Search our directory of [Tabler Icons](https://assets.navigable.ai/icons/) for available icons or provide your own URL for an SVG icon.

### Home Screen Header Container Props (`homeScreenConfig.headerContainerProps`)

The `headerContainerProps` option lets you pass Mantine [GroupProps](https://mantine.dev/core/group/) to the header container on the home screen.

**Example:**

```js
homeScreenConfig: {
  // ...other options
  headerContainerProps: { mb: "2rem" }, // Adds margin-bottom to the header container
}
```

## Custom Widget Button

You can override the default widget button by providing your own HTML using the `widgetButton` option in `ChatWidgetConfig`. This allows full control over the button's appearance, accessibility, and behavior.

**Example:**

```js
initAiChatWidget({
  widgetButton: `<button id="override-widget-button" aria-label="Open assistant" style="background-color: #000; color: #fff; border-radius: 50%; border: none; position: fixed; bottom: 1.5rem; right: 1.5rem; width: 3rem; height: 3rem; display: flex; justify-content: center; align-items: center; cursor: pointer;">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" /><path d="M19 16l-2 3h4l-2 3" /></svg>
  </button>`,
  // ...other config
});
```

**Usage Notes:**

- The HTML string is injected directly, so you can use any valid HTML and inline styles.
- Make sure your button includes an accessible label (`aria-label`) and is positioned as desired.
- You can add event listeners to your custom button if needed.

Refer to [`dev-host/js/example.js#L3`](https://github.com/techorionai/ai-chat-widget/blob/master/dev-host/js/example.js#L3) for a real-world example.

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

See [`dev-host/js/example.js#L113`](https://github.com/techorionai/ai-chat-widget/blob/master/dev-host/js/example.js#L113) for more examples.

## Customization Tips & Advanced Usage

- **Appearance**: Customize colors, avatars, header, and message radius via `chatWindow.defaults` and `chatWindow.header`.
- **Welcome Message**: Set a custom welcome message, info text, and suggested actions using `chatWindow.welcomeMessage`.
- **Actions Map**: Map action names to functions or URLs for agent-suggested actions (`actionsMap`).
- **Home Screen**: Configure background, logo, avatars, and additional cards (`homeScreenConfig`). Cards can be buttons, images, or links.
- **Session List**: Customize session list title and new session button (`sessionsListConfig`).
- **Chat Provider**: Integrate with your backend by implementing the `ChatProvider` interface.
- **Dark/Light Mode**: Support both color schemes and toggle programmatically.

## Implementing a Custom ChatProvider (Connect to Any LLM)

To connect the chat widget to any LLM or backend, implement the [`ChatProvider`](https://github.com/techorionai/ai-chat-widget/blob/master/main-script/src/types.ts#L333) interface. **All four methods are required:**

- `listSessions(options)`: List all chat sessions.
- `createSession()`: Create a new chat session.
- `listSessionMessages(options)`: Return messages for a session.
- `sendMessage(options)`: Send a message and return the response.

In case of any errors, simply throw an error.

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

See [`main-script/src/types.ts#L333`](https://github.com/techorionai/ai-chat-widget/blob/master/main-script/src/types.ts#L333) for full interface details.

## References

- [`main-script/src/types.ts#L50`](https://github.com/techorionai/ai-chat-widget/blob/master/main-script/src/types.ts#L50) - ChatWidgetConfig and related types
- [`dev-host/js/example.js#L1`](https://github.com/techorionai/ai-chat-widget/blob/master/dev-host/js/example.js#L1) - Example initialization and usage

```

```
