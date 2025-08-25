import { sendIframeEventFn } from "../types/mainProcess.js";
import logToIframe from "./logger.js";

const sendEventToMain: sendIframeEventFn = (type, data) => {
  try {
    if (window?.parent && "postMessage" in window.parent) {
      const payload = JSON.parse(
        JSON.stringify({
          type,
          data,
        })
      );

      window.parent.postMessage(payload, "*");
    }
  } catch (error) {
    logToIframe("Error sending event to main:", error);
  }
};

export default sendEventToMain;
