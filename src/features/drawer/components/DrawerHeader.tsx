import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Icon, SubText, Text } from '@/components';
import { useTheme } from '@/hooks';
import { useAuthStore } from '@/stores';

interface Props {
  showLogin: boolean;
  onPress: () => void;
}

export function DrawerHeader({ showLogin, onPress }: Props) {
  const theme = useTheme();
  const userName = useAuthStore((state) => state.userName);
  const userIcon = useAuthStore((state) => state.userIcon);
  const karma = useAuthStore((state) => state.karma);
  return (
    <Pressable
      style={{
        backgroundColor: theme.backdrop,
        ...styles.button,
      }}
      onPress={onPress}
    >
      <Avatar image={userIcon || undefined} size={50} placeholder="user" />
      <View style={{ marginLeft: 16 }}>
        <Text>{userName || 'Anonymous'}</Text>
        {karma && <SubText>Karma: {karma}</SubText>}
      </View>
      {showLogin ? (
        <Icon icon="menu-up" color={theme.text} style={styles.icon} />
      ) : (
        <Icon icon="menu-down" color={theme.text} style={styles.icon} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: -70,
    padding: 16,
    paddingTop: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { position: 'absolute', bottom: 10, right: 10 },
});
