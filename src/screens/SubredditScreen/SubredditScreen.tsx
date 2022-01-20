import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from '@/components';
import { PostCard } from '@/features/posts';
import { useGetFeed } from '@/features/posts/api';
import { useSettingsStore } from '@/stores';

interface Props {
  route: any;
}

export function SubredditScreen({ route }: Props) {
  const { sub } = route.params;
  const flatlistRef = useRef<any>();
  const sort = useSettingsStore((state) => state.posts.sort);
  const postQuery = useGetFeed(sub, sort);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      if (postQuery.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [postQuery.isRefetching, refreshing]);

  if (postQuery.isLoading) {
    return <Spinner animating />;
  }

  if (postQuery.data && postQuery.posts) {
    return (
      <FlatList
        ref={flatlistRef}
        renderItem={({ item }) => <PostCard post={item.data} page />}
        data={postQuery.posts}
        keyExtractor={(item, index) => item.data.id + index}
        style={styles.flatlist}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!postQuery.isFetchingNextPage && !postQuery.isFetching) {
            postQuery.fetchNextPage();
          }
        }}
        ListFooterComponent={() => {
          if (postQuery.isFetchingNextPage) {
            return (
              <View style={styles.spinnerContainer}>
                <ActivityIndicator animating color="red" size="large" />
              </View>
            );
          }
          return null;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          setIsRefreshing(true);
          postQuery.refetch();
        }}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  flatlist: {
    width: '100%',
  },
});
