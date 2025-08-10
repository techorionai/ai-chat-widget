const arrayBufferToHex = async (buffer) => {
    return new Promise((resolve) => {
        const hex = Array.from(new Uint8Array(buffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
        resolve(hex);
    });
};
export default arrayBufferToHex;
