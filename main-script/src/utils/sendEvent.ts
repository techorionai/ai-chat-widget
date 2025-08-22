import { IFRAME_ORIGIN } from "../consts.js";
import { sendMainEventFn } from "../types.js";
import logger from "./logger.js";

const sendEventToIframe: sendMainEventFn = (type, data) => {
  try {
    window.$aiChatWidget.Iframe?.contentWindow?.postMessage(
      {
        type,
        data,
      },
      IFRAME_ORIGIN
    );
  } catch (error) {
    logger.error("Error sending event:", error);
  }
};

export default sendEventToIframe;
