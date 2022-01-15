import React, { useEffect, useRef, useState } from 'react';
import { Audio, AVPlaybackStatus, Video as ExpoVideo } from 'expo-av';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Spinner } from '@/components';
import { useModal } from '@/hooks';
import { VideoControls, VideoQualityModal } from './components';

interface Props {
  videoUrl: string;
  audioUrl?: string;
  loop: boolean;
  mute: boolean;
  qualities: Array<{ quality: string; url: string }>;
  baseUrl: string;
}

export function Video({
  videoUrl,
  audioUrl,
  loop,
  mute,
  qualities,
  baseUrl,
}: Props) {
  const [url, setUrl] = useState(videoUrl);
  const videoRef = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [sound] = useState(new Audio.Sound());
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const loadVideo = async () => {
    try {
      await videoRef.current.loadAsync(
        { uri: url },
        { isMuted: mute, isLooping: loop },
        false
      );
    } catch (err) {
      console.log(err);
    }
  };

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
    if (!status.isLoaded && soundStatus?.isLoaded) {
      await sound.pauseAsync();
    }
  };

  useEffect(() => {
    loadVideo();
    loadSound();
    return () => {
      unloadSound();
    };
  }, []);

  useEffect(() => {
    playSound();
  }, [status]);

  const handlePlay = async () => {
    if (audioUrl && !soundStatus?.isLoaded) {
      return;
    }
    await videoRef.current?.playAsync();
  };

  const handlePause = async () => {
    await Promise.all([
      videoRef.current?.pauseAsync(),
      audioUrl ? sound.pauseAsync() : null,
    ]);
  };

  const handleBackwards = async () => {
    const time =
      status.positionMillis - 5000 > 0 ? status.positionMillis - 5000 : 0;
    await Promise.all([
      videoRef.current.setPositionAsync(time),
      audioUrl ? sound.setPositionAsync(time) : null,
    ]);
  };

  const handleForwards = async () => {
    const time =
      status.positionMillis + 5000 > status.playableDurationMillis
        ? status.playableDurationMillis
        : status.positionMillis + 5000;
    await Promise.all([
      videoRef.current.setPositionAsync(time),
      audioUrl ? sound.setPositionAsync(time) : null,
    ]);
  };

  const handleTimeChange = async (time: number) => {
    await Promise.all([
      videoRef.current.setPositionAsync(time),
      audioUrl ? sound.setPositionAsync(time) : null,
    ]);
  };
  const handleMute = async () => {
    await Promise.all([
      videoRef.current.setIsMutedAsync(true),
      audioUrl ? sound.setIsMutedAsync(true) : null,
    ]);
  };

  const handleUnMute = async () => {
    await Promise.all([
      videoRef.current.setIsMutedAsync(false),
      audioUrl ? sound.setIsMutedAsync(false) : null,
    ]);
  };

  const onPressScale = () => {
    if (scale.value === 1) {
      scale.value = withTiming(0, { duration: 300 });
    }
    if (scale.value === 0) {
      scale.value = withTiming(1, { duration: 300 });
    }
  };

  const changeVideoQuality = async (newUrl: string) => {
    try {
      if (audioUrl && soundStatus?.isLoaded) {
        await sound.stopAsync();
      }
      closeModal();
      await videoRef.current.unloadAsync();
      await videoRef.current.loadAsync(
        { uri: `${baseUrl}/${newUrl}` },
        { shouldPlay: true, isMuted: mute, isLooping: loop },
        false
      );
      setUrl(`${baseUrl}/${newUrl}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!status.isLoaded) {
    <Spinner animating />;
  }

  return (
    <>
      <View style={styles.video}>
        <Pressable style={styles.video} onPress={onPressScale}>
          <ExpoVideo
            ref={videoRef}
            style={styles.video}
            resizeMode="contain"
            isLooping={loop}
            isMuted={mute}
            shouldPlay={audioUrl ? soundStatus?.isLoaded : true}
            onPlaybackStatusUpdate={setStatus}
          />
        </Pressable>
        <VideoControls
          currentTime={status.positionMillis}
          duration={status.durationMillis}
          isMuted={status.isMuted}
          isPlaying={status.isPlaying}
          haveAudio={audioUrl !== undefined}
          showQualityCog={qualities.length > 0}
          animatedStyle={animatedStyle}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleBackwards={handleBackwards}
          handleForwards={handleForwards}
          handleMute={handleMute}
          handleUnMute={handleUnMute}
          handleTimeChange={handleTimeChange}
          openQualityModal={openModal}
        />
        {!status.isLoaded && <Spinner animating />}
      </View>
      <VideoQualityModal
        visible={isModalOpen}
        onClose={closeModal}
        qualities={qualities}
        url={url}
        onPress={changeVideoQuality}
      />
    </>
  );
}

const styles = StyleSheet.create({
  video: { width: '100%', height: '100%', flex: 1 },
});
