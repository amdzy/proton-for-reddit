import React, { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackStatus, Video as ExpoVideo } from "expo-av";
import { Pressable, StyleSheet, View } from "react-native";
import { VideoControls } from "./VideoControls";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Spinner } from "@/components";

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
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>();

  const loadSound = async () => {
    try {
      if (audioUrl && !soundStatus) {
        await sound.loadAsync(
          { uri: audioUrl },
          { isMuted: mute, isLooping: loop },
          false
        );
        sound.setOnPlaybackStatusUpdate(setSoundStatus);
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
      if (status.isLoaded && audioUrl && soundStatus?.isLoaded) {
        if (status.isPlaying && !soundStatus.isPlaying) {
          await sound.playAsync();
          return;
        }
        if (!status.isPlaying && soundStatus.isPlaying) {
          await sound.pauseAsync();
          return;
        }
        if (status.isBuffering && !status.isPlaying) {
          await sound.pauseAsync();
          return;
        }
      }
    };
    playSound();
  }, [status]);

  const handlePlay = async () => {
    if (!soundStatus?.isLoaded) {
      return;
    }
    await videoRef.current?.playAsync();
  };

  const handlePause = async () => {
    await Promise.all([
      audioUrl ? sound.pauseAsync() : null,
      videoRef.current?.pauseAsync(),
    ]);
  };

  const handleBackwards = async () => {
    await handlePause();
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
      audioUrl ? sound.pauseAsync() : null,
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
    await handlePause();
    await Promise.all([
      audioUrl ? sound.setPositionAsync(time) : null,
      videoRef.current.setPositionAsync(time),
    ]);
  };

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressScale = () => {
    if (scale.value === 1) {
      scale.value = withTiming(0, { duration: 300 });
    }
    if (scale.value === 0) {
      scale.value = withTiming(1, { duration: 300 });
    }
  };

  if (!status.isLoaded) {
    <Spinner animating={true} />;
  }

  return (
    <View style={styles.video}>
      <Pressable style={styles.video} onPress={onPressScale}>
        <ExpoVideo
          ref={videoRef}
          style={styles.video}
          source={{
            uri: videoUrl,
          }}
          resizeMode="contain"
          isLooping={loop}
          isMuted={mute}
          shouldPlay={audioUrl ? soundStatus?.isLoaded : true}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </Pressable>
      <VideoControls
        currentTime={status.positionMillis}
        duration={status.durationMillis}
        isMuted={status.isMuted}
        isPlaying={status.isPlaying}
        haveAudio={audioUrl !== undefined}
        showQualityCog={haveQualities}
        animatedStyle={animatedStyle}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleBackwards={handleBackwards}
        handleForwards={handleForwards}
        handleMute={handleMute}
        handleUnMute={handleUnMute}
        handleTimeChange={handleTimeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: { width: "100%", height: "100%", flex: 1 },
});
