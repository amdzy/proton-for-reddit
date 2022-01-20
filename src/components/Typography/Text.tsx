import React, { ReactNode } from 'react';
import { Text as ReactText, TextProps } from 'react-native';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores';

interface Props extends TextProps {
  children: ReactNode;
}

export function Text({ children, ...props }: Props) {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  return (
    <ReactText
      style={[
        {
          color: theme.text,
          fontSize: fonts.fontSize.content,
        },
        props.style,
      ]}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
    >
      {children}
    </ReactText>
  );
}
