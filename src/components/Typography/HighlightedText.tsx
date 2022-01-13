import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores";
import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  children: ReactNode;
  fontSize?: number;
  style?: TextStyle;
}

export const HighlightedText = ({ children, fontSize = 14, style }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.highlight,
          fontSize: fontSize,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
