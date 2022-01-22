import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { IconButton } from '@/components';
import { useSubscription } from '../api';
import { useTheme } from '@/hooks';
import { useAuthStore, useToastStore } from '@/stores';

interface Props {
  id: string;
  subscribed: boolean;
  name: string;
  icon: string;
  size?: number;
  style?: ViewStyle;
}

export function SubscriptionBtn({
  id,
  subscribed,
  name,
  icon,
  size = 18,
  style,
}: Props) {
  const [isSubscribed, setIsSubscribed] = useState(subscribed);
  const subscribeMutation = useSubscription({ name, icon });
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);
  const theme = useTheme();

  const handleActions = (action: 'SUB' | 'UNSUB') => {
    if (!isAuthenticated) {
      addToast({
        text: 'Login First',
        type: 'error',
      });
      return;
    }
    if (action === 'SUB') {
      setIsSubscribed(true);
      subscribeMutation.mutate({ id, action: 'sub' });
    }
    if (action === 'UNSUB') {
      setIsSubscribed(false);
      subscribeMutation.mutate({ id, action: 'unsub' });
    }
  };

  useEffect(() => {
    if (subscribeMutation.isError) {
      setIsSubscribed(subscribed);
    }
  }, [subscribeMutation.isError]);

  return isSubscribed ? (
    <IconButton
      icon="check-circle"
      size={size}
      color={theme.primary}
      style={style}
      onPress={() => {
        handleActions('UNSUB');
      }}
    />
  ) : (
    <IconButton
      icon="plus-circle"
      size={size}
      style={style}
      onPress={() => {
        handleActions('SUB');
      }}
    />
  );
}
