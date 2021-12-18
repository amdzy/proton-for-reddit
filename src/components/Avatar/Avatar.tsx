import React from "react";
import { Image, ImageStyle, View } from "react-native";

interface Props {
  image?: string;
  size: number;
  style?: ImageStyle;
}

export const Avatar = ({ image, size, style }: Props) => {
  if (!image) {
    image =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.cis3g330OtIPAkV3gbc_EAHaHa%26pid%3DApi&f=1";
  }
  return (
    <Image
      source={{ uri: image }}
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: size / 2, ...style }}
    />
  );
};
