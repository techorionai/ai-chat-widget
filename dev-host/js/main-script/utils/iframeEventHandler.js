import { IFRAME_ORIGIN } from "../consts.js";
import chatProviderCreateSessionHandler from "../eventHandlers/chatProvider/createSession.js";
import chatProviderListSessionMessagesEventHandler from "../eventHandlers/chatProvider/listSessionMessages.js";
import chatProviderListSessionsEventHandler from "../eventHandlers/chatProvider/listSessions.js";
import chatProviderSendMessageEventHandler from "../eventHandlers/chatProvider/sendMessage.js";
import closeWidgetHandler from "../eventHandlers/closeWidget.js";
import initEventHandler from "../eventHandlers/init.js";
import runActionEventHandler from "../eventHandlers/runAction.js";
import runHomeCardAction from "../eventHandlers/runHomeCardAction.js";
import toggleExpandEventHandler from "../eventHandlers/toggleExpand.js";
import logger from "./logger.js";
const iframeEventHandler = (event) => {
    if (event.origin !== IFRAME_ORIGIN)
        return;
    if (!event.data || !event.data.type || event.data.type === "LOG")
        return;
    const eventType = event.data?.type;
    switch (eventType) {
        case "init":
            initEventHandler(event.data.data);
            break;
        case "toggleExpand":
            toggleExpandEventHandler(event.data.data);
            break;
        case "chatProviderListSessions":
            chatProviderListSessionsEventHandler(event.data.data);
            break;
        case "chatProviderListSessionMessages":
            chatProviderListSessionMessagesEventHandler(event.data.data);
            break;
        case "chatProviderSendMessage":
            chatProviderSendMessageEventHandler(event.data.data);
            break;
        case "runAction":
            runActionEventHandler(event.data.data);
            break;
        case "closeWidget":
            closeWidgetHandler();
            break;
        case "chatProviderCreateSession":
            chatProviderCreateSessionHandler();
            break;
        case "runHomeCardAction":
            runHomeCardAction(event.data.data);
            break;
        default:
            logger.warn(`Unhandled event type: ${eventType}`, event.data.data);
            break;
    }
};
export default iframeEventHandler;
