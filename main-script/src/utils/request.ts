import { RequestConfig, SharedSecretKeyConfig } from "../types.js";
import generateSignature from "./generateSignature.js";
import logger from "./logger.js";

const request = async <T extends any>(
  config: RequestConfig,
  options?: { sharedSecretKeyConfig?: SharedSecretKeyConfig }
) => {
  try {
    let url = config.url;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    const body: Record<string, string> = {
      ...config.body,
    };

    if (
      options?.sharedSecretKeyConfig &&
      options?.sharedSecretKeyConfig.sharedSecretKey &&
      options?.sharedSecretKeyConfig.placement &&
      options?.sharedSecretKeyConfig.key &&
      config.signaturePayload
    ) {
      const signature = await generateSignature(config.signaturePayload);

      if (!signature) {
        throw new Error("Failed to generate signature");
      }

      if (options?.sharedSecretKeyConfig.placement === "query") {
        url += `?${options?.sharedSecretKeyConfig.key}=${signature}`;
      } else if (options?.sharedSecretKeyConfig.placement === "header") {
        headers[options?.sharedSecretKeyConfig.key] = signature;
      } else {
        throw new Error(
          `Invalid placement for shared secret key. Placement must be 'query', 'header', or 'body'. Found: ${options?.sharedSecretKeyConfig.placement}`
        );
      }
    }

    const res = await fetch(url, {
      method: config.method,
      headers,
      body: ["OPTIONS", "HEAD", "GET", "DELETE"].includes(config.method)
        ? undefined
        : JSON.stringify(body),
    });
    const data = await res.json();
    return {
      ...data,
    } as T;
  } catch (error) {
    logger.error(`Error in request: ${error}\nConfig: ${config}`);
    return null;
  }
};

export default request;
