import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  tag: string;
  bgColor?: string;
  color: string;
}

export const Flair = ({ tag, bgColor, color }: Props) => {
  const styles = useMemo(() => makeStyles(color, bgColor), []);
  return <Text style={styles.flair}>{tag}</Text>;
};

const makeStyles = (color: string, bgColor?: string) =>
  StyleSheet.create({
    flair: {
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
    },
  });
