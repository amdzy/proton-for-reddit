import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { PostImage } from '../PostImage/PostImage';

interface Props {
  url: string;
  width: number;
  height: number;
  onPress?: () => void;
}

export function YoutubeImage({
  url, width, height, onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <PostImage url={url} width={width} height={height} />
      <Text style={styles.text}>Youtube</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#e52d27',
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    borderRadius: 4,
  },
});
