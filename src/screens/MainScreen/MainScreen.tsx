import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from '@/components';
import { PostCard } from '@/features/posts';
import { useGetFeed } from '@/features/posts/api';
import { useSettingsStore } from '@/stores';

interface Props {
  route: any;
}

export function MainScreen({ route }: Props) {
  const page = route.params?.page || 'popular';
  const flatlistRef = useRef<any>();
  const homeSort = useSettingsStore((state) => state.posts.feedSort);
  const sort = useSettingsStore((state) => state.posts.sort);
  const query = useGetFeed(page, page === 'home' ? homeSort : sort);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      if (query.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [query.isRefetching, refreshing]);

  const flatListFooter = useCallback(() => {
    if (query.isFetchingNextPage) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating color="red" size="large" />
        </View>
      );
    }
    return null;
  }, [query.isFetchingNextPage]);

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    query.refetch();
  }, []);

  const rendreItemMemoized = useCallback(
    ({ item }) => <PostCard post={item.data} page />,
    []
  );

  // useEffect(() => {
  //   if (flatlistRef.current) {
  //     flatlistRef.current.scrollToIndex({
  //       index: 0,
  //       animated: true,
  //       viewPosition: 0,
  //     });
  //   }
  // }, [sort]);

  if (query.isLoading) {
    return <Spinner animating />;
  }

  if (query.data && query.posts) {
    return (
      <FlatList
        ref={flatlistRef}
        renderItem={rendreItemMemoized}
        data={query.posts}
        keyExtractor={(item) => item.data.id}
        style={styles.flatlist}
        onEndReachedThreshold={10}
        onEndReached={() => {
          if (!query.isFetchingNextPage && !query.isFetching) {
            query.fetchNextPage();
          }
        }}
        ListFooterComponent={flatListFooter}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={flatListOnRefresh}
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

// <FlatList
//   ref={flatlistRef}
//   renderItem={({ item }) => (
//     <>
//       {item.children.map((post) => (
//         <PostCard post={post.data} page key={post.data.id} />
//       ))}
//     </>
//   )}
//   data={query.data.pages}
//   keyExtractor={(item, index) => item.after + item.before + index}
//   style={styles.flatlist}
//   onEndReachedThreshold={10}
//   onEndReached={() => {
//     if (!query.isFetchingNextPage && !query.isFetching) {
//       query.fetchNextPage();
//     }
//   }}
//   ListFooterComponent={() => {
//     if (query.isFetchingNextPage) {
//       return (
//         <View style={styles.spinnerContainer}>
//           <ActivityIndicator animating color="red" size="large" />
//         </View>
//       );
//     }
//     return null;
//   }}
//   showsVerticalScrollIndicator={false}
//   refreshing={refreshing}
//   onRefresh={() => {
//     setIsRefreshing(true);
//     query.refetch();
//   }}
// />
