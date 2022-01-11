import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import { PostImage } from "../PostImage/PostImage";

export const ImageCarousel = ({ images }: any) => {
  const width = useWindowDimensions().width;

  const styles = useMemo(
    () => makeStyles(width, images[0].x, images[0].y),
    [width]
  );

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
    <View style={styles.container}>
      <FlatList
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={handleViewedImageChange}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        pagingEnabled
        keyExtractor={(item) => item.u}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <PostImage
                url={item.u}
                width={images[0].x}
                height={images[0].y}
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

const makeStyles = (width: number, imageWidth: number, imageHeight: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width,
      height: undefined,
      aspectRatio: imageWidth / imageHeight || 1,
    },
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
