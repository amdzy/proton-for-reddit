import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  icon: string;
  name: string;
  karma: number;
  id: string;
  createdAt: number;
  modhash: string;
}

interface Store {
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  issuedAt: number | null;
  isAuthenticated: boolean;
  userName: null | string;
  userIcon: null | string;
  karma: null | number;
  id: null | string;
  createdAt: null | number;
  modhash: null | string;
  setToken: (token: any) => void;
  logout: () => void;
  setTokenRefresh: (token: any) => void;
  setTokenAnon: (token: any) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<Store>(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      expiresIn: null,
      issuedAt: null,
      isAuthenticated: false,
      userName: null,
      userIcon: null,
      karma: null,
      id: null,
      createdAt: null,
      modhash: null,

      setToken: (token) =>
        set(() => ({
          token: token.accessToken,
          refreshToken: token.refreshToken,
          expiresIn: token.expiresIn,
          issuedAt: Math.floor(Date.now() / 1000),
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          token: null,
          refreshToken: null,
          expiresIn: null,
          issuedAt: null,
          isAuthenticated: false,
          userIcon: null,
          userName: null,
          karma: null,
          id: null,
          createdAt: null,
          modhash: null,
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

      setUser: (user) =>
        set(() => ({
          userIcon: user.icon,
          userName: user.name,
          karma: user.karma,
          id: user.id,
          createdAt: user.createdAt,
          modhash: user.modhash,
        })),
    }),
    {
      name: 'authStore',
      getStorage: () => AsyncStorage,
    }
  )
);
