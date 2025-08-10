/**
 * Convert a number to a fixed-length Base36 string.
 * @param num The number to convert.
 * @param length The target string length (pads with '0').
 * @returns Base36-encoded string.
 */
function base36(num, length) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let s = "";
    while (num > 0) {
        s = chars[num % 36] + s;
        num = Math.floor(num / 36);
    }
    return s.padStart(length, "0");
}
export default base36;
