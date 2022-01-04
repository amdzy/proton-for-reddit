import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { View, ViewStyle } from "react-native";

interface Props {
  size?: number;
  vertical?: boolean;
  style?: ViewStyle;
}

export const Divider = ({ size = 1, vertical = false, style }: Props) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <View
      style={{
        width: vertical ? size : "100%",
        height: !vertical ? size : "100%",
        backgroundColor: theme.backdrop,
        ...style,
      }}
      testID="divider"
    />
  );
};
