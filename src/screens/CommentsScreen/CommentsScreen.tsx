import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { PostCard } from '@/features/posts';
import { Post } from '@/features/posts/types';
import { useGetComments } from '@/features/comments/api';
import { Divider, Indicator } from '@/components';
import { CommentMemoized } from '@/features/comments';
import { useTheme } from '@/hooks';

interface Props {
  route: any;
}

export function CommentsScreen({ route }: Props) {
  const post: Post = route.params?.post;
  const query = useGetComments(post.id, 'hot', post.subreddit);
  const theme = useTheme();

  const renderItemMemoized = useCallback(
    ({ item }) => <CommentMemoized comment={item.data} />,
    []
  );

  const listHeader = useCallback(
    () => (
      <>
        <PostCard post={post} />
        <Divider />
      </>
    ),
    [post]
  );

  const listFooter = useCallback(() => {
    if (query.isLoading) {
      return <Indicator />;
    }
    return null;
  }, [query.isLoading]);

  const itemSeparator = useCallback(
    () => (
      <View style={{ borderBottomWidth: 1, borderColor: theme.backdrop }} />
    ),
    [theme.backdrop]
  );

  const keyExtractor = useCallback((item) => item.data.id, []);

  return (
    <FlatList
      data={query.data?.[1].data.children}
      renderItem={renderItemMemoized}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listFooter}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={itemSeparator}
    />
  );
}
