import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { SortModal } from "@/features/sort";
import { useSettingsStore } from "@/stores";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { appearance, awards, flairs } from "./commentSettingsData";

export const CommentSettingScreen = () => {
  const commentSettings = useSettingsStore((state) => state.comments);
  const setCommentSettings = useSettingsStore(
    (state) => state.setCommentSettings
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ScrollView>
      <ListItem
        text="Default sort"
        subText={commentSettings.sort}
        icon="text"
        onPress={() => setIsModalOpen(true)}
      />
      <Divider />
      <SettingsHeader text="Appearance" />
      {appearance.map((x) => {
        return (
          <ListItem
            key={x.type}
            text={x.text}
            onPress={() => setCommentSettings(x.type)}
            right={<Checkbox checked={commentSettings[x.type]} passThrough />}
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
            onPress={() => setCommentSettings(x.type)}
            right={<Checkbox checked={commentSettings[x.type]} passThrough />}
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
            onPress={() => setCommentSettings(x.type)}
            right={<Checkbox checked={commentSettings[x.type]} passThrough />}
          />
        );
      })}
      <SortModal visible={isModalOpen} onClose={handleCloseModal} comment />
    </ScrollView>
  );
};
