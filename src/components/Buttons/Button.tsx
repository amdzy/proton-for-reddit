import { useTheme } from "@/hooks";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface Props extends PressableProps {
  text: string;
}

export const Button = ({ text, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      style={{ padding: 10 }}
      {...props}
      android_ripple={{ color: theme.placeholder }}
    >
      <Text style={{ color: theme.primary }}>{text}</Text>
    </Pressable>
  );
};
