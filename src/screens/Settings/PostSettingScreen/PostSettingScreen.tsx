import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { useSettingsStore } from "@/stores";
import React from "react";
import { ScrollView } from "react-native";

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

const postInfo = [
  {
    text: "Show author",
    type: "author",
  },
  {
    text: "Tap subreddit to visit",
    type: "tapSub",
  },
  {
    text: "Tap username to view profile",
    type: "tapUser",
  },
] as const;

const awards = [
  {
    text: "Show awards",
    type: "awards",
  },
  {
    text: "Clickable awards",
    type: "tapAwards",
  },
] as const;

const flairs = [
  {
    text: "Show post flairs",
    type: "flairs",
  },
  {
    text: "Show flair colors",
    type: "flairsColor",
  },
] as const;

const visibleButtons = [
  {
    text: "Mark as read",
    type: "read",
    icon: "check",
  },
  {
    text: "Share",
    type: "share",
    icon: "share-variant",
  },
  {
    text: "Comments",
    type: "comments",
    icon: "comment-outline",
  },
  {
    text: "Favourite",
    type: "favourite",
    icon: "star",
  },
] as const;

const markRead = [
  {
    text: "Mark as read",
    subText: "Clicking on a post will mark as read",
    type: "markRead",
  },
  {
    text: "Hide read",
    subText: 'Pressing "Hide read" will hide posts',
    type: "hideRead",
  },
  {
    text: "Dim images in read posts",
    subText: "Post images will be dimmed when marked as read",
    type: "dimImage",
  },
] as const;
