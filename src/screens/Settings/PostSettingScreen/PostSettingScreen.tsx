import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { SortModal } from "@/features/sort";
import { useSettingsStore } from "@/stores";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  awards,
  flairs,
  markRead,
  postInfo,
  visibleButtons,
} from "./postSettingsData";

export const PostSettingScreen = () => {
  const postSettings = useSettingsStore((state) => state.posts);
  const setPostSettings = useSettingsStore((state) => state.setPostSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ScrollView>
      <ListItem
        text="Default sort"
        subText={postSettings.sort}
        icon="text"
        onPress={() => setIsModalOpen(true)}
      />
      <Divider />
      <SettingsHeader text="Post Info" />
      {postInfo.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            onPress={() => setPostSettings(x.type)}
            right={<Checkbox checked={postSettings[x.type]} passThrough />}
          />
        );
      })}
      <Divider />
      <SettingsHeader text="Awards" />
      {awards.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            onPress={() => setPostSettings(x.type)}
            right={<Checkbox checked={postSettings[x.type]} passThrough />}
          />
        );
      })}
      <Divider />
      <SettingsHeader text="Flairs" />
      {flairs.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            onPress={() => setPostSettings(x.type)}
            right={<Checkbox checked={postSettings[x.type]} passThrough />}
          />
        );
      })}
      <Divider />
      <SettingsHeader text="Visible buttons" />
      {visibleButtons.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            icon={x.icon}
            onPress={() => setPostSettings(x.type)}
            right={
              <Checkbox checked={postSettings.buttons[x.type]} passThrough />
            }
          />
        );
      })}
      <Divider />
      <SettingsHeader text="Mark as read" />
      {markRead.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            subText={x.subText}
            onPress={() => setPostSettings(x.type)}
            right={<Checkbox checked={postSettings[x.type]} passThrough />}
          />
        );
      })}
      <SortModal visible={isModalOpen} onClose={handleCloseModal} post />
    </ScrollView>
  );
};
