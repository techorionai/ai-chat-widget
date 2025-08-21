import { IFRAME_ID, IFRAME_SRC } from "./consts.js";
import { initIframeEventLogger } from "./utils/iframeEventLogger.js";
import sendEventToIframe from "./utils/sendEvent.js";
import logger from "./utils/logger.js";
import { closeWidget, openWidget, toggleWidget } from "./utils/toggleWidget.js";
import { getColorScheme, toggleColorScheme, } from "./utils/toggleColorScheme.js";
import { defaultExpandedSize, defaultNormalSize, } from "./eventHandlers/toggleExpand.js";
export function injectAiChatWidget(config) {
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
                chatProvider: config?.chatProvider,
                toggle: toggleWidget,
                open: openWidget,
                close: closeWidget,
                colorScheme: config?.chatWindow?.defaults?.colorScheme ?? "light",
                toggleColorScheme: toggleColorScheme,
                getColorScheme: getColorScheme,
            };
            initIframeEventLogger();
        }
        iframe.src = IFRAME_SRC;
        iframe.style.display = "block";
        iframe.style.position = "fixed";
        iframe.style.bottom = "24px";
        iframe.style.right = "24px";
        if (!config?.chatWindow?.expanded) {
            iframe.style.width = defaultNormalSize.width;
            iframe.style.height = defaultNormalSize.height;
        }
        else {
            iframe.style.width = defaultExpandedSize.width;
            iframe.style.height = defaultExpandedSize.height;
        }
        iframe.style.maxWidth = "calc(100vw - 48px)";
        iframe.style.maxHeight = "calc(100vh - 48px)";
        iframe.style.border = "none";
        iframe.style.borderRadius = "16px";
        iframe.style.boxShadow = "rgb(0 0 0 / 16%) 0px 0px 16px";
        iframe.style.zIndex = "9999";
        iframe.style.transitionDuration = "300ms";
        iframe.allow = "clipboard-write";
    }
    catch (error) {
        logger.error("Error injecting widget:", error);
    }
}
