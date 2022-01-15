import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Store {
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  issuedAt: number | null;
  isAuthenticated: boolean;
  setToken: (token: any) => void;
  clearToken: () => void;
  setTokenRefresh: (token: any) => void;
  setTokenAnon: (token: any) => void;
}

export const useAuthStore = create<Store>(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      expiresIn: null,
      issuedAt: null,
      isAuthenticated: false,

      setToken: (token) =>
        set(() => ({
          token: token.accessToken,
          refreshToken: token.refreshToken,
          expiresIn: token.expiresIn,
          issuedAt: Math.floor(Date.now() / 1000),
          isAuthenticated: true,
        })),

      clearToken: () =>
        set(() => ({
          token: null,
          refreshToken: null,
          expiresIn: null,
          issuedAt: null,
          isAuthenticated: false,
        })),

      setTokenRefresh: (token) =>
        set(() => ({
          token: token.accessToken,
          expiresIn: token.expiresIn,
          issuedAt: Math.floor(Date.now() / 1000),
        })),

      setTokenAnon: (token) =>
        set(() => ({
          token: token.access_token,
          expiresIn: token.expires_in,
          issuedAt: Math.floor(Date.now() / 1000),
        })),
    }),
    {
      name: 'authStore',
      getStorage: () => AsyncStorage,
    }
  )
);
