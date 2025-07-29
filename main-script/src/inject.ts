import { IFRAME_ID, IFRAME_SRC } from "./consts.js";
import { initIframeEventLogger } from "./utils/iframeEventLogger.js";
import { ChatWidgetConfig } from "./types.js";
import sendEventToIframe from "./utils/sendEvent.js";
import logger from "./utils/logger.js";

export function injectAiChatWidget(config: ChatWidgetConfig = {}) {
  try {
    // Use existing iframe if present, else create
    let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = IFRAME_ID;
      document.body.appendChild(iframe);
      window.$aiChatWidget = {
        Iframe: iframe,
        sendEvent: sendEventToIframe,
        initialConfig: config,
      };
      initIframeEventLogger();
    }
    iframe.src = IFRAME_SRC;
    iframe.style.display = "block";
    iframe.style.position = "fixed";
    iframe.style.bottom = "24px";
    iframe.style.right = "24px";
    iframe.style.width = "400px";
    iframe.style.maxWidth = "calc(100vw - 48px)";
    iframe.style.height = "704px";
    iframe.style.maxHeight = "calc(100vh - 48px)";
    iframe.style.border = "none";
    iframe.style.borderRadius = "16px";
    iframe.style.boxShadow = "rgb(0 0 0 / 16%) 0px 0px 16px";
    iframe.style.zIndex = "9999";
    iframe.allow = "clipboard-write";
  } catch (error) {
    logger.error("Error injecting widget:", error);
  }
}
