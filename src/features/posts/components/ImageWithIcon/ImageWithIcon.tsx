import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PostImage } from '../PostImage/PostImage';

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
    <View>
      <PostImage url={url} width={width} height={height} onPress={onPress} />
      <View style={styles.icon} pointerEvents="none">
        <MaterialCommunityIcons name={icon} size={45} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 30,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
