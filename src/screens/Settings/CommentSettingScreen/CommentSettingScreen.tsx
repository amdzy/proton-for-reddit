import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import React from "react";
import { ScrollView } from "react-native";

export const CommentSettingScreen = () => {
  return (
    <ScrollView>
      <ListItem text="Default sort" subText="Hot" icon="text" />
      <Divider />
      <SettingsHeader text="Appearance" />
      <ListItem text="Show user avatar" right={<Checkbox />} />
      <ListItem text="Buttons always visible" right={<Checkbox />} />
      <ListItem text="Highlight my username" right={<Checkbox />} />
      <Divider />
      <SettingsHeader text="Awards" />
      <ListItem text="Show awards" right={<Checkbox />} />
      <ListItem text="Clickable awards" right={<Checkbox />} />
      <Divider />
      <SettingsHeader text="Flairs" />
      <ListItem text="Show user flairs" right={<Checkbox />} />
      <ListItem text="Show flair colors" right={<Checkbox />} />
    </ScrollView>
  );
};
