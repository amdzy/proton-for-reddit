import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSearchPosts } from '@/features/search/api';
import { ErrorEmpty, ErrorLoading, Indicator } from '@/components';
import { PostCard } from '@/features/posts';

export function PostSearchScreen({ route }: any) {
  const { query } = route.params;
  const postsQuery = useSearchPosts(query);
  const flatlistRef = useRef<any>();
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing && !postsQuery.isRefetching) {
      setIsRefreshing(false);
    }
  }, [postsQuery.isRefetching, refreshing]);

  const flatlistEmpty = () => {
    if (postsQuery.isLoading || postsQuery.isFetching) {
      return <Indicator />;
    }
    return <ErrorEmpty onPress={() => postsQuery.refetch()} />;
  };

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    postsQuery.refetch();
  }, [postsQuery]);

  const renderItemMemoized = useCallback(
    ({ item }) => <PostCard post={item.data} page />,
    []
  );

  if (postsQuery.isError && !postsQuery.data) {
    return (
      <ErrorLoading
        onPress={() => {
          postsQuery.refetch();
        }}
      />
    );
  }

  return (
    <FlatList
      ref={flatlistRef}
      renderItem={renderItemMemoized}
      data={postsQuery.data?.children}
      keyExtractor={(item) => item.data.id}
      style={{ width: '100%' }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={flatListOnRefresh}
      ListEmptyComponent={flatlistEmpty}
    />
  );
}
