const logger = {
  log: (...args: any[]) => {
    if (window.$aiChatWidget?.initialConfig?.debug) {
      console.log("[Main Chat Widget]", ...args);
    }
  },
  warn: (...args: any[]) => {
    console.warn("[Main Chat Widget]", ...args);
  },
  error: (...args: any[]) => {
    console.error("[Main Chat Widget]", ...args);
  },
};

export default logger;
