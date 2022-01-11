import { useSettingsStore } from "@/stores";
import { Video } from "expo-av";
import React, { useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const VideoScreen = ({ route }: any) => {
  const { videoUrl, imageUrl } = route.params;
  const videoSettings = useSettingsStore((state) => state.videos);
  const video = useRef(null);
  return (
    <SafeAreaView style={styles.cotainer}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={videoSettings.loop}
        isMuted={!videoSettings.mute}
        posterSource={{
          uri: imageUrl,
        }}
        shouldPlay={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cotainer: { width: "100%", height: "100%", flex: 1 },
  video: { width: "100%", height: "100%" },
});
