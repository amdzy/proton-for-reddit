import { TabBarIcon } from "@/components";
import React from "react";
import { Pressable, View } from "react-native";

export const TabNavigatorButtons = ({ navigation }: any) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <TabBarIcon
          color={"black"}
          icon={"magnify"}
          size={24}
          style={{ marginRight: 16 }}
        />
      </Pressable>
      <TabBarIcon
        color={"black"}
        icon={"dots-vertical"}
        size={24}
        style={{ marginRight: 12 }}
      />
    </View>
  );
};
