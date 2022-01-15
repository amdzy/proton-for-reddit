import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IconButton } from '@/components';
import { formatMillies } from '../utils';

interface Props {
  currentTime: number;
  duration: number;
  isMuted: boolean;
  isPlaying: boolean;
  haveAudio: boolean;
  showQualityCog: boolean;
  animatedStyle: any;
  handlePlay: () => void;
  handlePause: () => void;
  handleBackwards: () => void;
  handleForwards: () => void;
  handleMute: () => void;
  handleUnMute: () => void;
  handleTimeChange: (time: number) => void;
  openQualityModal: () => void;
}

export function VideoControls({
  currentTime,
  duration,
  isMuted,
  isPlaying,
  haveAudio,
  showQualityCog,
  animatedStyle,
  handlePlay,
  handlePause,
  handleBackwards,
  handleForwards,
  handleMute,
  handleUnMute,
  handleTimeChange,
  openQualityModal,
}: Props) {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.rowContainer,
          {
            justifyContent:
              haveAudio || showQualityCog ? 'space-between' : 'space-around',
          },
        ]}
      >
        <IconButton
          icon="skip-backward-outline"
          color="white"
          onPress={handleBackwards}
        />
        {!isPlaying ? (
          <IconButton icon="play" color="white" onPress={handlePlay} />
        ) : (
          <IconButton icon="pause" color="white" onPress={handlePause} />
        )}
        <IconButton
          icon="skip-forward-outline"
          color="white"
          onPress={handleForwards}
        />

        {!isMuted && haveAudio && (
          <IconButton icon="volume-high" color="white" onPress={handleMute} />
        )}
        {isMuted && haveAudio && (
          <IconButton icon="volume-off" color="white" onPress={handleUnMute} />
        )}
        {showQualityCog && (
          <IconButton icon="cogs" color="white" onPress={openQualityModal} />
        )}
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{formatMillies(currentTime)}</Text>
        <Slider
          style={styles.slider}
          value={currentTime}
          maximumValue={duration}
          minimumTrackTintColor="white"
          maximumTrackTintColor="grey"
          step={500}
          onSlidingComplete={handleTimeChange}
        />
        <Text style={styles.text}>{formatMillies(duration)}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  slider: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
});
