import { Spinner } from "@/components";
import { PostCard } from "@/features/posts";
import { useGetFeed } from "@/features/posts/api";
import { useSettingsStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export const MainScreen = () => {
  const sort = useSettingsStore((state) => state.posts.sort);
  const query = useGetFeed(sort);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      if (query.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [query.isRefetching]);

  if (query.isLoading) {
    return <Spinner animating={true} />;
  }

  if (query.data) {
    return (
      <FlatList
        renderItem={({ item }) => {
          return (
            <>
              {item.children.map((post) => {
                return <PostCard post={post.data} key={post.data.id} />;
              })}
            </>
          );
        }}
        data={query.data.pages}
        keyExtractor={(item) => item.after}
        style={styles.flatlist}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!query.isFetchingNextPage && !query.isFetching) {
            query.fetchNextPage();
          }
        }}
        ListFooterComponent={() => {
          if (query.isFetchingNextPage) {
            return (
              <View style={styles.spinnerContainer}>
                <ActivityIndicator animating={true} color="red" size="large" />
              </View>
            );
          }
          return null;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          setIsRefreshing(true);
          query.refetch();
        }}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  flatlist: {
    width: "100%",
  },
});
