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
  const [url, setUrl] = useState("");

  const { audioId, videoIds, isLoading } = useFetchVideo(metaUrl);

  if (videoUrl) {
    return (
      <SafeAreaView style={styles.cotainer}>
        <ExpoVideo
          style={styles.video}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode="contain"
          isLooping={videoSettings.loop}
          isMuted={videoSettings.mute}
          shouldPlay={true}
        />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <Spinner animating={isLoading} />;
  }

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.cotainer}>
        <Video
          videoUrl={`${baseUrl}/${videoIds[0].url}`}
          audioUrl={audioId ? `${baseUrl}/${audioId}` : undefined}
          haveQualities={videoIds.length > 1}
          loop={videoSettings.loop}
          mute={videoSettings.mute}
        />
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  cotainer: { width: "100%", height: "100%", flex: 1 },
  video: { width: "100%", height: "100%" },
});
