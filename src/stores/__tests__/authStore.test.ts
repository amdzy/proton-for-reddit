import { useAuthStore } from "..";

describe("Auth store", () => {
  it("Add token", () => {
    const setToken = useAuthStore.getState().setToken;

    const newToken = {
      accessToken: "accesstoken",
      refreshToken: "refreshtoken",
      expiresIn: 3600,
    };
    setToken(newToken);

    const token = getItems();

    expect(token).toMatchObject({
      ...newToken,
      isAuthenticated: true,
    });
  });

  it("Clear token", () => {
    const clearToken = useAuthStore.getState().clearToken;

    clearToken();

    const token = getItems();
    expect(token).toMatchObject({
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      issuedAt: null,
      isAuthenticated: false,
    });
  });

  it("Refresh token", () => {
    const refreshToken = useAuthStore.getState().setTokenRefresh;
    const newToken = {
      accessToken: "accesstoken",
      expiresIn: 3600,
    };
    refreshToken(newToken);

    const token = getItems();

    expect(token).toMatchObject(newToken);
  });

  it("set Token anon", () => {
    const setTokenAnon = useAuthStore.getState().setTokenAnon;

    const newToken = {
      access_token: "accesstoken",
      refresh_token: "refreshtoken",
      expires_in: 3600,
    };
    setTokenAnon(newToken);

    const token = getItems();

    expect(token).toMatchObject({
      accessToken: "accesstoken",
      refreshToken: null,
      expiresIn: 3600,
      isAuthenticated: false,
    });
  });
});

function getItems() {
  return {
    accessToken: useAuthStore.getState().token,
    refreshToken: useAuthStore.getState().refreshToken,
    expiresIn: useAuthStore.getState().expiresIn,
    issuedAt: useAuthStore.getState().issuedAt,
    isAuthenticated: useAuthStore.getState().isAuthenticated,
  };
}
