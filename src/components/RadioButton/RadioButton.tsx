import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks";

interface Props {
  checked?: boolean;
  onValueChange?: () => void;
}

export const RadioButton = ({ checked, onValueChange }: Props) => {
  const theme = useTheme();
  return (
    <Pressable
      style={[
        styles.checkboxBase,
        {
          borderColor: checked ? theme.primary : theme.placeholder,
          backgroundColor: checked ? theme.primary : "transparent",
        },
      ]}
      onPress={onValueChange}
    ></Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
});
