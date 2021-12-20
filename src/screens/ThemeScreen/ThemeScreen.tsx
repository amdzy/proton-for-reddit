import { ListItem } from "@/components";
import React from "react";
import { View } from "react-native";

export const ThemeScreen = ({ navigation }: any) => {
  return (
    <View>
      <ListItem
        text="Customize colors"
        icon="palette"
        onPress={() => navigation.navigate("Colors")}
      />
      <ListItem text="Fonts" icon="format-size" />
    </View>
  );
};
