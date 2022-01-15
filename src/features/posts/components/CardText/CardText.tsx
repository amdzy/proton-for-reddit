import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores';
import { ColorsDTO } from '@/stores/types';

interface Props {
  text: string;
  fullText?: boolean;
}

export function CardText({ text, fullText }: Props) {
  const theme = useTheme();
  const fonts = useThemeStore((state) => state.fonts);
  const styles = useMemo(() => makeStyle(theme, fonts), [theme, fonts]);

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        numberOfLines={fullText ? undefined : 5}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </View>
  );
}

const makeStyle = (theme: ColorsDTO, fonts: any) =>
  StyleSheet.create({
    container: { paddingHorizontal: 10 },
    text: {
      backgroundColor: theme.backdrop,
      color: theme.text,
      padding: 8,
      borderRadius: 10,
      lineHeight: 20,
      fontSize: fonts.fontSize.content,
    },
  });
