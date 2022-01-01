import { hexToRgb } from "../hexToRgb";

describe("hex to rgb", () => {
  it("rejects with invalid hex", () => {
    expect(() => hexToRgb("#64ffdaa")).toThrowError(TypeError);
    expect(() => hexToRgb("#123456789")).toThrowError(TypeError);
    expect(() => hexToRgb("12389")).toThrowError("Expected a valid hex string");
  });

  it("pass with valid hex", () => {
    expect(hexToRgb("#64ffda")).toEqual({ red: 100, green: 255, blue: 218 });
    expect(hexToRgb("#020c1b")).toEqual({ red: 2, green: 12, blue: 27 });
  });
});
