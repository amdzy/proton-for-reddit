import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Flair } from "./Flair";

interface Props {
  tag: string | undefined;
  bgColor: string;
  color: string;
  hint: string | undefined;
}

export const FlairList = ({ tag, bgColor, color, hint }: Props) => {
  const newHint = useMemo(
    () => hint?.replace("rich:", "").replace("hosted:", "").toUpperCase(),
    []
  );
  return (
    <View style={styles.container}>
      {newHint && <Flair tag={newHint} bgColor={"#FFFFFF"} color={"dark"} />}
      {tag && <Flair tag={tag} bgColor={bgColor} color={color} />}
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
