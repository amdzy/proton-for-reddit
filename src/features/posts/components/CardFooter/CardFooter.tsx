/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, SubText } from '@/components';
import { useSavePost, useUnSavePost, useVotePost } from '../../api';
import { useAuthStore, useToastStore } from '@/stores';
import { useTheme } from '@/hooks';

interface Props {
  numComments: number;
  numLikes: number;
  likes: boolean | null;
  postName: string;
  saved: boolean;
  openLink: () => void;
}

export function CardFooter({
  numComments,
  numLikes,
  likes,
  postName,
  saved,
  openLink,
}: Props) {
  const theme = useTheme();
  const voteMutation = useVotePost({});
  const saveMutation = useSavePost({});
  const unSaveMutation = useUnSavePost({});
  const [isLiked, setIsLiked] = useState(likes);
  const [isSaved, setIsSaved] = useState(saved);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);

  const handleActions = useCallback((type: string) => {
    if (!isAuthenticated) {
      addToast({
        text: 'Login First',
        type: 'error',
      });
      return;
    }
    switch (type) {
      case 'UPVOTE': {
        setIsLiked(true);
        voteMutation.mutate({ id: postName, dist: 1 });
        break;
      }
      case 'DOWNVOTE': {
        setIsLiked(false);
        voteMutation.mutate({ id: postName, dist: -1 });
        break;
      }
      case 'REMOVE_VOTE': {
        setIsLiked(null);
        voteMutation.mutate({ id: postName, dist: 0 });
        break;
      }
      case 'SAVE': {
        setIsSaved(true);
        saveMutation.mutate({ id: postName });
        break;
      }
      case 'UNSAVE': {
        setIsSaved(false);
        unSaveMutation.mutate({ id: postName });
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (voteMutation.isError) {
      setIsLiked(likes);
    }
    if (saveMutation.isError || unSaveMutation.isError) {
      setIsSaved(saved);
    }
  }, [voteMutation.isError, saveMutation.isError, unSaveMutation.isError]);

  return (
    <View style={styles.container}>
      <View style={styles.voteContainer}>
        {isLiked === true ? (
          <IconButton
            icon="arrow-up-thick"
            color={theme.upvote}
            onPress={() => handleActions('REMOVE_VOTE')}
          />
        ) : (
          <IconButton
            icon="arrow-up-thick"
            onPress={() => handleActions('UPVOTE')}
          />
        )}
        <SubText>{numLikes}</SubText>
        {isLiked === false ? (
          <IconButton
            icon="arrow-down-thick"
            color={theme.downvote}
            onPress={() => handleActions('REMOVE_VOTE')}
          />
        ) : (
          <IconButton
            icon="arrow-down-thick"
            onPress={() => handleActions('DOWNVOTE')}
          />
        )}
      </View>
      <View style={styles.commentContainer}>
        <IconButton icon="comment-outline" />
        <SubText>{numComments}</SubText>
      </View>
      {isSaved ? (
        <IconButton
          icon="bookmark"
          color="gold"
          onPress={() => handleActions('UNSAVE')}
        />
      ) : (
        <IconButton
          icon="bookmark-outline"
          onPress={() => handleActions('SAVE')}
        />
      )}
      <IconButton icon="logout-variant" onPress={openLink} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    flexWrap: 'nowrap',
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.4,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.3,
  },
});
