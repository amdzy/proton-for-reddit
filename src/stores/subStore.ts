import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sub {
  icon: string;
  name: string;
  id: string;
}

interface StoreState {
  subs: Record<string, { id: string; icon: string; name: string }>;
  setSubs: (subs: Array<Sub>) => void;
  setSub: (sub: Sub) => void;
  clearSubs: () => void;
}

export const useSubStore = create<StoreState>(
  persist(
    (set) => ({
      subs: {},
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
      clearSubs: () => set(() => ({ subs: {} })),
    }),
    {
      name: 'subStore',
      getStorage: () => AsyncStorage,
    }
  )
);
