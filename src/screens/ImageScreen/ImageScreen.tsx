import React from 'react';
import { StyleSheet, View } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export function ImageScreen({ route, navigation }: any) {
  const { images } = route.params;
  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        saveToLocalByLongPress={false}
        enablePreload
        style={styles.viewer}
        useNativeDriver
        enableSwipeDown
        swipeDownThreshold={100}
        onSwipeDown={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  viewer: { flex: 1, width: '100%' },
});
