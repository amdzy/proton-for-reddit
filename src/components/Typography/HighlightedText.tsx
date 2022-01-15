import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores';

interface Props {
  children: ReactNode;
  fontSize?: number;
  style?: TextStyle;
}

export function HighlightedText({ children, fontSize = 14, style }: Props) {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.highlight,
          fontSize,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
