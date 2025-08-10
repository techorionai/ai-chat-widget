import { RequestConfig, SharedSecretKeyConfig } from "../types.js";
declare const request: <T extends any>(config: RequestConfig, options?: {
    sharedSecretKeyConfig?: SharedSecretKeyConfig;
}) => Promise<T | null>;
export default request;
