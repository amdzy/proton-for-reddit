import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PostImage } from "../PostImage/PostImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  url: string;
  width: number;
  height: number;
  onPress: () => void;
}

export const VideoImage = ({ url, width, height, onPress }: Props) => {
  return (
    <View>
      <PostImage url={url} width={width} height={height} />
      <Pressable style={styles.button} onPress={onPress}>
        <View pointerEvents="none">
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={80}
            color="white"
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
