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
    // disallowExpand: true,
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
    logoUrl: "https://www.navigable.ai/banner-transparent-bg.png",
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
