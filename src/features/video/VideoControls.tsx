import { IconButton } from "@/components";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface Props {
  currentTime: number;
  duration: number;
  isMuted: boolean;
  isPlaying: boolean;
  haveAudio: boolean;
  showQualityCog: boolean;
  handlePlay: () => void;
  handlePause: () => void;
  handleBackwards: () => void;
  handleForwards: () => void;
  handleMute: () => void;
  handleUnMute: () => void;
  handleTimeChange: (time: number) => void;
}

export const VideoControls = ({
  currentTime,
  duration,
  isMuted,
  isPlaying,
  haveAudio,
  showQualityCog,
  handlePlay,
  handlePause,
  handleBackwards,
  handleForwards,
  handleMute,
  handleUnMute,
  handleTimeChange,
}: Props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        flex: 1,
        paddingHorizontal: 10,
        zIndex: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          flex: 1,
          justifyContent:
            haveAudio || showQualityCog ? "space-between" : "space-around",
        }}
      >
        <IconButton
          icon="skip-backward-outline"
          color="white"
          onPress={handleBackwards}
        />
        {!isPlaying && (
          <IconButton icon="play" color="white" onPress={handlePlay} />
        )}
        {isPlaying && (
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
        {showQualityCog && <IconButton icon="cogs" color="white" />}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          flex: 1,
        }}
      >
        <Text style={{ color: "white" }}>{currentTime}</Text>
        <Slider
          style={{ flex: 1 }}
          value={currentTime}
          maximumValue={duration}
          minimumTrackTintColor="white"
          maximumTrackTintColor="grey"
          step={500}
          onSlidingComplete={handleTimeChange}
        />
        <Text style={{ color: "white" }}>{duration}</Text>
      </View>
    </View>
  );
};
