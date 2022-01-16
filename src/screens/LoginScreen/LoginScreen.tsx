import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/components';
import { useRedditAuth } from '@/hooks';

export function LoginScreen({ navigation }: any) {
  const { authRequest, isAuthenticated, authenticateAsync } = useRedditAuth();

  if (isAuthenticated) {
    navigation.navigate('Main');
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>
        Looks like you haven&apost logged in yet
      </Text>
      <Button
        disabled={!authRequest}
        text="Login"
        onPress={() => {
          authenticateAsync();
        }}
        style={{ width: '100%', alignItems: 'center', padding: 20 }}
      />
    </View>
  );
}
