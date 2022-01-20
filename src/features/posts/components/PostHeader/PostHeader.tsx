import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigation } from '@react-navigation/core';
import { Avatar, SubText } from '@/components';
import { useTheme } from '@/hooks';
import { useSettingsStore, useSubIconStore } from '@/stores';
import { fetchIcon } from '../../utils/fetchIcon';
import { ColorsDTO } from '@/stores/types';

interface Props {
  subName: string;
  author: string;
  createdAt: number;
  sub: string;
}

export function PostHeader({ subName, author, createdAt, sub }: Props) {
  const theme = useTheme();
  const subIcon = useSubIconStore((state) => state.icons.get(sub));
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const postSettings = useSettingsStore((state) => state.posts);
  const navigation = useNavigation<any>();

  const handleAvatarRedirect = () => {
    navigation.navigate('Sub', {
      sub: subName,
      subIcon,
    });
  };

  const handleSubRedirect = () => {
    if (!postSettings.tapSub) {
      return;
    }
    navigation.navigate('Sub', {
      sub: subName,
      subIcon,
    });
  };

  const handleuserRedirect = () => {
    if (!postSettings.tapUser) {
      return;
    }
    navigation.navigate('Comments');
  };

  useEffect(() => {
    if (!subIcon) {
      fetchIcon(sub);
    }
  }, [subIcon, sub]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {postSettings.subIcon && (
          <Pressable onPress={handleAvatarRedirect}>
            <Avatar size={26} style={styles.avatar} image={subIcon} />
          </Pressable>
        )}
        <View style={styles.linksContainer}>
          <Pressable onPress={handleSubRedirect}>
            <Text style={styles.subName}>{subName}</Text>
          </Pressable>
          {postSettings.author && (
            <Pressable onPress={handleuserRedirect}>
              <SubText fontSize={12} style={styles.userName}>
                u/{author}
              </SubText>
            </Pressable>
          )}
        </View>
      </View>
      <SubText fontSize={12}>
        {formatDistanceToNowStrict(createdAt * 1000)} ago
      </SubText>
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      paddingBottom: 5,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 4,
      justifyContent: 'flex-start',
    },
    avatar: {
      marginRight: 8,
    },
    subName: { color: theme.highlight, marginRight: 8 },
    userName: { marginRight: 8 },
    linksContainer: { marginLeft: 6 },
    subContainer: { flexDirection: 'row', alignItems: 'center' },
  });
