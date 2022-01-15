import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores';

interface Props extends TextProps {
  children: ReactNode;
  fontSize?: number;
}

export function SubText({ children, fontSize = 14, ...props }: Props) {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <Text
      style={[
        {
          color: theme.placeholder,
          fontSize,
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
}
