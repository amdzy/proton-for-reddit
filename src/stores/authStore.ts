import create from "zustand";
import produce from "immer";

interface Store {
  token: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
  isAuthenticated: boolean;
  setToken: (token: any) => void;
  clearToken: () => void;
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
}));
