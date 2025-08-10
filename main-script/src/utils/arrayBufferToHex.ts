const arrayBufferToHex = async (buffer: ArrayBuffer): Promise<string> => {
  return new Promise((resolve) => {
    const hex = Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    resolve(hex);
  });
};

export default arrayBufferToHex;
