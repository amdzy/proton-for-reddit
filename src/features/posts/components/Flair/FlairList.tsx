import React from "react";
import { StyleSheet, View } from "react-native";
import { Flair } from "./Flair";

interface Props {
  tag: string | undefined;
  bgColor: string;
  color: string;
  hint: string | undefined;
}

export const FlairList = ({ tag, bgColor, color, hint }: Props) => {
  return (
    <View style={styles.container}>
      {tag && <Flair tag={tag} bgColor={bgColor} color={color} />}
      {hint && <Flair tag={hint} bgColor={"#FFFFFF"} color={"dark"} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    paddingTop: 0,
  },
});
