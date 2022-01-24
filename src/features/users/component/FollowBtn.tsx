import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { HighlightedText, Icon, Spacer, Text } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { useAuthStore, useToastStore } from '@/stores';
import { useFollowUser } from '../api';

interface Props {
  following: boolean;
  name: string;
  id: string;
}

export function FollowBtn({ following, name, id }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);
  const followMutation = useFollowUser({ name });

  const handleActions = (action: 'SUB' | 'UNSUB') => {
    if (!isAuthenticated) {
      addToast({
        text: 'Login First',
        type: 'error',
      });
      return;
    }
    if (action === 'SUB') {
      followMutation.mutate({ id, action: 'sub' });
    }
    if (action === 'UNSUB') {
      followMutation.mutate({ id, action: 'unsub' });
    }
  };

  return following ? (
    <Pressable style={styles.button} onPress={() => handleActions('UNSUB')}>
      <Icon icon="check-circle" size={16} color={theme.primary} />
      <Spacer horizontal size={8} />
      <HighlightedText>Unfollow</HighlightedText>
    </Pressable>
  ) : (
    <Pressable style={styles.button} onPress={() => handleActions('SUB')}>
      <Icon icon="plus-circle" size={16} color={theme.placeholder} />
      <Spacer horizontal size={8} />
      <Text>Follow</Text>
    </Pressable>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 6,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: theme.placeholder,
      marginTop: 12,
    },
  });
