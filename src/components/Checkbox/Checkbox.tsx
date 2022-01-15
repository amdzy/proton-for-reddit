import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface Props {
  checked?: boolean;
  passThrough?: boolean;
  onValueChange?: () => void;
}

export function Checkbox({
  checked,
  passThrough = false,
  onValueChange,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      style={[
        styles.checkboxBase,
        {
          borderColor: checked ? theme.primary : theme.placeholder,
          backgroundColor: checked ? theme.accent : 'transparent',
        },
      ]}
      onPress={onValueChange}
      pointerEvents={passThrough ? 'none' : 'auto'}
      testID="checkbox"
    >
      {checked && (
        <MaterialCommunityIcons name="check" size={16} color={theme.text} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
  },
});
