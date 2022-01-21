import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../Icon/Icon';

export function ErrorFallback({ resetErrorBoundary }: any) {
  return (
    <View style={styles.container}>
      <Icon icon="information-outline" color="#64ffda" size={50} />
      <Text style={styles.header}>OOPS, something went wrong</Text>
      <Text style={styles.mainText}>
        the app ran into a problem and could not continue, we apologize for any
        inconvenience this has caused, press the button below to restart the
        app, this will reset your data, please contact us if this issue
        persists.
      </Text>
      <Pressable style={styles.button} onPress={resetErrorBoundary}>
        <Text style={styles.buttonText}>Reset the app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020c1b',
    justifyContent: 'center',
    padding: 10,
  },
  header: { color: '#64ffda', fontSize: 28, marginVertical: 8 },
  mainText: { color: '#e6f1ff', fontSize: 15, lineHeight: 20.5 },
  button: {
    backgroundColor: '#64ffda',
    borderRadius: 10,
    padding: 8,
    marginTop: 14,
  },
  buttonText: {
    color: '#020c1b',
    fontSize: 15,
    lineHeight: 20.5,
    textAlign: 'center',
  },
});
