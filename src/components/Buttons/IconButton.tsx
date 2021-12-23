import { useTheme } from "@/hooks";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props extends PressableProps {
  icon: any;
  color?: string;
}

export const IconButton = ({
  icon,
  color,
  style,
  onPress,
  ...props
}: Props) => {
  const theme = useTheme();
  return (
    <Pressable
      android_ripple={{ color: theme.placeholder, borderless: true }}
      onPress={onPress}
      style={style}
      {...props}
    >
      <MaterialCommunityIcons
        name={icon}
        color={color || theme.placeholder}
        size={24}
      />
    </Pressable>
  );
};
