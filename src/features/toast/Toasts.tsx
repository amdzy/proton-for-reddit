import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ToastMessage } from './ToastMessage';
import { useToastStore } from '@/stores';

export function Toasts() {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <View style={style.container}>
      {toasts.map((toast) => (
        <ToastMessage
          message={toast.text}
          id={toast.id}
          type={toast.type}
          key={toast.id}
        />
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: { position: 'absolute', left: 0, right: 0, bottom: 55 },
});
