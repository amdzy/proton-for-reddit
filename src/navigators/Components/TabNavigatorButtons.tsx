import React from 'react';
import { View } from 'react-native';
import { IconButton } from '@/components';
import { useThemeStore } from '@/stores/themeStore';
import { FeedSortModal } from '@/features/sort';
import { useModal } from '@/hooks';

export function TabNavigatorButtons({ navigation }: any) {
  const theme = useThemeStore((state) => state.theme);
  const color = useThemeStore((state) => state.colors[theme].text);
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          color={color}
          icon="magnify"
          style={{ marginRight: 16 }}
          onPress={() => navigation.navigate('Search')}
        />
        <IconButton
          color={color}
          icon="sort-variant"
          style={{ marginRight: 16 }}
          onPress={openModal}
        />
      </View>
      <FeedSortModal visible={isModalOpen} onClose={closeModal} />
    </>
  );
}
