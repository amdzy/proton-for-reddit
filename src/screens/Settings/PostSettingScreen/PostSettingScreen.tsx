import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import React from "react";
import { ScrollView } from "react-native";

export const PostSettingScreen = () => {
  return (
    <ScrollView>
      <ListItem text="Default sort" subText="Hot" icon="text" />
      <Divider />
      <SettingsHeader text="Post Info" />
      <ListItem text="Show author" right={<Checkbox />} />
      <ListItem text="Tap subreddit to visit" right={<Checkbox />} />
      <ListItem text="Tap username to view profile" right={<Checkbox />} />
      <SettingsHeader text="Awards" />
      <ListItem text="Show awards" right={<Checkbox />} />
      <ListItem text="Clickable awards" right={<Checkbox />} />
      <SettingsHeader text="Flairs" />
      <ListItem text="Show post flairs" right={<Checkbox />} />
      <ListItem text="Show flair colors" right={<Checkbox />} />
      <SettingsHeader text="Visible buttons" />
      <ListItem text="Mark as read" right={<Checkbox />} />
      <ListItem text="Share" right={<Checkbox />} />
      <ListItem text="Comments" right={<Checkbox />} />
      <SettingsHeader text="Mark as read" />
      <ListItem
        text="Mark as read"
        subText="Clicking on a post will mark as read"
        right={<Checkbox />}
      />
      <ListItem
        text="Hide read"
        subText='Pressing "Hide read" will hide posts'
        right={<Checkbox />}
      />
      <ListItem
        text="Dim images in read posts"
        subText="Post images will be dimmed when marked as read"
        right={<Checkbox />}
      />
    </ScrollView>
  );
};
