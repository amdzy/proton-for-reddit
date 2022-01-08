import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";

export const ImageCarousel = ({ images }: any) => {
  const width = Dimensions.get("screen").width;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 2,
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleViewedImageChange = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (info.viewableItems.length > 0) {
        setActiveIndex(info.viewableItems[0].index ?? 0);
      }
    },
    []
  );
  return (
    <View style={{ flex: 1, width }}>
      <FlatList
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={handleViewedImageChange}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        pagingEnabled
        keyExtractor={(item) => item.s.u}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, flex: 1 }}>
              <Image
                source={{
                  uri: item.s.u,
                }}
                style={{
                  flex: 1,
                  width,
                  height: undefined,
                  aspectRatio: item.s.x / item.s.y || 1,
                }}
                resizeMode="cover"
                fadeDuration={0}
              />
            </View>
          );
        }}
      />
      <Text style={styles.indicator}>
        {activeIndex + 1} / {images.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,.5)",
    color: "white",
    padding: 6,
    borderRadius: 13,
  },
});
