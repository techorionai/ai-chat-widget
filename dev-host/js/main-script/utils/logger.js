const logger = {
    log: (...args) => {
        if (window.$aiChatWidget?.initialConfig?.debug) {
            console.log("[Main Chat Widget]", ...args);
        }
    },
    warn: (...args) => {
        console.warn("[Main Chat Widget]", ...args);
    },
    error: (...args) => {
        console.error("[Main Chat Widget]", ...args);
    },
};
export default logger;
