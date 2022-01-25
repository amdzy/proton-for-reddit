import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Avatar, Spacer, SubText, Text } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { timeRelative } from '@/utils';

interface Props {
  moderated?: any;
}

export function ModeratedDisplay({ moderated }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const navigation = useNavigation<any>();

  const renderItemMemo = useCallback(
    (item) => {
      const icon = item.community_icon || item.icon_img;
      return (
        <Pressable
          style={styles.subContainer}
          onPress={() => {
            navigation.navigate('Sub', {
              sub: item.display_name,
              subIcon: icon,
            });
          }}
          key={item.name}
        >
          <View style={styles.avatar}>
            <Avatar image={icon} size={45} />
          </View>
          <Text style={styles.subName}>{item.display_name}</Text>
          <View style={styles.dataContainer}>
            <SubText fontSize={12}>{item.subscribers} members</SubText>
            <Spacer horizontal size={6} />
            <SubText fontSize={12}>{timeRelative(item.created_utc)}</SubText>
          </View>
        </Pressable>
      );
    },
    [styles]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Moderated Subs({moderated ? moderated.length : 0})</Text>
      </View>
      {moderated && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {moderated.map(renderItemMemo)}
        </View>
      )}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 8,
    },
    header: { backgroundColor: theme.backdrop, padding: 8, marginBottom: 4 },
    subContainer: {
      paddingVertical: 10,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.backdrop,
      borderRadius: 5,
      overflow: 'hidden',
      minWidth: 150,
      marginHorizontal: 8,
      marginTop: 12,
    },
    avatar: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 6,
    },
    subName: { textAlign: 'center' },
    dataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

// Use scroll view when i fix nested horizontal lists
// <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//   {moderated.map(renderItemMemo)}
// </ScrollView>
