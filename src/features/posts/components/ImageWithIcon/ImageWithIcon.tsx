import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PostImage } from '../PostImage/PostImage';
import { Icon } from '@/components';

interface Props {
  url: string;
  width: number;
  height: number;
  icon?: 'play-circle-outline' | 'image-multiple-outline';
  onPress: () => void;
}

export function ImageWithIcon({
  url,
  width,
  height,
  icon = 'play-circle-outline',
  onPress,
}: Props) {
  return (
    <View testID="ImageWithIcon">
      <PostImage url={url} width={width} height={height} onPress={onPress} />
      <View style={styles.icon} pointerEvents="none">
        <Icon icon={icon} size={35} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 30,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
