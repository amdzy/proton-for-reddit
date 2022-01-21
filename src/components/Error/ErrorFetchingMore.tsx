import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Button } from '../Buttons';
import { Text } from '../Typography';

interface Props {
  disabled: boolean;
  onPress: () => void;
}

export function ErrorFetchingMore({ disabled, onPress }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>An error happend</Text>
      <Button
        text="Retry"
        style={{ backgroundColor: theme.backdrop, borderRadius: 6 }}
        onPress={onPress}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
});
