export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return { red, green, blue };
}
