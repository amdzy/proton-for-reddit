import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreState {
  search: string;
  searchHistory: Array<string>;
  setSearch: (val: string) => void;
  setSearchHistory: (val: string) => void;
  deleteSearch: (val: string) => void;
}

export const useSearchStore = create<StoreState>(
  persist(
    (set) => ({
      search: '',
      searchHistory: ['cats'],
      setSearch: (val) => set(() => ({ search: val })),
      setSearchHistory: (val) =>
        set((state) => ({
          searchHistory: state.searchHistory
            .filter((x) => x !== val)
            .concat(val),
        })),
      deleteSearch: (val) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((x) => x !== val),
        })),
    }),
    {
      name: 'searchStore',
      getStorage: () => AsyncStorage,
    }
  )
);
