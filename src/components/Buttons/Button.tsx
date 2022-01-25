import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks';
import { Text } from '../Typography/Text';

interface Props extends PressableProps {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ text, disabled, style, textStyle, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: theme.placeholder }}
      testID="button"
    >
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
