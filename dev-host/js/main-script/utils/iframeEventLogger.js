import { IFRAME_ORIGIN } from "../consts.js";
import iframeEventHandler from "./iframeEventHandler.js";
export const initIframeEventLogger = () => {
    window.addEventListener("message", (event) => {
        if (event.origin !== IFRAME_ORIGIN)
            return;
        if (window.$aiChatWidget?.initialConfig?.debug) {
            console.log("[Iframe Chat Widget]", event.data?.type, event.data?.data);
        }
        iframeEventHandler(event);
    });
};
