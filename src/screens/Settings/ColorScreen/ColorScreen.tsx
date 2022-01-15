import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Divider, SettingsHeader } from '@/components';
import {
  ColorPicker,
  CustomizeColorButton,
  ThemeButton,
} from '@/features/colors';
import { useTheme } from '@/hooks';
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
  const colors = useMemo(
    () => Object.keys(theme).filter((x) => x !== 'statusBar') as Colors[],
    [theme]
  );

  const [isModalShown, setIsModalShown] = useState(false);
  const [color, setColor] = useState('');
  const [type, setType] = useState<keyof ColorsDTO>('primary');

  const handleOpenModal = (value: string, key: keyof ColorsDTO) => {
    setColor(value);
    setType(key);
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
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="Themes" />
      <View style={{ marginBottom: 18, padding: 16 }}>
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
        isOpen={isModalShown}
        onClose={handleCloseModal}
        color={color}
        onSubmit={handleColorSubmit}
      />
    </ScrollView>
  );
}
