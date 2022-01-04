import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

interface Props {
  icon: any;
  color: string;
  size: number;
  style?: ViewStyle;
}

export const TabBarIcon = ({ icon, color, size, style }: Props) => {
  return (
    <MaterialCommunityIcons
      name={icon}
      size={size}
      color={color}
      style={{ ...style }}
      testID="icon"
    />
  );
};
