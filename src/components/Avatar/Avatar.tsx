import React from 'react';
import { Image, ImageStyle, StyleSheet, View } from 'react-native';

interface Props {
  image: string | undefined;
  size: number;
  style?: ImageStyle;
  showPlaceholder?: boolean;
  placeholder?: 'user' | 'sub';
}

export function Avatar({
  image,
  size,
  style,
  showPlaceholder = true,
  placeholder = 'sub',
}: Props) {
  const newImage = image;
  const styles = makeStyle(size);

  if (!image && showPlaceholder && placeholder === 'sub') {
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

  if (!image && showPlaceholder && placeholder === 'user') {
    return (
      <Image
        source={{
          uri: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png',
        }}
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
