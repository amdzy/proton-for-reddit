import create from "zustand";

interface Store {
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  setToken: (token: any) => void;
  clearToken: () => void;
  setTokenRefresh: (token: any) => void;
  setTokenAnon: (token: any) => void;
}

export const useAuthStore = create<Store>((set) => ({
  token: null,
  refreshToken: null,
  expiresIn: null,
  isAuthenticated: false,

  setToken: (token) =>
    set((state) => ({
      token: token.accessToken,
      refreshToken: token.refreshToken,
      expiresIn: token.expiresIn,
      isAuthenticated: true,
    })),

  clearToken: () =>
    set(() => ({
      token: null,
      refreshToken: null,
      expiresIn: null,
      isAuthenticated: false,
    })),

  setTokenRefresh: (token) =>
    set(() => ({
      token: token.accessToken,
      expiresIn: token.expiresIn,
    })),

  setTokenAnon: (token) =>
    set(() => ({
      token: token.access_token,
      expiresIn: token.expires_in,
    })),
}));
