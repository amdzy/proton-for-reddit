import React from "react";
import { View } from "react-native";

interface Props {
  horizontal?: boolean;
  size: number;
}

export const Spacer = ({ horizontal = false, size }: Props) => {
  const defaultValue = "auto";

  return (
    <View
      style={{
        width: horizontal ? size : defaultValue,
        height: !horizontal ? size : defaultValue,
      }}
    />
  );
};
