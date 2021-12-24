import { Checkbox, Divider, ListItem, SettingsHeader } from "@/components";
import { useSettingsStore } from "@/stores";
import React from "react";
import { ScrollView } from "react-native";

export const ViewSettingScreen = () => {
  const cardSettings = useSettingsStore((state) => state.card);
  return (
    <ScrollView>
      <ListItem text="Default View" subText="Cards" />
      <Divider />
      <SettingsHeader text="Cards" />
      <ListItem
        text="Full height"
        subText={
          cardSettings.fullHeight
            ? "Enabled: Don't crop preview images"
            : "Disabled: Crop preview images"
        }
        right={<Checkbox checked={cardSettings.fullHeight} />}
      />
      <ListItem
        text="Show subreddit icon"
        right={<Checkbox checked={cardSettings.subIcon} />}
      />
      <ListItem
        text="Carousel for multiple image previews"
        right={<Checkbox checked={cardSettings.subIcon} />}
      />
      <ListItem
        text="Preview text from text posts"
        right={<Checkbox checked={cardSettings.previewText} />}
      />
    </ScrollView>
  );
};
