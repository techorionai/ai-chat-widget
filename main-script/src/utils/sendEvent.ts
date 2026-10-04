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

    const targetOrigin = window.$aiChatWidget?.iframeOrigin || IFRAME_ORIGIN;
    window.$aiChatWidget.Iframe?.contentWindow?.postMessage(
      payload,
      targetOrigin
    );

    logger.log("Sent event to iframe:", payload);
  } catch (error) {
    logger.error("Error sending event:", error);
  }
};

export default sendEventToIframe;
