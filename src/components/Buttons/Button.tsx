import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks';
import { Text } from '../Typography/Text';

interface Props extends PressableProps {
  text: string;
  style?: ViewStyle;
}

export function Button({ text, disabled, onPress, style }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: theme.placeholder }}
      testID="button"
    >
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
