import create from "zustand";
import produce from "immer";
import { ColorsDTO, ThemeName } from "./types";

interface StoreProps {
  theme: ThemeName;
  colors: {
    dark: ColorsDTO;
    light: ColorsDTO;
  };
  setTheme: (themeName: ThemeName) => void;
  changeColor: (type: keyof ColorsDTO, value: string) => void;
}

export const useThemeStore = create<StoreProps>((set, get) => ({
  colors: {
    dark: {
      primary: "#64ffda",
      accent: "rgba(100, 255, 218, 0.1)",
      highlight: "#64ffda",
      background: "#020c1b",
      surface: "#0a192f",
      toolbar: "#112240",
      backdrop: "#233554",
      text: "#e6f1ff",
      placeholder: "#a8b2d1",
      statusBar: "light",
    },
    light: {
      primary: "#64ffda",
      accent: "rgba(100, 255, 218, 0.1)",
      highlight: "#64ffda",
      background: "#ffffff",
      surface: "#e6f1ff",
      toolbar: "#e6f1ff",
      backdrop: "#e6f1ff",
      text: "#020c1b",
      placeholder: "#a8b2d1",
      statusBar: "dark",
    },
  },
  theme: "dark",
  setTheme: (themeName) => set(() => ({ theme: themeName })),
  changeColor: (type, value) =>
    set(
      produce((state) => {
        const theme = get().theme;
        state.colors[theme][type] = value;
      })
    ),
}));
