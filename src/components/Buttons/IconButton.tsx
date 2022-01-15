import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { useTheme } from '@/hooks';
import { Icon } from '../Icon/Icon';

interface Props extends PressableProps {
  icon: string;
  color?: string;
  size?: number;
}

export function IconButton({
  icon,
  color,
  style,
  size = 24,
  onPress,
  disabled,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      android_ripple={{ color: theme.placeholder, borderless: true }}
      onPress={onPress}
      style={style}
      disabled={disabled}
      testID="iconButton"
    >
      <Icon icon={icon} color={color || theme.placeholder} size={size} />
    </Pressable>
  );
}
