import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Avatar, Icon, SubText } from '@/components';
import { useTheme } from '@/hooks';
import { useSettingsStore } from '@/stores';
import { ColorsDTO } from '@/stores/types';
import { timeRelative } from '@/utils';

interface Props {
  subIcon?: string;
  subName: string;
  author: string;
  createdAt: number;
  sub: string;
  isLocked: boolean;
}

export function PostHeader({
  subIcon,
  subName,
  author,
  createdAt,
  sub,
  isLocked,
}: Props) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const postSettings = useSettingsStore((state) => state.posts);
  const navigation = useNavigation<any>();

  const handleAvatarRedirect = () => {
    navigation.navigate('Sub', {
      sub,
      subIcon,
    });
  };

  const handleSubRedirect = () => {
    if (!postSettings.tapSub) {
      return;
    }
    navigation.navigate('Sub', {
      sub,
      subIcon,
    });
  };

  const handleUserRedirect = () => {
    if (!postSettings.tapUser) {
      return;
    }
    navigation.navigate('UsersProfile', { name: author });
  };

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
            <Pressable onPress={handleUserRedirect}>
              <SubText fontSize={12} style={styles.userName}>
                u/{author}
              </SubText>
            </Pressable>
          )}
        </View>
        {isLocked && (
          <Icon
            icon="lock"
            size={14}
            color={theme.highlight}
            style={styles.lock}
          />
        )}
      </View>
      <SubText fontSize={12}>{timeRelative(createdAt)} ago</SubText>
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
    lock: { marginHorizontal: 6 },
  });
