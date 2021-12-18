import create from "zustand";
import { ColorsDTO, ThemeName } from "./types";

interface StoreProps {
  theme: ThemeName;
  colors: {
    dark: ColorsDTO;
  };
  statusBar: "light" | "dark";
  setTheme: (themeName: ThemeName) => void;
}

export const useThemeStore = create<StoreProps>((set, get) => ({
  colors: {
    dark: {
      primary: "#64ffda",
      accent: "rgba(100, 255, 218, 0.1)",
      highlight: "#57cbff",
      background: "#020c1b",
      surface: "#0a192f",
      toolbar: "#112240",
      backdrop: "#233554",
      text: "#e6f1ff",
      placeholder: "#a8b2d1",
    },
  },
  theme: "dark",
  statusBar: "light",
  setTheme: (themeName) => set(() => ({ theme: themeName })),
}));
