import { Divider, Spacer } from "@/components";
import { CustomizeColorButton, ThemeButton } from "@/features/Colors";
import { useThemeStore } from "@/stores/themeStore";
import React from "react";
import { FlatList, Text, View } from "react-native";

const themes = [
  {
    name: "dark",
  },
  {
    name: "light",
  },
] as const;

const colors = [
  {
    text: "Primary",
    type: "primary",
  },
  {
    text: "Accent",
    type: "accent",
  },
  {
    text: "Highlight",
    type: "highlight",
  },
  {
    text: "Background",
    type: "background",
  },
  {
    text: "Surface",
    type: "surface",
  },
  {
    text: "Toolbar",
    type: "toolbar",
  },
  {
    text: "Text",
    type: "text",
  },
  {
    text: "Placeholder",
    type: "placeholder",
  },
] as const;

export const ColorScreen = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 18, padding: 16 }}>
        <Text
          style={{
            color: theme.primary,
            fontSize: 18,
            marginBottom: 12,
          }}
        >
          Themes
        </Text>
        <FlatList
          keyExtractor={(item) => item.name}
          data={themes}
          renderItem={({ item }) => (
            <ThemeButton theme={item.name} active={chosenTheme === item.name} />
          )}
          horizontal
        />
      </View>
      <Divider />
      <Text
        style={{
          color: theme.primary,
          fontSize: 18,
          marginBottom: 12,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        Customize Colors
      </Text>
      <FlatList
        keyExtractor={(item) => item.type}
        data={colors}
        renderItem={({ item }) => (
          <CustomizeColorButton text={item.text} type={item.type} />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};
