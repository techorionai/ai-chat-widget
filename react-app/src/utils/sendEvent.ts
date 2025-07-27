import { sendIframeEventFn } from "../types/mainProcess.js";
import logToIframe from "./logger.js";

const sendEventToMain: sendIframeEventFn = (type, data) => {
  try {
    if (window?.parent && "postMessage" in window.parent) {
      window.parent.postMessage(
        {
          type,
          data,
        },
        "*"
      );
    }
  } catch (error) {
    logToIframe("Error sending event to main:", error);
  }
};

export default sendEventToMain;
