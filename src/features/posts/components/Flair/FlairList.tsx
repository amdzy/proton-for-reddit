import React from "react";
import { StyleSheet, View } from "react-native";
import { Flair } from "./Flair";

interface Props {
  tag: string | undefined;
  bgColor: string;
  color: string;
  hint: string | undefined;
  isNsfw: boolean;
}

const regExp = new RegExp(/rich:|hosted:/, "g");
const emojiReg = new RegExp(/:(\w*):/, "g");

export const FlairList = ({ tag, bgColor, color, hint, isNsfw }: Props) => {
  const newHint = hint?.replace(regExp, "").toUpperCase();
  //const newTag = tag?.replace(emojiReg, "").trim();
  return (
    <View style={styles.container}>
      {newHint && <Flair tag={newHint} bgColor={"#FFFFFF"} color={"dark"} />}
      {tag && <Flair tag={tag} bgColor={bgColor} color={color} />}
      {isNsfw && <Flair tag={"NSFW"} bgColor={"#e52d27"} color={"light"} />}
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
