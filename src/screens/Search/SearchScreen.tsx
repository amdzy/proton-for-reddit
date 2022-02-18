/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSearchStore } from '@/stores';
import { CommunitiesList, SearchHistory } from '@/features/search';
import { ListItem, SubText } from '@/components';
import { useSearchCommunities } from '@/features/search/api/searchCommunities';

export function SearchScreen({ navigation }: any) {
  const searchVal = useSearchStore((state) => state.search);
  const searchHistory = useSearchStore((state) => state.searchHistory);
  const searchQuery = useSearchCommunities(searchVal);

  useEffect(() => {
    if (searchVal.length > 3) {
      searchQuery.refetch();
    }
  }, [searchVal]);

  const handlePostRedirect = () => {
    navigation.navigate('SearchPosts', { query: searchVal });
  };

  const handleUserRedirect = () => {
    navigation.navigate('SearchUsers', { query: searchVal });
  };

  if (!searchVal && searchHistory.length) {
    return (
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => <SearchHistory text={item} />}
        ListHeaderComponent={() => (
          <SubText style={styles.historyText}>Search History</SubText>
        )}
        keyExtractor={(item) => item}
      />
    );
  }

  if (searchVal.length) {
    return (
      <FlatList
        data={searchQuery.data?.children}
        renderItem={({ item }) => (
          <CommunitiesList
            subName={item.data.display_name}
            members={item.data.subscribers}
            avatar={item.data?.community_icon || item.data?.icon_img}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <ListItem
              text={`Posts with ${searchVal}`}
              icon="post"
              onPress={handlePostRedirect}
            />
            <ListItem
              text={`Users with ${searchVal}`}
              icon="account-circle"
              onPress={handleUserRedirect}
            />
            <SubText style={styles.commText}>Communities</SubText>
          </View>
        )}
        keyExtractor={(item) => item.data.id}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  historyText: { padding: 12 },
  commText: { padding: 12, marginLeft: 8 },
});
