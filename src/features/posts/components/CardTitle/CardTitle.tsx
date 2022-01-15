import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, SubText } from '@/components';
import { Thumbnail } from '../Thumbnail/Thumbnail';

interface Props {
  title: string;
  thumbnail: string;
  showThumbnail: boolean;
  domain: string;
  showDomain: boolean;
  onPressThumbnail: () => void;
}

export function CardTitle({
  title,
  thumbnail,
  showThumbnail,
  domain,
  showDomain,
  onPressThumbnail,
}: Props) {
  return (
    <View style={styles.container} testID="CardTitle">
      <View style={styles.textContainer}>
        <Header>{title}</Header>
        {showDomain && <SubText>{domain}</SubText>}
      </View>
      {showThumbnail && (
        <Thumbnail url={thumbnail} onPress={onPressThumbnail} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
