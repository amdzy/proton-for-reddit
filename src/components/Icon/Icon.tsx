import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextStyle } from 'react-native';

interface Props {
  icon: any;
  color: string;
  size: number;
  style?: TextStyle;
  testID?: string;
}

export function Icon({ icon, color, size, testID, style }: Props) {
  return (
    <MaterialCommunityIcons
      name={icon}
      size={size}
      color={color}
      style={style}
      testID={testID || 'icon'}
    />
  );
}
