import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { useSettingsStore } from "@/stores";
import React from "react";
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

  return (
    <ScrollView>
      <ListItem text="Default sort" subText="Hot" icon="text" />
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
    </ScrollView>
  );
};
