import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '@/hooks';

interface Props {
  text: string;
  style?: TextStyle;
}

export function SettingsHeader({ text, style }: Props) {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.primary,
        fontSize: 16,
        padding: 12,
        ...style,
      }}
      testID="settingsHeader"
    >
      {text}
    </Text>
  );
}
