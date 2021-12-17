import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorProps } from "./types";

interface StoreProps {
  theme: "dark";
  colors: {
    dark: ColorProps;
  };
  statusBar: "light" | "dark";
  setTheme: (themeName: "dark") => void;
}
export const useColorStore = create<StoreProps>(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "color-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
