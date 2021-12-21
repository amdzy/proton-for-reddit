import { Divider } from "@/components";
import {
  ColorPicker,
  CustomizeColorButton,
  ThemeButton,
} from "@/features/Colors";
import { useTheme } from "@/hooks";
import { useThemeStore } from "@/stores/themeStore";
import { ColorsDTO } from "@/stores/types";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export const ColorScreen = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useTheme();
  const changeColor = useThemeStore((state) => state.changeColor);

  const [isModalShown, setIsModalShown] = useState(false);
  const [color, setColor] = useState("");
  const [type, setType] = useState<keyof ColorsDTO>("primary");

  const handleOpenModal = (color: string, type: keyof ColorsDTO) => {
    setColor(color);
    setType(type);
    setIsModalShown(true);
  };

  const handleCloseModal = () => {
    setIsModalShown(false);
  };

  const handleColorSubmit = (value: string) => {
    changeColor(type, value);
    setIsModalShown(false);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
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
      {colors.map((item) => {
        return (
          <View key={item.type}>
            <CustomizeColorButton
              text={item.text}
              color={theme[item.type]}
              onPress={() => handleOpenModal(theme[item.type], item.type)}
            />
            <Divider />
          </View>
        );
      })}

      <ColorPicker
        isOpen={isModalShown}
        onClose={handleCloseModal}
        color={color}
        onSubmit={handleColorSubmit}
      />
    </ScrollView>
  );
};

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
