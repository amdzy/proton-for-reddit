import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Icon, SubText } from '@/components';
import { timeRelative } from '@/utils';
import { useSettingsStore } from '@/stores';
import { CommentFlairs } from '../CommentFlairs/CommentFlairs';
import { CommentScore } from '../CommentScore/CommentScore';
import { CommentAuthor } from '../CommentAuthor/CommentAuthor';
import { useTheme } from '@/hooks';

interface Props {
  author: string;
  avatar: string;
  score: number;
  date: number;
  flairType: string;
  flairText: string | null;
  flairRichText: Array<{ u: string }> | [];
  scoreHidden: boolean;
  voted: boolean | null;
  isSticked: boolean;
  isSubmitter: boolean;
  isLocked: boolean;
}

export function CommentHeader({
  author,
  avatar,
  score,
  date,
  flairType,
  flairText,
  flairRichText,
  scoreHidden,
  voted,
  isSticked,
  isSubmitter,
  isLocked,
}: Props) {
  const avatarVisible = useSettingsStore((state) => state.comments.avatar);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {avatarVisible && (
          <Avatar
            image={avatar}
            size={18}
            placeholder="user"
            style={styles.marginRight}
          />
        )}
        <CommentAuthor
          author={author}
          isSticked={isSticked}
          isSubmitter={isSubmitter}
        />
        <CommentFlairs
          type={flairType}
          text={flairText}
          richText={flairRichText}
        />
        {isLocked && (
          <Icon
            icon="lock"
            size={13}
            color={theme.highlight}
            style={styles.lock}
          />
        )}
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
  lock: { marginHorizontal: 6 },
});
