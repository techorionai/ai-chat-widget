/**
 * Convert a number to a fixed-length Base36 string.
 * @param num The number to convert.
 * @param length The target string length (pads with '0').
 * @returns Base36-encoded string.
 */
declare function base36(num: number, length: number): string;
export default base36;
