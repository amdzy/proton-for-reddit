import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sub {
  icon: string;
  name: string;
  id: string;
}

interface StoreState {
  icons: Map<string, string>;
  subs: Record<string, { id: string; icon: string; name: string }>;
  addIcon: (sub: string, icon: string) => void;
  setSubs: (subs: Array<Sub>) => void;
  setSub: (sub: Sub) => void;
}

export const useSubStore = create<StoreState>(
  persist(
    (set) => ({
      icons: new Map(),
      subs: {},
      addIcon: (sub, icon) =>
        set((state) => ({
          icons: state.icons.set(sub, icon),
        })),
      setSubs: (subs) =>
        set(() => {
          const subsObj: any = {};
          subs.forEach((sub) => {
            subsObj[sub.name] = sub;
          });
          return { subs: subsObj };
        }),
      setSub: (sub) =>
        set((state) => ({
          subs: { ...state.subs, [sub.name]: sub },
        })),
    }),
    {
      name: 'subStore',
      getStorage: () => AsyncStorage,
    }
  )
);
