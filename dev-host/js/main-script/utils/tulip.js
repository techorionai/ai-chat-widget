import base36 from "./base36.js";
/**
 * Generate a TULIP (Time-based Unique Lexicographically Indexed Pointer) ID.
 * Automatically assigns a random machineId per runtime/session.
 */
export function generateTULIP() {
    if (cachedMachineId === null) {
        cachedMachineId = getAutoMachineId();
    }
    const now = new Date();
    const timestamp = now.getUTCFullYear().toString().padStart(4, "0") +
        String(now.getUTCMonth() + 1).padStart(2, "0") +
        String(now.getUTCDate()).padStart(2, "0") +
        "-" +
        String(now.getUTCHours()).padStart(2, "0") +
        String(now.getUTCMinutes()).padStart(2, "0") +
        String(now.getUTCSeconds()).padStart(2, "0");
    const mid = base36(cachedMachineId, 3);
    const rnd = base36(Math.floor(Math.random() * 46656), 3);
    return `${timestamp}-${mid}-${rnd}`;
}
/**
 * Generates a "machineId" automatically for this runtime.
 * Uses a random number, so two machines are unlikely to collide.
 */
function getAutoMachineId() {
    // 0–46655 range fits in 3 Base36 chars
    return Math.floor(Math.random() * 46656);
}
let cachedMachineId = null;
export default generateTULIP;
