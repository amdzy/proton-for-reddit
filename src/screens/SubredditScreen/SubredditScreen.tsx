import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from '@/components';
import { PostCard } from '@/features/posts';
import { useGetFeed } from '@/features/posts/api';
import { useSettingsStore } from '@/stores';
import { SubHeader } from '@/features/sub/components/SubHeader';
import { useGetSubAbout } from '@/features/sub/api';

interface Props {
  route: any;
}

export function SubredditScreen({ route }: Props) {
  const { sub, subIcon } = route.params;
  const flatlistRef = useRef<any>();
  const sort = useSettingsStore((state) => state.posts.sort);
  const postsQuery = useGetFeed(sub, sort);
  const aboutQuery = useGetSubAbout(sub);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      if (postsQuery.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [postsQuery.isRefetching, refreshing]);

  const flatListFooter = useCallback(() => {
    if (postsQuery.isFetchingNextPage) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating color="red" size="large" />
        </View>
      );
    }
    return null;
  }, [postsQuery.isFetchingNextPage]);

  const flatListHeader = () => {
    if (aboutQuery.data) {
      return (
        <SubHeader
          name={aboutQuery.data.display_name}
          icon={aboutQuery.data.community_icon || aboutQuery.data.icon_img}
          active={aboutQuery.data.accounts_active}
          subscriber={aboutQuery.data.subscribers}
          description={aboutQuery.data.public_description}
          subscribed={aboutQuery.data.user_is_subscriber}
          showData
        />
      );
    }
    return null;
  };

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    postsQuery.refetch();
  }, []);

  const flatListOnEnd = () => {
    if (!postsQuery.isFetchingNextPage && !postsQuery.isFetching) {
      postsQuery.fetchNextPage();
    }
  };

  const rendreItemMemoized = useCallback(
    ({ item }) => <PostCard post={item.data} page />,
    []
  );

  if (postsQuery.isLoading || aboutQuery.isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <SubHeader name={sub} icon={subIcon} />
        <View style={{ flex: 1, paddingTop: 40 }}>
          <Spinner animating />
        </View>
      </View>
    );
  }

  if (postsQuery.data && postsQuery.posts && aboutQuery.data) {
    return (
      <FlatList
        ref={flatlistRef}
        renderItem={rendreItemMemoized}
        data={postsQuery.posts}
        keyExtractor={(item) => item.data.id}
        style={styles.flatlist}
        onEndReachedThreshold={10}
        onEndReached={flatListOnEnd}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={flatListOnRefresh}
        ListFooterComponent={flatListFooter}
        ListHeaderComponent={flatListHeader}
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
