import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/themeStore";
import { Link } from "@react-navigation/native";
import { View } from "react-native";

export const CardFooter = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const color = useThemeStore((state) => state.colors[chosenTheme].placeholder);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 12,
        flexWrap: "nowrap",
      }}
    >
      <MaterialCommunityIcons name="arrow-up-thick" size={24} color={color} />
      <MaterialCommunityIcons name="arrow-down-thick" size={24} color={color} />
      <Link to={{ screen: "Comments" }}>
        <MaterialCommunityIcons
          name="comment-outline"
          size={24}
          color={color}
        />
      </Link>
      <MaterialCommunityIcons name="star" size={24} color={color} />
      <MaterialCommunityIcons name="dots-vertical" size={24} color={color} />
    </View>
  );
};
