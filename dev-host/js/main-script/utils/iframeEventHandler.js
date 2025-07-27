import { IFRAME_SRC } from "../consts.js";
import initEventHandler from "../eventHandlers/init.js";
import logger from "./logger.js";
const iframeEventHandler = (event) => {
    if (event.origin !== IFRAME_SRC)
        return;
    if (!event.data || !event.data.type || event.data.type === "LOG")
        return;
    const eventType = event.data?.type;
    switch (eventType) {
        case "init":
            initEventHandler(event.data);
            break;
        default:
            logger.warn(`Unhandled event type: ${eventType}`, event.data);
            break;
    }
};
export default iframeEventHandler;
