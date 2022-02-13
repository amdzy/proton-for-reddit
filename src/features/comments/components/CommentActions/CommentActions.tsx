/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { useAuthStore, useToastStore } from '@/stores';
import { useVoteComment } from '../../api';

interface Props {
  isLiked: boolean | null;
  isSaved: boolean;
  id: string;
  onVote: (value: boolean | null) => void;
}

export function CommentActions({ isLiked, isSaved, id, onVote }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);
  const voteMutation = useVoteComment({});

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
        onVote(true);
        voteMutation.mutate({ id, dist: 1 });
        break;
      }
      case 'DOWNVOTE': {
        onVote(false);
        voteMutation.mutate({ id, dist: -1 });
        break;
      }
      case 'REMOVE_VOTE': {
        onVote(null);
        voteMutation.mutate({ id, dist: 0 });
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      {isLiked === true ? (
        <IconButton
          icon="arrow-up-thick"
          size={20}
          color={theme.upvote}
          style={styles.icon}
          onPress={() => handleActions('REMOVE_VOTE')}
        />
      ) : (
        <IconButton
          icon="arrow-up-thick"
          size={20}
          style={styles.icon}
          onPress={() => handleActions('UPVOTE')}
        />
      )}
      {isLiked === false ? (
        <IconButton
          icon="arrow-down-thick"
          size={20}
          color={theme.downvote}
          style={styles.icon}
          onPress={() => handleActions('REMOVE_VOTE')}
        />
      ) : (
        <IconButton
          icon="arrow-down-thick"
          size={20}
          style={styles.icon}
          onPress={() => handleActions('DOWNVOTE')}
        />
      )}
      {isSaved ? (
        <IconButton
          icon="bookmark"
          color="gold"
          size={20}
          style={styles.icon}
        />
      ) : (
        <IconButton icon="bookmark-outline" size={20} style={styles.icon} />
      )}
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: theme.backdrop,
      padding: 9,
      justifyContent: 'flex-end',
    },
    icon: { paddingHorizontal: 14 },
  });
