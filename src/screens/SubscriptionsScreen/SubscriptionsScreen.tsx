import { Divider } from "@/components";
import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubListItem } from "./components/SubListItem/SubListItem";

const arr = [
  {
    id: 1,
    name: "Front Page",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.G5cEdePPv-UVJyadWJCxlQHaE9%26pid%3DApi&f=1",
  },
  {
    id: 1,
    name: "Popular",
    image: "",
  },
  {
    id: 1,
    name: "All",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.G5cEdePPv-UVJyadWJCxlQHaE9%26pid%3DApi&f=1",
  },
  {
    id: 2,
    name: "Games",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.G5cEdePPv-UVJyadWJCxlQHaE9%26pid%3DApi&f=1",
  },
  {
    id: 3,
    name: "Games",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.G5cEdePPv-UVJyadWJCxlQHaE9%26pid%3DApi&f=1",
  },
];

interface Props {
  navigation: any;
}

export const SubscriptionsScreen = ({ navigation }: Props) => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <SafeAreaView style={{ backgroundColor: theme.surface, flex: 1 }}>
      <FlatList
        data={arr}
        renderItem={({ item }) => (
          <SubListItem
            image={item.image}
            text={item.name}
            navigation={navigation}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider style={{ backgroundColor: theme.background }} />
        )}
      />
    </SafeAreaView>
  );
};
