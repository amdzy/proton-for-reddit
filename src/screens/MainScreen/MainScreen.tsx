import { PostCard } from "@/features/posts";
import { useGetPosts } from "@/features/posts/api/getPosts";
import React from "react";
import { FlatList, Text, View } from "react-native";

export const MainScreen = () => {
  const query = useGetPosts();
  if (query.isLoading) {
    return <Text>Loading</Text>;
  }
  if (query.data) {
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
          renderItem={({ item }) => <PostCard post={item.data} />}
          data={query.data?.data.children}
          style={{ width: "100%" }}
        />
      </View>
    );
  }
  return null;
};
