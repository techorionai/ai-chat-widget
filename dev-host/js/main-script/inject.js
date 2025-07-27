import { IFRAME_ID, IFRAME_SRC } from "./consts.js";
import { initIframeEventLogger } from "./utils/iframeEventLogger.js";
import sendEventToIframe from "./utils/sendEvent.js";
import logger from "./utils/logger.js";
export function injectAiChatWidget(config = {}) {
    try {
        // Use existing iframe if present, else create
        let iframe = document.getElementById(IFRAME_ID);
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
        iframe.style.height = "600px";
        iframe.style.border = "none";
        iframe.style.zIndex = "9999";
        iframe.allow = "clipboard-write";
        // iframe.onload = () => {
        //   window.$aiChatWidget.sendEvent("SET_CONFIG", config);
        //   setTimeout(() => {
        //     window.$aiChatWidget.sendEvent("SET_CONFIG", config);
        //   }, 1000); // Allow time for iframe to load
        // };
    }
    catch (error) {
        logger.error("Error injecting widget:", error);
    }
}
