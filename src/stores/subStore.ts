import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sub {
  icon: string;
  name: string;
  id: string;
}

interface StoreState {
  subs: Array<Sub>;
  setSubs: (subs: Array<Sub>) => void;
  addSub: (sub: Sub) => void;
  removeSub: (name: string) => void;
  clearSubs: () => void;
}

export const useSubStore = create<StoreState>(
  persist(
    (set, get) => ({
      subs: [],
      setSubs: (subs) => set(() => ({ subs })),
      addSub: (sub) =>
        set((state) => ({
          subs: state.subs.concat(sub),
        })),
      removeSub: (name) =>
        set((state) => ({ subs: state.subs.filter((x) => x.name !== name) })),
      clearSubs: () => set(() => ({ subs: [] })),
    }),
    {
      name: 'subStore',
      getStorage: () => AsyncStorage,
    }
  )
);
