import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HighlightedText, Icon, SubText } from '@/components';
import { timeRelative } from '@/utils';
import { useSettingsStore } from '@/stores';
import { CommentFlairs } from '../CommentFlairs/CommentFlairs';
import { useTheme } from '@/hooks';

interface Props {
  author: string;
  score: number;
  date: number;
  flairType: string;
  flairText: string | null;
  flairRichText: Array<{ u: string }> | [];
  scoreHidden: boolean;
}

export function CommentHeader({
  author,
  score,
  date,
  flairType,
  flairText,
  flairRichText,
  scoreHidden,
}: Props) {
  const avatarVisible = useSettingsStore((state) => state.comments.avatar);
  const theme = useTheme();
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
  text: { marginRight: 6, marginLeft: 6 },
  marginRight: { marginRight: 6 },
});
