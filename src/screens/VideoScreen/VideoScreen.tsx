import { useFetchVideo, Video } from "@/features/video";
import { useSettingsStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Video as ExpoVideo } from "expo-av";
import { Spinner } from "@/components";

export const VideoScreen = ({ route }: any) => {
  const { metaUrl, baseUrl, videoUrl } = route.params;
  const dataSaver = useSettingsStore((state) => state.dataSaver);
  const videoSettings = useSettingsStore((state) => state.videos);

  const { audioId, videoIds, isLoading } = useFetchVideo(metaUrl);

  return (
    <SafeAreaView style={styles.cotainer}>
      {videoUrl && (
        <ExpoVideo
          style={styles.video}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode="contain"
          isLooping={videoSettings.loop}
          isMuted={videoSettings.mute}
          shouldPlay={true}
        />
      )}
      {isLoading && <Spinner animating={isLoading} />}
      {!videoUrl && !isLoading && (
        <Video
          videoUrl={
            dataSaver
              ? `${baseUrl}/${videoIds[0].url}`
              : `${baseUrl}/${videoIds[videoIds.length - 1].url}`
          }
          audioUrl={audioId ? `${baseUrl}/${audioId}` : undefined}
          haveQualities={videoIds.length > 1}
          loop={videoSettings.loop}
          mute={videoSettings.mute}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "black",
  },
  video: { width: "100%", height: "100%" },
});
