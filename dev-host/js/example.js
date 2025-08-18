initAiChatWidget({
  debug: true,
  chatWindow: {
    header: {
      avatars: [
        {
          name: "Navigable AI",
          // url: "https://www.navigable.ai/android-chrome-192x192.png",
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
