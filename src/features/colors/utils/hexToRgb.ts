const hexCharacters = "a-f\\d";
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, "gi");

export function hexToRgb(hex: string) {
  if (typeof hex !== "string" || nonHexChars.test(hex)) {
    throw new TypeError("Expected a valid hex string");
  }
  hex = hex.replace(/^#/, "");

  if (hex.length !== 3 && hex.length !== 6) {
    throw new TypeError("Expected a valid hex string");
  }
  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return { red, green, blue };
}
