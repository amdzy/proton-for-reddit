import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';

export function Indicator() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={theme.primary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
});
