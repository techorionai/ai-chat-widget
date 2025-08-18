import { IFRAME_SRC } from "../consts.js";
import chatProviderListSessionMessagesEventHandler from "../eventHandlers/chatProvider/listSessionMessages.js";
import chatProviderListSessionsEventHandler from "../eventHandlers/chatProvider/listSessions.js";
import chatProviderSendMessageEventHandler from "../eventHandlers/chatProvider/sendMessage.js";
import initEventHandler from "../eventHandlers/init.js";
import runActionEventHandler from "../eventHandlers/runAction.js";
import toggleExpandEventHandler from "../eventHandlers/toggleExpand.js";
import { EventTypeIframe } from "../types.js";
import logger from "./logger.js";

const iframeEventHandler = (event: MessageEvent<any>) => {
  if (event.origin !== IFRAME_SRC) return;
  if (!event.data || !event.data.type || event.data.type === "LOG") return;

  const eventType = event.data?.type;

  switch (eventType as EventTypeIframe) {
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
    default:
      logger.warn(`Unhandled event type: ${eventType}`, event.data.data);
      break;
  }
};

export default iframeEventHandler;
