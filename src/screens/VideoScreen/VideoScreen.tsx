import { useFetchVideo, Video } from "@/features/video";
import { useSettingsStore } from "@/stores";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const VideoScreen = ({ route }: any) => {
  const { metaUrl, imageUrl, baseUrl, videoUrl } = route.params;
  const dataSaver = useSettingsStore((state) => state.dataSaver);

  const { audioId, videoIds } = useFetchVideo(metaUrl);

  // test this line
  if ((!audioId || videoIds.length === 0) && !videoUrl) {
    return null;
  }
  let vUrl = `${baseUrl}/${videoIds[videoIds.length - 1].url}`;
  if (dataSaver) {
    vUrl = `${baseUrl}/${videoIds[0].url}`;
  }
  return (
    <SafeAreaView style={styles.cotainer}>
      {videoUrl ? (
        <Video videoUrl={videoUrl} />
      ) : (
        <Video videoUrl={vUrl} audioUrl={`${baseUrl}/${audioId}`} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cotainer: { width: "100%", height: "100%", flex: 1 },
});
