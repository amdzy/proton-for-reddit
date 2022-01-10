import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";

export const VideoScreen = ({ route }: any) => {
  const { videoUrl, imageUrl } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <SafeAreaView style={{ width: "100%", height: "100%", flex: 1 }}>
      <Video
        ref={video}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        posterSource={{
          uri: imageUrl,
        }}
      />
    </SafeAreaView>
  );
};
