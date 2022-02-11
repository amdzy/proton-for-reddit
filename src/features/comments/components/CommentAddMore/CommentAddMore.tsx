import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { CommentLines } from '../CommentLines/CommentLines';

interface Props {
  depth: number;
}

export function CommentAddMore({ depth }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <CommentLines depth={depth} />
      <Pressable
        style={styles.button}
        onPress={() => {}}
        android_ripple={styles.ripple}
      >
        <Text style={styles.text}>Load More Comments</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      flex: 1,
      backgroundColor: theme.surface,
    },
    ripple: { color: theme.placeholder },
    text: {
      textAlign: 'center',
      flex: 1,
      color: theme.highlight,
    },
  });
