import React from 'react';
import { View } from 'react-native';
import { IconButton } from '@/components';
import { useTheme } from '@/hooks';

interface Props {
  isLiked: boolean | null;
  isSaved: boolean;
}

export function CommentActions({ isLiked, isSaved }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: theme.backdrop,
        padding: 9,
        justifyContent: 'flex-end',
      }}
    >
      {isLiked === true ? (
        <IconButton
          icon="arrow-up-thick"
          size={20}
          color={theme.upvote}
          style={{ paddingHorizontal: 14 }}
        />
      ) : (
        <IconButton
          icon="arrow-up-thick"
          size={20}
          style={{ paddingHorizontal: 14 }}
        />
      )}
      {isLiked === false ? (
        <IconButton
          icon="arrow-down-thick"
          size={20}
          color={theme.downvote}
          style={{ paddingHorizontal: 14 }}
        />
      ) : (
        <IconButton
          icon="arrow-down-thick"
          size={20}
          style={{ paddingHorizontal: 14 }}
        />
      )}
      {isSaved ? (
        <IconButton
          icon="bookmark"
          color="gold"
          size={20}
          style={{ paddingHorizontal: 14 }}
        />
      ) : (
        <IconButton
          icon="bookmark-outline"
          size={20}
          style={{ paddingHorizontal: 14 }}
        />
      )}
    </View>
  );
}
