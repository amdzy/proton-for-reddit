import create from "zustand";
import produce from "immer";
import { ColorsDTO, ThemeName } from "./types";

interface StoreProps {
  theme: ThemeName;
  colors: {
    dark: ColorsDTO;
    light: ColorsDTO;
  };
  fonts: {
    fontSize: {
      header: number;
      content: number;
    };
    fontFamily: {
      header: string;
      content: string;
    };
  };

  setTheme: (themeName: ThemeName) => void;
  changeColor: (type: keyof ColorsDTO, value: string) => void;
  changeFontSize: (type: string, value: number) => void;
  changeFontFamily: (type: string, value: string) => void;
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
  fonts: {
    fontSize: {
      header: 18,
      content: 15,
    },
    fontFamily: {
      header: "roboto",
      content: "roboto",
    },
  },
  setTheme: (themeName) => set(() => ({ theme: themeName })),
  changeColor: (type, value) =>
    set(
      produce((state) => {
        const theme = get().theme;
        state.colors[theme][type] = value;
      })
    ),
  changeFontSize: (type, value) =>
    set(
      produce((state) => {
        state.fonts.fontSize[type] = value;
      })
    ),
  changeFontFamily: (type, value) =>
    set(
      produce((state) => {
        state.fonts.fontFamily[type] = value;
      })
    ),
}));
