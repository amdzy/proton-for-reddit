/* eslint-disable no-bitwise */
const hexCharacters = 'a-f\\d';
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');

export function hexToRgb(hex: string) {
  if (typeof hex !== 'string' || nonHexChars.test(hex)) {
    throw new TypeError('Expected a valid hex string');
  }
  const newHex = hex.replace(/^#/, '');

  if (newHex.length !== 3 && newHex.length !== 6) {
    throw new TypeError('Expected a valid hex string');
  }
  const number = Number.parseInt(newHex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return { red, green, blue };
}
