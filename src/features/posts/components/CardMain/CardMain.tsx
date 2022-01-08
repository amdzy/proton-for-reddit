import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { PostImage } from "../PostImage/PostImage";

interface Props {
  post: any;
}

export const CardMain = ({ post }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);

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
    const image = post.preview.images[0].source;
    return <PostImage image={image} />;
  }

  if (post.is_gallery) {
    const imgArr = Object.values(post.media_metadata);
    return <ImageCarousel images={imgArr} />;
  }
  return null;
};
