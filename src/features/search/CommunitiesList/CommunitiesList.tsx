import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Avatar, SubText, Text } from '@/components';
import { useTheme } from '@/hooks';
import { useSearchStore } from '@/stores';

interface Props {
  subName: string;
  members: number | null;
  avatar: string;
}

export function CommunitiesList({ subName, members, avatar }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const setSearch = useSearchStore((state) => state.setSearch);
  const setSearchHistory = useSearchStore((state) => state.setSearchHistory);

  const handlePress = () => {
    navigation.navigate('Sub', {
      sub: subName,
      subIcon: avatar,
    });
    setSearch('');
    setSearchHistory(subName);
  };

  return (
    <Pressable
      style={styles.button}
      android_ripple={{ color: theme.placeholder }}
      onPress={handlePress}
    >
      <Avatar image={avatar} size={34} style={styles.avatar} />
      <View>
        <Text style={{ fontSize: 15 }}>{subName}</Text>
        {members !== null && <SubText fontSize={12}>{members} Members</SubText>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  avatar: { marginRight: 12 },
});
