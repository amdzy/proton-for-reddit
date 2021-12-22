import { Checkbox, ListItem, SettingsHeader } from "@/components";
import { useTheme } from "@/hooks";
import { useFilterStore } from "@/stores";
import React from "react";
import { ScrollView } from "react-native";

export const FilterScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const filters = useFilterStore((state) => state.posts);
  const setFilter = useFilterStore((state) => state.setPostsFilter);

  console.log(filters);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="Filter by" />
      <ListItem
        text="Subreddits"
        subText="Hide posts from these subreddits"
        icon="reddit"
        onPress={() => {}}
      />
      <ListItem
        text="Users"
        subText="Hide posts from these users"
        icon="account-off"
        onPress={() => {}}
      />
      <ListItem
        text="Keywords"
        subText="Hide posts containing keywords in title"
        icon="text-search"
        onPress={() => {}}
      />
      <ListItem
        text="Flairs"
        subText="Hide posts with these flairs"
        icon="tag-text-outline"
        onPress={() => {}}
      />
      <SettingsHeader text="Show Posts with" />
      {postFilters.map((item) => {
        return (
          <ListItem
            text={item.text}
            onPress={() => setFilter(item.type)}
            right={
              <Checkbox
                checked={filters[item.type]}
                onValueChange={() => setFilter(item.type)}
              />
            }
            key={item.type}
          />
        );
      })}
      <SettingsHeader text="NSFW" />
      <ListItem
        text="Enable NSFW"
        icon="baby-carriage-off"
        onPress={() => setFilter("nsfw")}
        right={
          <Checkbox
            checked={filters.nsfw}
            onValueChange={() => setFilter("nsfw")}
          />
        }
      />
      <ListItem
        text="Blur images in NSFW"
        icon="eye-off"
        onPress={() => setFilter("blurNsfw")}
        right={
          <Checkbox
            checked={filters.blurNsfw}
            onValueChange={() => setFilter("blurNsfw")}
          />
        }
      />
    </ScrollView>
  );
};

const postFilters = [
  {
    text: "Images",
    type: "images",
  },
  {
    text: "Albums",
    type: "album",
  },
  {
    text: "Gifs",
    type: "gif",
  },
  {
    text: "Videos",
    type: "video",
  },
  {
    text: "Text",
    type: "text",
  },
] as const;
