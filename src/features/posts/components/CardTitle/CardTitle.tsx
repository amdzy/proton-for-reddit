import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Header, SubText } from '@/components';
import { Thumbnail } from '../Thumbnail/Thumbnail';

interface Props {
  title: string;
  thumbnail: string;
  showThumbnail: boolean;
  domain: string;
  showDomain: boolean;
  sticky: boolean;
  onPressThumbnail: () => void;
}

export function CardTitle({
  title,
  thumbnail,
  showThumbnail,
  domain,
  showDomain,
  sticky,
  onPressThumbnail,
}: Props) {
  return (
    <View style={styles.container} testID="CardTitle">
      <View style={styles.textContainer}>
        <Header highlighted={sticky}>{title}</Header>
        {showDomain && (
          <Pressable onPress={onPressThumbnail}>
            <SubText>{domain}</SubText>
          </Pressable>
        )}
      </View>
      {showThumbnail && (
        <Thumbnail url={thumbnail} onPress={onPressThumbnail} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
});
