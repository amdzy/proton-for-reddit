import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";
import { Spacer } from "../Spacer/Spacer";
import { useThemeStore } from "@/stores/themeStore";

interface Props extends PressableProps {
  text: string;
  icon?: any;
}

export const ListItem = ({ text, icon, ...props }: Props) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
      }}
      android_ripple={{ color: theme.placeholder }}
      {...props}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={24} color={theme.text} />
      )}
      {icon && <Spacer size={35} horizontal />}
      <Text style={{ color: theme.text, fontSize: 16 }}>{text}</Text>
    </Pressable>
  );
};
