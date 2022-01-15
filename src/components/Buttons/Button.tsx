import React from 'react';
import { Pressable, PressableProps, Text, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks';

interface Props extends PressableProps {
  text: string;
  style?: ViewStyle;
}

export function Button({ text, disabled, onPress, style }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      style={{ padding: 10, ...style }}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: theme.placeholder }}
      testID="button"
    >
      <Text style={{ color: theme.primary }}>{text}</Text>
    </Pressable>
  );
}
