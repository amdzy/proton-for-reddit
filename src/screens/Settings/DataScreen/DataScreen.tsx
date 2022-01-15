import React from 'react';
import { View } from 'react-native';
import { Checkbox, Divider, ListItem, SettingsHeader } from '@/components';
import { useTheme } from '@/hooks';
import { useSettingsStore } from '@/stores';

export function DataScreen() {
  const theme = useTheme();
  const dataSaver = useSettingsStore((state) => state.dataSaver);
  const setDataSaver = useSettingsStore((state) => state.setDataSaver);
  const videoDataSaver = useSettingsStore((state) => state.videos.dataSaver);
  const setVideoSettings = useSettingsStore((state) => state.setVideoSettings);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SettingsHeader text="Data Saver" />
      <ListItem
        text="Data Saver"
        subText="Load lower-sized media"
        onPress={setDataSaver}
        right={<Checkbox checked={dataSaver} passThrough />}
      />
      <Divider />
      <SettingsHeader text="Videos" />
      <ListItem
        text="Video quality"
        subText={videoDataSaver ? 'Prefer high quality' : 'Prefer low quality'}
        onPress={() => setVideoSettings('dataSaver')}
        right={<Checkbox checked={videoDataSaver} passThrough />}
      />
      <Divider />
    </View>
  );
}
