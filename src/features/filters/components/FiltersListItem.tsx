import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks";
import { IconButton } from "@/components";

interface Props {
  text: string;
  onPress: () => void;
}

export const FilterListItem = ({ text, onPress }: Props) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.text, fontSize: 16 }}>{text}</Text>
      <IconButton icon="delete" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },
});
