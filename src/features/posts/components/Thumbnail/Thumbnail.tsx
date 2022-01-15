import React from 'react';
import {
  Image, Pressable, StyleSheet, View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface ThumbnailProps {
  url: string;
  onPress?: () => void;
}

export function Thumbnail({ url, onPress }: ThumbnailProps) {
  const theme = useTheme();
  return (
    <Pressable style={styles.container} onPress={onPress} testID="Thumbnail">
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.icon}>
        <FontAwesome name="external-link" size={7} color={theme.background} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    marginLeft: 16,
    borderRadius: 3,
    overflow: 'hidden',
    borderColor: 'blue',
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 4,
    backgroundColor: '#64ffda',
  },
});
