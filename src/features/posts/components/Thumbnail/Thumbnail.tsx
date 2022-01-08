import { useTheme } from "@/hooks";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ThumbnailProps {
  url: string;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.icon}>
        <FontAwesome name="external-link" size={7} color={theme.background} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 75, height: 75, marginLeft: 16 },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 4,
    backgroundColor: "#64ffda",
  },
});
