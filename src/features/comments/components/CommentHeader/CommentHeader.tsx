import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HighlightedText, SubText } from '@/components';
import { timeRelative } from '@/utils';
import { useSettingsStore } from '@/stores';
import { CommentFlairs } from '../CommentFlairs/CommentFlairs';
import { CommentScore } from '../CommentScore/CommentScore';

interface Props {
  author: string;
  score: number;
  date: number;
  flairType: string;
  flairText: string | null;
  flairRichText: Array<{ u: string }> | [];
  scoreHidden: boolean;
  voted: boolean | null;
}

export function CommentHeader({
  author,
  score,
  date,
  flairType,
  flairText,
  flairRichText,
  scoreHidden,
  voted,
}: Props) {
  const avatarVisible = useSettingsStore((state) => state.comments.avatar);
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {avatarVisible && (
          <Avatar
            image={undefined}
            size={18}
            placeholder="user"
            style={styles.marginRight}
          />
        )}
        <HighlightedText style={styles.marginRight}>{author}</HighlightedText>
        <CommentFlairs
          type={flairType}
          text={flairText}
          richText={flairRichText}
        />
      </View>
      <View style={styles.rowContainer}>
        <CommentScore score={score} scoreHidden={scoreHidden} voted={voted} />
        <SubText fontSize={12}>{timeRelative(date).slice(0, 3)}</SubText>
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
    padding: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: { marginRight: 6 },
});
