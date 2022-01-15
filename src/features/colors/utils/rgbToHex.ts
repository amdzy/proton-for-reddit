/* eslint-disable no-bitwise */
function notValidRgbNum(num: number) {
  return num > 255 || num < 0;
}

export function rgbToHex(red: number, green: number, blue: number) {
  if (
    typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    notValidRgbNum(red) ||
    notValidRgbNum(green) ||
    notValidRgbNum(blue)
  ) {
    return '000000';
  }
  return (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1);
}
