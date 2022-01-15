import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores';

interface Props extends TextProps {
  children: ReactNode;
}

export function Header({ children, style }: Props) {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.text,
          fontSize: fonts.fontSize.header,
          lineHeight: 22,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
