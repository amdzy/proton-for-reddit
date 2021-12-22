import { useTheme } from "@/hooks";
import React from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  text: string;
  style?: TextStyle;
}

export const SettingsHeader = ({ text, style }: Props) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.primary,
        fontSize: 16,
        padding: 12,
        ...style,
      }}
    >
      {text}
    </Text>
  );
};
