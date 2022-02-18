import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSearchUsers } from '@/features/search/api';
import {
  Avatar,
  ErrorEmpty,
  ErrorLoading,
  Indicator,
  ListItem,
} from '@/components';

export function UserSearchScreen({ route, navigation }: any) {
  const { query } = route.params;
  const usersQuery = useSearchUsers(query);
  const flatlistRef = useRef<any>();
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing && !usersQuery.isRefetching) {
      setIsRefreshing(false);
    }
  }, [usersQuery.isRefetching, refreshing]);

  const flatlistEmpty = () => {
    if (usersQuery.isLoading || usersQuery.isFetching) {
      return <Indicator />;
    }
    return <ErrorEmpty onPress={() => usersQuery.refetch()} />;
  };

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    usersQuery.refetch();
  }, [usersQuery]);

  const renderItemMemoized = useCallback(
    ({ item }) => (
      <ListItem
        text={item.data.name}
        left={
          <Avatar
            image={item.data?.snoovatar_img || item.data?.icon_img}
            size={35}
            placeholder="user"
          />
        }
        onPress={() => {
          navigation.navigate('UsersProfile', { name: item.data.name });
        }}
      />
    ),
    [navigation]
  );

  if (usersQuery.isError && !usersQuery.data) {
    return (
      <ErrorLoading
        onPress={() => {
          usersQuery.refetch();
        }}
      />
    );
  }

  return (
    <FlatList
      ref={flatlistRef}
      renderItem={renderItemMemoized}
      data={usersQuery.data?.children}
      keyExtractor={(item) => item.data.id}
      style={{ width: '100%' }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={flatListOnRefresh}
      ListEmptyComponent={flatlistEmpty}
    />
  );
}
