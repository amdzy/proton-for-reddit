import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { HighlightedText } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';

interface Props {
  isSticked: boolean;
  isSubmitter: boolean;
  author: string;
}

export function CommentAuthor({ isSticked, isSubmitter, author }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  if (isSticked || author === 'AutoModerator') {
    return <Text style={styles.sticked}>{author}</Text>;
  }

  if (isSubmitter) {
    return <Text style={styles.submitter}>{author}</Text>;
  }

  return <HighlightedText style={styles.text}>{author}</HighlightedText>;
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    text: { marginRight: 6, fontSize: 13 },
    sticked: {
      color: theme.text,
      backgroundColor: theme.announcement,
      padding: 2,
      borderRadius: 3,
      marginRight: 6,
      fontSize: 13,
    },
    submitter: {
      color: theme.background,
      backgroundColor: theme.highlight,
      padding: 2,
      borderRadius: 3,
      marginRight: 6,
      fontSize: 13,
    },
  });
