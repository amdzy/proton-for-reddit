import React from 'react';
import { ScrollView } from 'react-native';
import {
  Checkbox, Divider, ListItem, SettingsHeader,
} from '@/components';
import { useSettingsStore } from '@/stores';

export function ViewSettingScreen() {
  const cardSettings = useSettingsStore((state) => state.card);
  const setCardSettings = useSettingsStore((state) => state.setCardSettings);
  return (
    <ScrollView>
      <ListItem text="Default View" subText="Cards" />
      <Divider />
      <SettingsHeader text="Cards" />
      <ListItem
        text="Carousel for multiple image previews"
        right={<Checkbox checked={cardSettings.carousel} />}
        onPress={() => setCardSettings('carousel')}
      />
      <ListItem
        text="Preview text from text posts"
        right={<Checkbox checked={cardSettings.previewText} />}
        onPress={() => setCardSettings('previewText')}
      />
    </ScrollView>
  );
}
