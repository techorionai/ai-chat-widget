import { SharedSecretKeyConfig } from "../types.js";
declare const generateSignature: (payload: string, options?: {
    sharedSecretKeyConfig?: SharedSecretKeyConfig;
}) => Promise<string | null>;
export default generateSignature;
