import React from "react";
import { FlatList, ScrollView } from "react-native";
import { ListItem } from "@/components";

const settings = [
  {
    name: "General",
    icon: "cog",
    screen: "General",
  },
  {
    name: "Theme",
    icon: "palette",
    screen: "Theme",
  },
  {
    name: "Content Filter",
    icon: "filter-variant",
    screen: "General",
  },
];

export const SettingsScreen = ({ navigation }: any) => {
  return (
    <FlatList
      keyExtractor={(item) => item.name}
      data={settings}
      renderItem={({ item }) => (
        <ListItem
          text={item.name}
          icon={item.icon}
          onPress={() => navigation.navigate(item.screen)}
        />
      )}
      style={{ flex: 1 }}
    />
  );
};
