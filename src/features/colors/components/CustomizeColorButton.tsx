import { Spacer } from "@/components";
import { useTheme } from "@/hooks";
import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {
  text: string;
  color: string;
}

export const CustomizeColorButton = ({ text, color, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      style={{
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
      android_ripple={{ color: theme.placeholder }}
      {...props}
    >
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: color,
          borderRadius: 12,
        }}
      />
      <Spacer size={24} horizontal />
      <Text
        style={{ color: theme.text, fontSize: 16, textTransform: "capitalize" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
