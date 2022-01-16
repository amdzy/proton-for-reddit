import React, { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Spacer } from '../Spacer/Spacer';
import { useTheme } from '@/hooks';
import { Icon } from '../Icon/Icon';
import { SubText } from '../Typography/SubText';

interface Props extends PressableProps {
  text: string;
  subText?: string;
  icon?: any;
  right?: ReactNode;
  left?: ReactNode;
}

export function ListItem({
  text,
  subText,
  icon,
  right,
  left,
  disabled,
  onPress,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      style={styles.button}
      android_ripple={{ color: theme.placeholder }}
      disabled={disabled}
      onPress={onPress}
      testID="listItem"
    >
      <View style={styles.leftContainer}>
        {icon && (
          <Icon icon={icon} size={24} color={theme.placeholder} testID="icon" />
        )}
        {left && left}
        <Spacer size={icon || left ? 35 : 58} horizontal />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: disabled ? theme.placeholder : theme.text,
              fontSize: 16,
            }}
          >
            {text}
          </Text>
          {subText && <SubText fontSize={15}>{subText}</SubText>}
        </View>
      </View>
      {right && right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
