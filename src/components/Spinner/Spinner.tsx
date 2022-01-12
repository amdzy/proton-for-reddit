import { useTheme } from "@/hooks";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface Props {
  animating: boolean;
  size?: "large" | "small";
}

export const Spinner = ({ animating, size = "large" }: Props) => {
  const theme = useTheme();
  return (
    <View style={styles.absoluteBox}>
      <ActivityIndicator
        animating={animating}
        color={theme.primary}
        size={size}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteBox: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
