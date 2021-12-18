import { PostCard } from "@/features/posts";
import React from "react";
import { FlatList, View } from "react-native";

const arr = [1, 1, 1, 1];
export const MainScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <FlatList
        renderItem={() => <PostCard />}
        data={arr}
        style={{ width: "100%" }}
      />
    </View>
  );
};
