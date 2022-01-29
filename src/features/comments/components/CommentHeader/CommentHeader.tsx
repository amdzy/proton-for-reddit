import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HighlightedText, SubText } from '@/components';
import { timeRelative } from '@/utils';

interface Props {
  author: string;
  score: number;
  date: number;
}

export function CommentHeader({ author, score, date }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Avatar image={undefined} size={18} placeholder="user" />
        <HighlightedText style={styles.text}>{author}</HighlightedText>
      </View>
      <View style={styles.rowContainer}>
        <SubText fontSize={15} style={styles.text}>
          {score}
        </SubText>
        <SubText fontSize={12}>{timeRelative(date)}</SubText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { marginRight: 6, marginLeft: 6 },
});
