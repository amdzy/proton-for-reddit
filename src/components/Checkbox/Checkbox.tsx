import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

interface Props {
  checked?: boolean;
  onValueChange?: () => void;
}

export const Checkbox = ({ checked, onValueChange }: Props) => {
  const theme = useTheme();
  return (
    <Pressable
      style={[
        styles.checkboxBase,
        {
          borderColor: checked ? theme.primary : theme.placeholder,
          backgroundColor: checked ? theme.accent : "transparent",
        },
      ]}
      onPress={onValueChange}
    >
      {checked && (
        <MaterialCommunityIcons name="check" size={16} color={theme.text} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
  },
});
