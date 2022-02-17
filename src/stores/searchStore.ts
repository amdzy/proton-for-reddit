import create from 'zustand';

interface StoreState {
  search: string;
  searchHistory: Array<string>;
  setSearch: (val: string) => void;
  setSearchHistory: (val: string) => void;
  deleteSearch: (val: string) => void;
}

export const useSearchStore = create<StoreState>((set) => ({
  search: '',
  searchHistory: ['history', 'cats'],
  setSearch: (val) => set(() => ({ search: val })),
  setSearchHistory: (val) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((x) => x !== val).concat(val),
    })),
  deleteSearch: (val) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((x) => x !== val),
    })),
}));
