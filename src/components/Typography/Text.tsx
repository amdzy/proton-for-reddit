import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores";
import React, { ReactNode } from "react";
import { Text as ReactText, TextProps } from "react-native";

interface Props extends TextProps {
  children: ReactNode;
}

export const Text = ({ children, ...props }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <ReactText
      style={[
        {
          color: theme.text,
          fontSize: fonts.fontSize.content,
        },
        props.style,
      ]}
    >
      {children}
    </ReactText>
  );
};
