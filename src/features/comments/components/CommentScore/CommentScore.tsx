import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, SubText, Text } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';

interface Props {
  scoreHidden: boolean;
  voted: boolean | null;
  score: number;
}

export function CommentScore({ scoreHidden, voted, score }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  if (scoreHidden) {
    return (
      <Icon
        icon="help"
        size={15}
        color={
          // eslint-disable-next-line no-nested-ternary
          voted
            ? theme.upvote
            : voted === false
            ? theme.downvote
            : theme.placeholder
        }
        style={styles.text}
      />
    );
  }

  if (voted) {
    return <Text style={styles.upVotedText}>{score}</Text>;
  }

  if (voted === false) {
    return <Text style={styles.downVotedText}>{score}</Text>;
  }

  return (
    <SubText fontSize={15} style={styles.text}>
      {score}
    </SubText>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    text: { marginRight: 6, marginLeft: 6 },
    upVotedText: {
      marginRight: 6,
      marginLeft: 6,
      fontSize: 15,
      color: theme.upvote,
    },
    downVotedText: {
      marginRight: 6,
      marginLeft: 6,
      fontSize: 15,
      color: theme.downvote,
    },
  });
