initAiChatWidget({
  debug: true,
  chatWindow: {
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
  chatProvider: new NavigableChatProvider({
    embedId: "Njg1ZmM4NGNjOTQxZmI2NzZlY2QwNWVk",
    userId: "david@techorionai.com",
  }),
  actionsMap: {
    // "Go to Support Portal": () => alert("Navigating to Support Portal..."), // Function to handle action
    // "Go to Support Portal": "https://www.navigable.ai/contact-us", // Link to handle action
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
