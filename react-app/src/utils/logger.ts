import sendEventToMain from "./sendEvent";

const logToIframe = (...args: any[]) => {
  sendEventToMain("LOG", args);
};

export default logToIframe;
