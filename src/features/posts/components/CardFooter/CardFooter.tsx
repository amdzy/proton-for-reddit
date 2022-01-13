import React from "react";
import { View } from "react-native";
import { IconButton, SubText } from "@/components";

export const CardFooter = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 12,
        flexWrap: "nowrap",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 0.4,
        }}
      >
        <IconButton icon="arrow-up-thick" />
        <SubText>34545</SubText>
        <IconButton icon="arrow-down-thick" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 0.3,
        }}
      >
        <IconButton icon="comment-outline" />
        <SubText>34545</SubText>
      </View>
      <IconButton icon="bookmark-outline" />
      <IconButton icon="share-variant" />
    </View>
  );
};
