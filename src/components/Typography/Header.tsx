import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores";
import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  children: ReactNode;
}

export const Header = ({ children, ...props }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.text,
          fontSize: fonts.fontSize.header,
          lineHeight: 22,
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};
