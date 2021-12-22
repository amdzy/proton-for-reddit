import { ListItem, SettingsHeader } from "@/components";
import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export const FontScreen = () => {
  const theme = useTheme();
  const changeFontSize = useThemeStore((state) => state.changeFontSize);
  const changeFontFamily = useThemeStore((state) => state.changeFontFamily);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View>
        <SettingsHeader text="Posts" />
        <ListItem text="Title font" icon="text-subject" />
        <ListItem text="Title size" icon="format-size" />
      </View>
      <View>
        <SettingsHeader text="Comments" />
        <ListItem text="Comments font" icon="text-subject" />
        <ListItem text="Comments size" icon="format-size" />
      </View>
    </ScrollView>
  );
};
