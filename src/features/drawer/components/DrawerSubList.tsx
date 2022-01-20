/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { useSubStore } from '@/stores';
import { Avatar, SettingsHeader, Text } from '@/components';

interface Props {
  navigation: any;
}

export function DrawerSubList({ navigation }: Props) {
  const subs = useSubStore((state) => state.subs);

  const items = useMemo(
    () =>
      Object.values(subs)
        .sort((a, b) => {
          const first = a.name.toLowerCase();
          const second = b.name.toLowerCase();
          if (first > second) return 1;
          if (first < second) return -1;
          return 0;
        })
        .map((sub) => (
          <DrawerItem
            label={() => <Text>{sub.name}</Text>}
            onPress={() => {
              navigation.navigate('Sub', {
                sub: sub.name,
                subIcon: sub.icon,
              });
              navigation.closeDrawer();
            }}
            icon={() => <Avatar image={sub.icon} size={24} showPlaceholder />}
            key={sub.id}
          />
        )),
    [subs]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <SettingsHeader text="Subscriptions" />
      {items}
    </>
  );
}
