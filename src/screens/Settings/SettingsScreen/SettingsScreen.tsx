import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@/components';

export function SettingsScreen({ navigation }: any) {
  return (
    <FlatList
      keyExtractor={(item) => item.name}
      data={settings}
      renderItem={({ item }) => (
        <ListItem
          text={item.name}
          icon={item.icon}
          onPress={() => navigation.navigate(item.screen)}
        />
      )}
      style={{ flex: 1 }}
    />
  );
}

const settings = [
  {
    name: 'General',
    icon: 'cog',
    screen: 'General',
  },
  {
    name: 'Theme',
    icon: 'palette',
    screen: 'Theme',
  },
  {
    name: 'Content Filter',
    icon: 'filter-variant',
    screen: 'Filters',
  },
  {
    name: 'Notification',
    icon: 'bell-ring-outline',
    screen: 'Notifications',
  },
  {
    name: 'Data Usage',
    icon: 'chart-bell-curve-cumulative',
    screen: 'Data',
  },
];
