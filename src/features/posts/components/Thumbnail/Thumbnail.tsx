import { useTheme } from "@/hooks";
import React from "react";
import { Image, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ThumbnailProps {
  url: string;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  const theme = useTheme();
  return (
    <View>
      <Image
        source={{
          uri: url,
        }}
        style={{
          flex: 1,
          width: "100%",
          height: 200,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: 8,
          backgroundColor: theme.primary,
        }}
      >
        <FontAwesome name="external-link" size={20} color={theme.background} />
      </View>
    </View>
  );
};
