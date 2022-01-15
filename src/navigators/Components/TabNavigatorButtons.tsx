import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components';
import { useThemeStore } from '@/stores/themeStore';

export function TabNavigatorButtons({ navigation }: any) {
  const theme = useThemeStore((state) => state.theme);
  const color = useThemeStore((state) => state.colors[theme].text);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <Icon
          color={color}
          icon="magnify"
          size={24}
          style={{ marginRight: 16 }}
        />
      </Pressable>
      <Icon
        color={color}
        icon="dots-vertical"
        size={24}
        style={{ marginRight: 12 }}
      />
    </View>
  );
}
