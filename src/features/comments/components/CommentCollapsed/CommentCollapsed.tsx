import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { CommentLines } from '../CommentLines/CommentLines';
import { Icon, SubText } from '@/components';
import { timeRelative } from '@/utils';

interface Props {
  author: string;
  score: number;
  date: number;
  depth: number;
  scoreHidden: boolean;
  onPress: () => void;
}

export function CommentCollapsed({
  author,
  score,
  date,
  depth,
  scoreHidden,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <CommentLines depth={depth} />
      <Pressable
        style={styles.button}
        onLongPress={onPress}
        android_ripple={styles.ripple}
      >
        <View style={styles.rowContainer}>
          <Icon icon="plus-box-outline" color={theme.placeholder} size={16} />
          <SubText style={styles.text}>{author}</SubText>
        </View>
        <View style={styles.rowContainer}>
          {scoreHidden ? (
            <Icon
              icon="help"
              size={15}
              color={theme.placeholder}
              style={styles.text}
            />
          ) : (
            <SubText fontSize={15} style={styles.text}>
              {score}
            </SubText>
          )}
          <SubText fontSize={12}>{timeRelative(date)}</SubText>
        </View>
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
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: { marginRight: 6, marginLeft: 6 },
    ripple: { color: theme.placeholder },
  });
