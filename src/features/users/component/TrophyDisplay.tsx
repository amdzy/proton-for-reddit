import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { SubText, Text } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { Trophies } from '../types';
import { timeRelative } from '@/utils';

interface Props {
  trophies?: Array<{ data: Trophies }>;
}

export function TrophyDisplay({ trophies }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const renderItemMemo = useCallback(
    ({ item }) => (
      <View style={styles.trophyContainer}>
        <Image
          source={{ uri: item.data.icon_70 }}
          width={50}
          height={50}
          style={styles.image}
        />
        <SubText>{item.data.name}</SubText>
        {item.data.granted_at && (
          <SubText>{timeRelative(item.data.granted_at)} ago</SubText>
        )}
      </View>
    ),
    [styles]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Trophy Case({trophies ? trophies.length : 0})</Text>
      </View>
      {trophies && (
        <FlatList
          data={trophies}
          renderItem={renderItemMemo}
          keyExtractor={(item) => item.data.award_id}
          horizontal
        />
      )}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: { width: '100%', marginBottom: 8 },
    header: { backgroundColor: theme.backdrop, padding: 8, marginBottom: 4 },
    trophyContainer: {
      alignItems: 'center',
      marginHorizontal: 8,
      marginTop: 12,
    },
    image: { width: 50, height: 50, marginBottom: 4 },
  });
