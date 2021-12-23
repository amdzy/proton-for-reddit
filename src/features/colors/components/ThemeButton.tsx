import { useThemeStore } from "@/stores/themeStore";
import { ThemeName } from "@/stores/types";
import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {
  theme: ThemeName;
  active: boolean;
}

export const ThemeButton = ({ theme, active, ...props }: Props) => {
  const setTheme = useThemeStore((state) => state.setTheme);
  const colors = useThemeStore((state) => state.colors[theme]);
  return (
    <Pressable
      style={{
        padding: 10,
        width: 80,
        borderColor: active ? colors.primary : colors.placeholder,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 12,
        backgroundColor: colors.background,
      }}
      onPress={() => setTheme(theme)}
      {...props}
    >
      <View
        style={{
          backgroundColor: colors.surface,
          width: "100%",
          height: 20,
          marginBottom: 6,
        }}
      />
      <View
        style={{
          backgroundColor: colors.surface,
          width: "100%",
          height: 20,
          marginBottom: 6,
        }}
      />
      <Text
        style={{
          color: colors.text,
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {theme}
      </Text>
    </Pressable>
  );
};
