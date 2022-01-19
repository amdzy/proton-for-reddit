import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from '@/components';
import { PostCard } from '@/features/posts';
import { useGetFeed } from '@/features/posts/api';
import { useSettingsStore } from '@/stores';

export function AllScreen() {
  const flatlistRef = useRef<any>();
  const sort = useSettingsStore((state) => state.posts.sort);
  const query = useGetFeed('all', sort);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      if (query.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [query.isRefetching, refreshing]);

  if (query.isLoading) {
    return <Spinner animating />;
  }

  if (query.data) {
    return (
      <FlatList
        ref={flatlistRef}
        renderItem={({ item }) => (
          <>
            {item.children.map((post) => (
              <PostCard post={post.data} page key={post.data.id} />
            ))}
          </>
        )}
        data={query.data.pages}
        keyExtractor={(item, index) => item.after + item.before + index}
        style={styles.flatlist}
        onEndReachedThreshold={10}
        onEndReached={() => {
          if (!query.isFetchingNextPage && !query.isFetching) {
            console.log('end');
            query.fetchNextPage();
          }
        }}
        ListFooterComponent={() => {
          if (query.isFetchingNextPage) {
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
          query.refetch();
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
