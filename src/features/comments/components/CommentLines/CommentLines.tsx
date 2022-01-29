/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';

interface Props {
  depth: number;
}

export function CommentLines({ depth }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      {Array(depth)
        .fill(1)
        .map((x, i) => (
          <View style={styles.line} key={i} />
        ))}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    line: {
      width: 12,
      borderRightWidth: 1,
      borderRightColor: theme.backdrop,
      backgroundColor: theme.surface,
    },
  });
