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
});
