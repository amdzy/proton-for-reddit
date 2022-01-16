import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Divider, SettingsHeader } from '@/components';
import {
  ColorPicker,
  CustomizeColorButton,
  ThemeButton,
} from '@/features/colors';
import { useModal, useTheme } from '@/hooks';
import { useThemeStore } from '@/stores/themeStore';
import { ColorsDTO, ThemeName } from '@/stores/types';

type Colors = keyof ColorsDTO;

export function ColorScreen() {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useTheme();
  const changeColor = useThemeStore((state) => state.changeColor);
  const themes = Object.keys(
    useThemeStore((state) => state.colors)
  ) as ThemeName[];
  const colors = Object.keys(theme).filter(
    (x) => x !== 'statusBar'
  ) as Colors[];

  const { isModalOpen, openModal, closeModal } = useModal();
  const [color, setColor] = useState('');
  const [type, setType] = useState<keyof ColorsDTO>('primary');

  const handleOpenModal = (value: string, key: keyof ColorsDTO) => {
    setColor(value);
    setType(key);
    openModal();
  };

  const handleColorSubmit = (value: string) => {
    changeColor(type, value);
    closeModal();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="App theme" />
      <View style={{ marginBottom: 18, paddingVertical: 8 }}>
        <FlatList
          keyExtractor={(item) => item}
          data={themes}
          renderItem={({ item }) => (
            <ThemeButton theme={item} active={chosenTheme === item} />
          )}
          horizontal
        />
      </View>
      <Divider />
      <SettingsHeader
        text="Customize Colors"
        style={{ padding: 16, paddingBottom: 0 }}
      />

      {colors.map((item) => (
        <View key={item}>
          <CustomizeColorButton
            text={item}
            color={theme[item]}
            onPress={() => handleOpenModal(theme[item], item)}
          />
          <Divider />
        </View>
      ))}

      <ColorPicker
        isOpen={isModalOpen}
        onClose={closeModal}
        color={color}
        onSubmit={handleColorSubmit}
      />
    </ScrollView>
  );
}
