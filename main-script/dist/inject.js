import { IFRAME_ID, IFRAME_SRC, WIDGET_BUTTON } from "./consts.js";
import { defaultExpandedSize, defaultNormalSize, } from "./eventHandlers/toggleExpand.js";
import { getEnabledActionsMap } from "./utils/getEnabledActions.js";
import { initIframeEventLogger } from "./utils/iframeEventLogger.js";
import logger from "./utils/logger.js";
import sendEventToIframe from "./utils/sendEvent.js";
import { getColorScheme, toggleColorScheme, } from "./utils/toggleColorScheme.js";
import { closeWidget, openWidget, toggleWidget } from "./utils/toggleWidget.js";
export function injectAiChatWidget(config) {
    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("injectAiChatWidget can only be used in a browser environment.");
    }
    try {
        if (!config) {
            throw new Error("Config is required to initialize the chat widget");
        }
        config.actionsMap = getEnabledActionsMap(config.actionsMap);
        if (config.chatWindow?.welcomeMessage?.actions) {
            const sanitizedWelcomeActions = config.chatWindow?.welcomeMessage?.actions?.filter((action) => config.actionsMap &&
                Object.prototype.hasOwnProperty.call(config.actionsMap, action)) ?? [];
            config.chatWindow.welcomeMessage.actions = sanitizedWelcomeActions;
        }
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
        iframe.style.display = "none";
        iframe.style.position = "fixed";
        iframe.style.bottom = "1.5rem";
        iframe.style.right = "1.5rem";
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
        const button = document.createElement("div");
        button.innerHTML = config?.widgetButton || WIDGET_BUTTON;
        button.addEventListener("click", () => {
            toggleWidget();
        });
        document.body.appendChild(button);
    }
    catch (error) {
        logger.error("Error injecting widget:", error);
    }
}
