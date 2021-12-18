import React from "react";
import { Text } from "react-native";

interface Props {
  tag: string;
}

export const Flair = ({ tag }: Props) => {
  return (
    <Text
      style={{
        color: "white",
        backgroundColor: "black",
        padding: 1,
        fontSize: 12,
      }}
    >
      {tag}
    </Text>
  );
};
