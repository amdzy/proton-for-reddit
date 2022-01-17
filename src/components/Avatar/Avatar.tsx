import React from 'react';
import { Image, ImageStyle, StyleSheet, View } from 'react-native';

interface Props {
  image: string | undefined;
  size: number;
  style?: ImageStyle;
  showPlaceholder?: boolean;
}

export function Avatar({ image, size, style, showPlaceholder = true }: Props) {
  const newImage = image;
  const styles = makeStyle(size);

  if (!image && showPlaceholder) {
    return (
      <Image
        // eslint-disable-next-line global-require
        source={require('@/assets/sub-icon.jpg')}
        width={size}
        height={size}
        style={[styles.avatar, style]}
        testID="avatar"
      />
    );
  }

  if (!image && !showPlaceholder) {
    return <View style={[styles.avatar, style]} testID="avatar" />;
  }

  return (
    <Image
      source={{ uri: newImage }}
      width={size}
      height={size}
      style={[styles.avatar, style]}
      testID="avatar"
    />
  );
}

const makeStyle = (size: number) =>
  StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  });
