// import NavigableChatProvider from "https://www.navigable.ai/widget/scripts/main/adapters/ChatProvider/navigable/navigable.js";

const navigableChatProvider = new NavigableChatProvider({
  embedId: "",
  userId: "testing@techorionai.com",
});
initAiChatWidget({
  debug: true,
  // widgetButton: `<button id="override-widget-button" aria-label="Open assistant" style="background-color: #000; color: #ffffff; border-radius: 50%; border: none; position: fixed; bottom: 1.5rem; right: 1.5rem; width: 3rem; height: 3rem; display: flex; justify-content: center; align-items: center; cursor: pointer;"> <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-message-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" /><path d="M19 16l-2 3h4l-2 3" /></svg> </button>`,
  chatWindow: {
    defaults: {
      primaryColor: "orange", // One of the predefined colors or a hex color value
      colorScheme: "light", // or "dark"
      mantineThemeOverride: {}, // Mantine theme override for the chat widget. Refer: https://mantine.dev/theming/theme-object/
      // messageRadius: "lg", // or "xs" | "sm" | "md" | "lg" | "xl" | string (border-radius CSS value)
      // assistantMessage: {
      //   light: {
      //     bg: "blue",
      //     color: "white",
      //   },
      //   dark: {
      //     bg: "blue",
      //     color: "white",
      //   },
      // },
      // userMessage: {
      //   light: {
      //     bg: "black",
      //     color: "white",
      //   },
      //   dark: {
      //     bg: "white",
      //     color: "black",
      //   },
      // },
    },
    header: {
      avatars: [
        {
          name: "Navigable AI",
          url: "https://www.navigable.ai/logo/64.png",
        },
      ],
      maxShownAvatars: 2,
      title: {
        title: "Support",
        showOnlineSubtitle: true,
      },
      // bg: "blue",
      // color: "white",
    },
    // expanded: true,
    // disallowExpand: true,
    hideAssistantMessageAvatar: true, // Hide assistant avatar in messages
    hideUserMessageAvatar: true, // Hide user avatar in messages
    welcomeMessage: {
      message:
        "Hello! I'm Navi, your AI assistant. How can I help you today? I can guide you through the Navigable AI platform by suggesting actions.",
      actions: [
        "Go to Sign Up",
        "Go to Log In",
        "Go to Pricing",
        "Go to Support Portal",
      ],
      infoText:
        "We help improve and scale your customer support with the power of specialized AI agents.",
    },
  },
  chatProvider: navigableChatProvider,
  // chatProvider: navigableProxyProvider,
  actionsMap: {
    "Go to Support Portal": () => alert("Navigating to Support Portal..."), // Function to handle action
    // "Go to Support Portal": "https://www.navigable.ai/contact-us", // Alternatively, pass a link to handle action
    "Go to Sign Up": () => alert("Navigating to Sign Up page..."),
    "Go to Log In": () => alert("Navigating to Log In page..."),
    "Go to Pricing": () => alert("Navigating to Pricing page..."),
  },
  homeScreenConfig: {
    bgColor: {
      // type: "custom", // Or "plain" or "default"
      // background: "linear-gradient(135deg, #f0f4f8, #e0e7ed)",
    },
    logoUrl: "https://www.navigable.ai/banner-transparent-bg.png",
    logoUrlDark: "https://www.navigable.ai/logo/64.png",
    additionalCards: [
      {
        type: "button",
        config: {
          title: "Title (Optional)",
          description: "This is a description for the button card.",
          action: "/",
        },
      },
      {
        type: "image",
        config: {
          imageUrl:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
          title: "Image Card Title (Optional)",
          description: "This is a description for the image card.",
          action: "/",
        },
      },
      {
        type: "link",
        config: {
          title: "Title (Optional)",
          description: "This is a description for the link card.",
          action: "/",
        },
      },
    ],
  },
  sessionsListConfig: {
    // title: "Sessions",
    // newSessionButton: {
    //   text: "New Session",
    // },
  },
  disableCloseButton: true,
});

document.getElementById("toggle-btn").addEventListener("click", () => {
  window.$aiChatWidget.toggle();
});

document.getElementById("open-btn").addEventListener("click", () => {
  window.$aiChatWidget.open();
});

document.getElementById("close-btn").addEventListener("click", () => {
  window.$aiChatWidget.close();
});

document
  .getElementById("toggle-color-scheme-btn")
  .addEventListener("click", () => {
    // Get the current color scheme
    console.log("Current color scheme:", window.$aiChatWidget.colorScheme);
    // Functionally
    const colorScheme = window.$aiChatWidget.getColorScheme();
    console.log("Current color scheme from function:", colorScheme);

    // Toggle the color scheme
    window.$aiChatWidget.toggleColorScheme();
  });

document.getElementById("light-mode-btn").addEventListener("click", () => {
  window.$aiChatWidget.toggleColorScheme("light");
});

document.getElementById("dark-mode-btn").addEventListener("click", () => {
  window.$aiChatWidget.toggleColorScheme("dark");
});

window.$aiChatWidget.open();
