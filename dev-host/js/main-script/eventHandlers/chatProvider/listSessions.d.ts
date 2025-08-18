import { ChatProviderListSessionsOptions } from "../../types.js";
declare const chatProviderListSessionsEventHandler: (data?: ChatProviderListSessionsOptions & {
    newSession?: boolean;
}) => Promise<void>;
export default chatProviderListSessionsEventHandler;
