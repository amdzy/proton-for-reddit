import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  text?: string;
  url?: string;
}

export const CardMain = ({ text, url }: Props) => {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);

  if (true) {
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
          Listings do not use page numbers because their content changes so
          frequently. Instead, they allow you to view slices of the underlying
          data. Listing JSON responses contain after and before fields which are
          equivalent to the "next" and "prev" buttons on the site and in
          combination with count can be used to page through the listing.
        </Text>
      </View>
    );
  }
  return (
    <Image
      source={{
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QDOmzOh-mruIm3MlC7aezgHaE8%26pid%3DApi&f=1",
      }}
      style={{ width: "100%", minHeight: 250 }}
    />
  );
};
