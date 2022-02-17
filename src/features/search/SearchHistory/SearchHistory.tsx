import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon, IconButton, Text } from '@/components';
import { useTheme } from '@/hooks';
import { useSearchStore } from '@/stores';

interface Props {
  text: string;
}

export function SearchHistory({ text }: Props) {
  const theme = useTheme();
  const setSearch = useSearchStore((state) => state.setSearch);
  const deleteSearch = useSearchStore((state) => state.deleteSearch);

  const handlePress = () => {
    setSearch(text);
  };

  const handleDelete = () => {
    deleteSearch(text);
  };

  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: theme.placeholder }}
      onPress={handlePress}
    >
      <Icon icon="restore" color={theme.text} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
      <IconButton
        icon="delete-forever-outline"
        color={theme.text}
        style={styles.icon}
        onPress={handleDelete}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  icon: { marginHorizontal: 16 },
  text: { flex: 1 },
});
