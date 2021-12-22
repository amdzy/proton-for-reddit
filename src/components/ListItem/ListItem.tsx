import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text, View } from "react-native";
import { Spacer } from "../Spacer/Spacer";
import { useThemeStore } from "@/stores/themeStore";

interface Props extends PressableProps {
  text: string;
  subText?: string;
  icon?: any;
  right?: any;
}

export const ListItem = ({ text, subText, icon, right, ...props }: Props) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between",
      }}
      android_ripple={{ color: theme.placeholder }}
      {...props}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.placeholder}
          />
        )}
        <Spacer size={icon ? 35 : 58} horizontal />
        <View>
          <Text style={{ color: theme.text, fontSize: 15 }}>{text}</Text>
          {subText && (
            <Text style={{ color: theme.placeholder, fontSize: 15 }}>
              {subText}
            </Text>
          )}
        </View>
      </View>
      {right && right}
    </Pressable>
  );
};
