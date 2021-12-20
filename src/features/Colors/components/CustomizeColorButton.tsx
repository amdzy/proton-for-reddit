import { Spacer } from "@/components";
import { useThemeStore } from "@/stores/themeStore";
import { ColorsDTO } from "@/stores/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  text: string;
  type: keyof ColorsDTO;
}

export const CustomizeColorButton = ({ text, type }: Props) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);

  return (
    <Pressable
      style={{
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
      android_ripple={{ color: theme.placeholder }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: theme[type],
          borderRadius: 12,
        }}
      />
      <Spacer size={24} horizontal />
      <Text style={{ color: theme.text, fontSize: 16 }}>{text}</Text>
    </Pressable>
  );
};
