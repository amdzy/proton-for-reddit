import { useThemeStore } from "@/stores/themeStore";

export const useTheme = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);

  return theme;
};
