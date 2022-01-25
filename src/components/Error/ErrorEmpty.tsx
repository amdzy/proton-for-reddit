import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/hooks';
import { Button } from '../Buttons';
import { Icon } from '../Icon/Icon';
import { Text } from '../Typography';
import { Spacer } from '../Spacer/Spacer';

interface Props {
  onPress: () => void;
}

export function ErrorEmpty({ onPress }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}
    >
      <Icon icon="telescope" size={24} color="white" />
      <Spacer size={8} />
      <Text>There seems to be nothing here</Text>
      <Spacer size={8} />
      <Button
        text="Refresh"
        textStyle={{ color: theme.primary }}
        onPress={onPress}
      />
    </View>
  );
}
