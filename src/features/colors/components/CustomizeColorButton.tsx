import React, { useMemo } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Spacer } from '@/components';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';

interface Props extends PressableProps {
  text: string;
  color: string;
}

export function CustomizeColorButton({
  text,
  color,
  disabled,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme, color), [theme, color]);

  return (
    <Pressable
      style={styles.button}
      android_ripple={styles.ripple}
      testID="CustomizeColorButton"
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.previewCircle} testID="previewCircle" />
      <Spacer size={24} horizontal />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const makeStyles = (theme: ColorsDTO, color: string) =>
  StyleSheet.create({
    button: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    previewCircle: {
      width: 24,
      height: 24,
      backgroundColor: color,
      borderRadius: 12,
    },
    text: {
      color: theme.text,
      fontSize: 16,
      textTransform: 'capitalize',
    },
    ripple: {
      color: theme.placeholder,
    },
  });
