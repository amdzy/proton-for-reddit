import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Thumbnail } from "../Thumbnail/Thumbnail";

interface Props {
  post: any;
}

export const CardMain = ({ post }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  const [ratio, setRatio] = useState(1);

  if (post.selftext) {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            backgroundColor: theme.backdrop,
            color: theme.text,
            padding: 8,
            borderRadius: 10,
            lineHeight: 20,
            fontSize: fonts.fontSize.content,
          }}
          numberOfLines={5}
          ellipsizeMode={"tail"}
        >
          {post.selftext}
        </Text>
      </View>
    );
  }

  if (post.post_hint === "image") {
    Image.getSize(post.url, (width, height) => {
      setRatio(width / height);
    });
    return (
      <Image
        source={{
          uri: post.url,
        }}
        style={{
          flex: 1,
          width: "100%",
          height: undefined,
          aspectRatio: ratio,
        }}
        resizeMode="cover"
      />
    );
  }

  if (post.post_hint === "link") {
    return <Thumbnail url={post.thumbnail} />;
  }
  return null;
};
