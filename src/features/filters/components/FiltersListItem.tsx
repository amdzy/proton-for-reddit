import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "@/components";

interface Props {
  text: string;
  onPress: () => void;
}

export const FilterListItem = ({ text, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <IconButton icon="delete" onPress={onPress} testID="FilterListItemIcon" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  text: { fontSize: 16 },
});
