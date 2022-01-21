import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../Typography';
import { Icon } from '../Icon/Icon';

interface Props {
  onPress: () => void;
}

export function ErrorLoading({ onPress }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={onPress}>
        <Icon icon="information-outline" size={70} color="red" />
        <Text>Error loading</Text>
        <Text>Tap to retry</Text>
      </Pressable>
    </View>
  );
}
