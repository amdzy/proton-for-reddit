import create from "zustand";

interface StoreState {
  icons: Map<string, string>;
  addIcon: (sub: string, icon: string) => void;
}

export const useSubIconStore = create<StoreState>((set) => ({
  icons: new Map(),
  addIcon: (sub, icon) =>
    set((state) => ({
      icons: state.icons.set(sub, icon),
    })),
}));
