import React from "react";
import { Text } from "react-native";

interface Props {
  tag: string;
  bgColor: string;
  color: string;
}

export const Flair = ({ tag, bgColor, color }: Props) => {
  if (!tag) {
    return null;
  }

  return (
    <Text
      style={{
        color: color === "dark" ? "#000000" : "#FFFFFF",
        backgroundColor: bgColor
          ? bgColor
          : color === "dark"
          ? "#FFFFFF"
          : "#000000",
        padding: 1,
        fontSize: 12,
        paddingHorizontal: 4,
        borderRadius: 3,
        marginRight: 8,
      }}
    >
      {tag}
    </Text>
  );
};
