import React, { ReactNode } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function CustomModal({ visible, onClose, children }: Props) {
  const theme = useTheme();
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      testID="modal"
    >
      <View style={styles.container}>
        <View style={[styles.modalView, { backgroundColor: theme.surface }]}>
          {children}
        </View>
        <Pressable
          style={styles.backgroundCover}
          onPress={onClose}
          testID="closeModal"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    maxWidth: 400,
    margin: 20,
    borderRadius: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
    zIndex: 2,
  },
  backgroundCover: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
  },
});
