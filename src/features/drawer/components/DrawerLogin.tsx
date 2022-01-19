import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from '@/components';
import { useTheme } from '@/hooks';
import { useAuthStore, useSubStore } from '@/stores';
import { axios } from '@/lib/axios';
import { useRedditAuth } from '@/features/auth';

export function DrawerLogin() {
  const theme = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearToken = useAuthStore((state) => state.logout);
  const clearSubs = useSubStore((state) => state.clearSubs);
  const { authenticateAsync } = useRedditAuth();

  const logout = async () => {
    await axios({
      method: 'POST',
      baseURL: 'https://www.reddit.com',
      url: '/api/v1/revoke_token',
      params: {
        token: refreshToken,
        token_type_hint: 'refresh_token',
      },
    });
    clearToken();
    clearSubs();
  };

  return (
    <View>
      {isAuthenticated ? (
        <DrawerItem
          label={() => <Text style={styles.text}>Logout</Text>}
          onPress={logout}
          icon={() => <Icon icon="block-helper" color={theme.placeholder} />}
        />
      ) : (
        <DrawerItem
          label={() => <Text style={styles.text}>Add an account</Text>}
          onPress={authenticateAsync}
          icon={() => <Icon icon="account-plus" color={theme.placeholder} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
