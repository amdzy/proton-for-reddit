import React from 'react';
import { ScrollView } from 'react-native';
import {
  Checkbox, Divider, ListItem, SettingsHeader,
} from '@/components';
import { useTheme } from '@/hooks';
import { useSettingsStore } from '@/stores';

export function GeneralScreen({ navigation }: any) {
  const theme = useTheme();
  const videoSettings = useSettingsStore((state) => state.videos);
  const setVideoSettings = useSettingsStore((state) => state.setVideoSettings);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      {navigationItems.map((item) => (
        <ListItem
          key={item.text}
          text={item.text}
          subText={item.subText}
          icon={item.icon}
          onPress={() => navigation.navigate(item.page)}
        />
      ))}
      <Divider />
      <SettingsHeader text="Videos" />
      {videoItems.map((item) => (
        <ListItem
          key={item.text}
          text={item.text}
          subText={item.subText}
          icon={item.icon}
          onPress={() => setVideoSettings(item.type)}
          right={<Checkbox checked={videoSettings[item.type]} passThrough />}
        />
      ))}
    </ScrollView>
  );
}

const navigationItems = [
  {
    text: 'Posts',
    subText: 'Default sort and post info',
    icon: 'post-outline',
    page: 'PostSettings',
  },
  {
    text: 'Comments',
    subText: 'Default sort and appearance',
    icon: 'comment-text-outline',
    page: 'CommentSettings',
  },
  {
    text: 'Views',
    subText: 'Customize post layout',
    icon: 'view-compact-outline',
    page: 'ViewSettings',
  },
] as const;

const videoItems = [
  {
    text: 'Mute audio',
    subText: 'Start videos muted by default',
    icon: 'volume-mute',
    type: 'mute',
  },
  {
    text: 'Loop video',
    subText: 'Loop the video on end',
    icon: 'replay',
    type: 'loop',
  },
] as const;
