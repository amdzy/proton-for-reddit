import { isTokenFresh } from "../isTokenFresh";

describe("IsTokenFresh", () => {
  it("return true if the token is still fresh", () => {
    const issuedAt = Math.floor(Date.now() / 1000) - 500;
    const isFresh = isTokenFresh(3600, issuedAt);
    expect(isFresh).toBe(true);
  });

  it("return false if token is expired", () => {
    const issuedAt = Math.floor(Date.now() / 1000) - 4000;
    const isFresh = isTokenFresh(3600, issuedAt);
    expect(isFresh).toBe(false);
  });
});
