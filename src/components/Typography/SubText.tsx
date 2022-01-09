import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores";
import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  children: ReactNode;
  fontSize?: number;
}

export const SubText = ({ children, fontSize = 14, ...props }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.placeholder,
          fontSize: fontSize,
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};
