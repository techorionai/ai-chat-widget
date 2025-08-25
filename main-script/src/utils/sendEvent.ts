import { IFRAME_ORIGIN } from "../consts.js";
import { sendMainEventFn } from "../types.js";
import logger from "./logger.js";

const sendEventToIframe: sendMainEventFn = (type, data) => {
  try {
    const payload = JSON.parse(
      JSON.stringify({
        type,
        data,
      })
    );

    window.$aiChatWidget.Iframe?.contentWindow?.postMessage(
      payload,
      IFRAME_ORIGIN
    );
  } catch (error) {
    logger.error("Error sending event:", error);
  }
};

export default sendEventToIframe;
