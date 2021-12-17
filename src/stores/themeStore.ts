import create from "zustand";
import { ColorProps } from "./types";
import { useColorStore } from "./colorStore";

interface StoreProps {
  colors: ColorProps;
}

const theme = useColorStore.getState().theme;
const mainColors = useColorStore.getState().colors;
const defaultColors = mainColors[theme];

export const useThemeStore = create<StoreProps>((set, get) => ({
  colors: {
    primary: defaultColors.primary,
    accent: defaultColors.accent,
    highlight: defaultColors.highlight,
    background: defaultColors.background,
    surface: defaultColors.surface,
    toolbar: defaultColors.toolbar,
    backdrop: defaultColors.backdrop,
    text: defaultColors.text,
    placeholder: defaultColors.placeholder,
  },
}));
