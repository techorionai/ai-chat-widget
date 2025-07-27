import { IFRAME_SRC } from "../consts.js";
import iframeEventHandler from "./iframeEventHandler.js";

export const initIframeEventLogger = () => {
  window.addEventListener("message", (event) => {
    if (event.origin !== IFRAME_SRC) return;
    if (window.$aiChatWidget?.initialConfig?.debug) {
      console.log("[Iframe Chat Widget]", event.data?.type, event.data?.data);
    }
    iframeEventHandler(event);
  });
};
