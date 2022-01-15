import { rgbToHex } from '../rgbToHex';

describe('rgb to hex', () => {
  it('rejects with invalid rgb', () => {
    expect(rgbToHex(200, 100, 300)).toEqual('000000');
    expect(rgbToHex(300, 100, 200)).toEqual('000000');
    expect(rgbToHex(-50, 100, 200)).toEqual('000000');
  });
  it('pass with a valid rgb', () => {
    expect(rgbToHex(100, 255, 218)).toEqual('64ffda');
    expect(rgbToHex(2, 12, 27)).toEqual('020c1b');
  });
});
