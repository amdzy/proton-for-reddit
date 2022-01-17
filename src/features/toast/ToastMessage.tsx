import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from '@/components';
import { useToastStore } from '@/stores';
import { useTheme } from '@/hooks';

interface Props {
  message: string;
  id: string;
  type: string;
}

export function ToastMessage({ message, id, type }: Props) {
  const dismissToast = useToastStore((state) => state.dismissToast);
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dismissToast(id);
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
        backgroundColor: theme.backdrop,
        ...styles.container,
      }}
    >
      <View
        style={{
          backgroundColor: type === 'error' ? theme.error : theme.highlight,
          ...styles.leftBox,
        }}
      />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  leftBox: {
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});
