import React, { useEffect, useRef, useState } from "react";
import { Audio, Video as ExpoVideo } from "expo-av";
import { StyleSheet, View } from "react-native";
import { VideoControls } from "./VideoControls";

interface Props {
  videoUrl: string;
  audioUrl?: string;
  loop: boolean;
  mute: boolean;
  haveQualities: boolean;
}

export const Video = ({
  videoUrl,
  audioUrl,
  loop,
  mute,
  haveQualities,
}: Props) => {
  const videoRef = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [sound, setSound] = useState(new Audio.Sound());
  const [soundLoaded, setSoundLoaded] = useState(false);

  const loadSound = async () => {
    try {
      if (audioUrl) {
        await sound.loadAsync(
          { uri: audioUrl },
          { isMuted: mute, isLooping: loop },
          false
        );
        setSoundLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unloadSound = async () => {
    try {
      if (audioUrl) {
        await sound.unloadAsync();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      unloadSound();
    };
  }, [audioUrl]);

  useEffect(() => {
    const playSound = async () => {
      if (status.isLoaded && audioUrl && soundLoaded && status.isPlaying) {
        if (status.isPlaying) {
          await sound.playAsync();
        }
        if (!status.isPlaying) {
          await sound.pauseAsync();
        }
      }
    };
    playSound();
  }, [status.isPlaying]);

  const handlePlay = async () => {
    await videoRef.current?.playAsync();
  };

  const handlePause = async () => {
    await Promise.all([
      audioUrl ? sound.pauseAsync() : null,
      videoRef.current?.pauseAsync(),
    ]);
  };

  const handleBackwards = async () => {
    const time =
      status.positionMillis - 5000 > 0 ? status.positionMillis - 5000 : 0;
    await Promise.all([
      audioUrl ? sound.setPositionAsync(time) : null,
      videoRef.current.setPositionAsync(time),
    ]);
  };

  const handleForwards = async () => {
    const time =
      status.positionMillis + 5000 > status.playableDurationMillis
        ? status.playableDurationMillis
        : status.positionMillis + 5000;
    await Promise.all([
      audioUrl ? sound.setPositionAsync(time) : null,
      videoRef.current.setPositionAsync(time),
    ]);
  };

  const handleMute = async () => {
    await Promise.all([
      audioUrl ? sound.setIsMutedAsync(true) : null,
      videoRef.current.setIsMutedAsync(true),
    ]);
  };

  const handleUnMute = async () => {
    await Promise.all([
      audioUrl ? sound.setIsMutedAsync(false) : null,
      videoRef.current.setIsMutedAsync(false),
    ]);
  };

  const handleTimeChange = async (time: number) => {
    await Promise.all([
      audioUrl ? sound.setPositionAsync(time) : null,
      videoRef.current.setPositionAsync(time),
    ]);
  };

  return (
    <View style={styles.video}>
      <ExpoVideo
        ref={videoRef}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        resizeMode="contain"
        isLooping={loop}
        isMuted={mute}
        shouldPlay={audioUrl ? soundLoaded : true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {status.isLoaded && (
        <VideoControls
          currentTime={status.positionMillis}
          duration={status.durationMillis}
          isMuted={status.isMuted}
          isPlaying={status.isPlaying}
          haveAudio={audioUrl !== undefined}
          showQualityCog={haveQualities}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleBackwards={handleBackwards}
          handleForwards={handleForwards}
          handleMute={handleMute}
          handleUnMute={handleUnMute}
          handleTimeChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: { width: "100%", height: "100%", flex: 1 },
});
