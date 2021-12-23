import { Checkbox, ListItem, SettingsHeader } from "@/components";
import { FilterModal } from "@/features/filters";
import { useTheme } from "@/hooks";
import { useFilterStore } from "@/stores";
import React, { useState } from "react";
import { ScrollView } from "react-native";

export const FilterScreen = () => {
  const theme = useTheme();
  const filters = useFilterStore((state) => state.posts);
  const setFilter = useFilterStore((state) => state.setPostsFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFilterType, setModalFilterType] = useState<any>("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (type: string) => {
    setModalFilterType(type);
    setIsModalOpen(true);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="Filter by" />
      {filterBy.map((filter) => {
        return (
          <ListItem
            text={filter.text}
            subText={filter.subText}
            icon={filter.icon}
            onPress={() => handleOpenModal(filter.type)}
          />
        );
      })}
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
      <FilterModal
        visible={isModalOpen}
        onClose={handleCloseModal}
        type={modalFilterType}
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

const filterBy = [
  {
    text: "Subreddits",
    subText: "Hide posts from these subreddits",
    icon: "reddit",
    type: "subs",
  },
  {
    text: "Users",
    subText: "Hide posts from these users",
    icon: "account-off",
    type: "users",
  },
  {
    text: "Keywords",
    subText: "Hide posts containing keywords in title",
    icon: "text-search",
    type: "keywords",
  },
  {
    text: "Flairs",
    subText: "Hide posts with these flairs",
    icon: "tag-text-outline",
    type: "flairs",
  },
] as const;
