import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { Text } from '../Typography';

interface Props {
  text: string;
  active: boolean;
  onPress: () => void;
}

export function TabButton({ text, active, onPress }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme, active);
  return (
    <Pressable
      style={styles.tabButton}
      android_ripple={styles.ripple}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const makeStyles = (theme: ColorsDTO, active: boolean) =>
  StyleSheet.create({
    tabButton: {
      padding: 10,
      borderColor: active ? theme.primary : undefined,
      borderBottomWidth: active ? 3 : undefined,
      flex: 1,
    },
    ripple: { color: theme.highlight },
    text: { textAlign: 'center' },
  });
