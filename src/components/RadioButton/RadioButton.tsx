import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks";

interface Props {
  checked?: boolean;
  passThrough?: boolean;
  onValueChange?: () => void;
}

export const RadioButton = ({
  checked,
  passThrough = false,
  onValueChange,
}: Props) => {
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
      pointerEvents={passThrough ? "none" : "auto"}
      testID="radiobutton"
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
