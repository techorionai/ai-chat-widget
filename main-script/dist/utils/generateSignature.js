import arrayBufferToHex from "./arrayBufferToHex.js";
import logger from "./logger.js";
const generateSignature = async (payload, options) => {
    if (!options?.sharedSecretKeyConfig) {
        logger.error("sharedSecretKeyConfig is not set. Please set sharedSecretKeyConfig while initializing NavigableAI.");
        return null;
    }
    try {
        const encoder = new TextEncoder();
        const keyBuffer = encoder.encode(options?.sharedSecretKeyConfig.sharedSecretKey);
        const payloadBuffer = encoder.encode(payload);
        const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
        const signature = await crypto.subtle.sign("HMAC", key, payloadBuffer);
        return await arrayBufferToHex(signature);
    }
    catch (error) {
        logger.error("Error generating signature:", error);
        return null;
    }
};
export default generateSignature;
