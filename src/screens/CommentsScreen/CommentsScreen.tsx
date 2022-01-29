import React from 'react';
import { FlatList, View } from 'react-native';
import { PostCard } from '@/features/posts';
import { Post } from '@/features/posts/types';
import { useGetComments } from '@/features/comments/api';
import { Divider, Indicator } from '@/components';
import { Comment } from '@/features/comments/components/Comment';
import { useTheme } from '@/hooks';

interface Props {
  route: any;
}

export function CommentsScreen({ route }: Props) {
  const post: Post = route.params?.post;
  const query = useGetComments(post.id, 'hot', post.subreddit);
  const theme = useTheme();

  return (
    <FlatList
      data={query.data?.[1].data.children}
      renderItem={({ item }) => <Comment comment={item.data} />}
      ListHeaderComponent={() => (
        <>
          <PostCard post={query.data?.[0].data.children[0].data || post} />
          <Divider />
        </>
      )}
      ListFooterComponent={() => {
        if (query.isLoading) {
          return <Indicator />;
        }
        return null;
      }}
      keyExtractor={(item) => item.data.id}
      ItemSeparatorComponent={() => (
        <View style={{ borderBottomWidth: 1, borderColor: theme.backdrop }} />
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <PostCard post={post} />
    </View>
  );
}
