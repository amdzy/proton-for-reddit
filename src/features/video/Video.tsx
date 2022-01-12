import React, { useEffect, useRef, useState } from "react";
import { Audio, Video as ExpoVideo } from "expo-av";
import { useSettingsStore } from "@/stores";
import { StyleSheet } from "react-native";

interface Props {
  videoUrl: string;
  audioUrl?: string;
}

export const Video = ({ videoUrl, audioUrl }: Props) => {
  const videoSettings = useSettingsStore((state) => state.videos);
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [sound, setSound] = useState(new Audio.Sound());

  useEffect(() => {
    if (audioUrl) {
      const loadSound = async () => {
        try {
          await sound.loadAsync({ uri: audioUrl });
          await sound.setIsLoopingAsync(videoSettings.loop);
          await sound.setIsMutedAsync(videoSettings.mute);
        } catch (err) {}

        loadSound();
      };
    }

    return () => {
      if (audioUrl) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const handleSound = async () => {
      try {
        if (status.isLoaded && status.isPlaying) {
          await sound.playAsync();
        }
        if (status.isLoaded && !status.isPlaying) {
          await sound.pauseAsync();
        }
        if (status.isLoaded) {
          await sound.setPositionAsync(status.positionMillis);
        }
      } catch (err) {}
    };
    if (audioUrl) {
      handleSound();
    }
  }, [status]);

  return (
    <ExpoVideo
      ref={video}
      style={styles.video}
      source={{
        uri: videoUrl,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping={videoSettings.loop}
      isMuted={!videoSettings.mute}
      shouldPlay={true}
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
};

const styles = StyleSheet.create({
  video: { width: "100%", height: "100%" },
});
