import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Divider, Icon, Text } from '@/components';
import { useTheme } from '@/hooks';

interface Props {
  navigation: any;
}

export function DrawerItems({ navigation }: Props) {
  const theme = useTheme();

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Home</Text>}
        onPress={() => {
          navigation.navigate('Feed');
        }}
        icon={() => <Icon icon="home" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Popular</Text>}
        onPress={() => {}}
        icon={() => <Icon icon="trending-up" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>All</Text>}
        onPress={() => {}}
        icon={() => <Icon icon="chart-bar" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Saved</Text>}
        onPress={() => {}}
        icon={() => <Icon icon="bookmark" color={theme.placeholder} />}
      />
      <Divider />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Profile</Text>}
        onPress={() => {
          navigation.navigate('Profile');
        }}
        icon={() => (
          <Icon icon="account-circle-outline" color={theme.placeholder} />
        )}
      />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Inbox</Text>}
        onPress={() => {
          navigation.navigate('Inbox');
        }}
        icon={() => (
          <Icon icon="chat-processing-outline" color={theme.placeholder} />
        )}
      />
      <Divider />
      <DrawerItem
        label={() => <Text style={{ fontSize: 16 }}>Settings</Text>}
        onPress={() => {
          navigation.navigate('Settings');
        }}
        icon={() => <Icon icon="cog" color={theme.placeholder} />}
      />
      <Divider />
    </DrawerContentScrollView>
  );
}
