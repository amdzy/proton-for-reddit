import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';

interface Props {
  checked?: boolean;
  passThrough?: boolean;
  onValueChange?: () => void;
}

export function RadioButton({
  checked,
  passThrough = false,
  onValueChange,
}: Props) {
  const theme = useTheme();
  const styles = makeStyle(theme, checked);
  return (
    <Pressable
      style={styles.checkboxBase}
      onPress={onValueChange}
      pointerEvents={passThrough ? 'none' : 'auto'}
      testID="radiobutton"
    />
  );
}

const makeStyle = (theme: ColorsDTO, checked?: boolean) =>
  StyleSheet.create({
    checkboxBase: {
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: checked ? theme.primary : theme.placeholder,
      backgroundColor: checked ? theme.primary : 'transparent',
    },
  });
