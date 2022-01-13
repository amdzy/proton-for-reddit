import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { SortModal } from "@/features/sort";
import { useModal } from "@/hooks";
import { useSettingsStore } from "@/stores";
import React from "react";
import { ScrollView } from "react-native";
import { awards, flairs, markRead, postInfo } from "./postSettingsData";

export const PostSettingScreen = () => {
  const postSettings = useSettingsStore((state) => state.posts);
  const { isModalOpen, openModal, closeModal } = useModal();
  const setPostSettings = useSettingsStore((state) => state.setPostSettings);

  return (
    <ScrollView>
      <ListItem
        text="Default sort"
        subText={postSettings.sort}
        icon="text"
        onPress={openModal}
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
      <SortModal visible={isModalOpen} onClose={closeModal} post />
    </ScrollView>
  );
};
