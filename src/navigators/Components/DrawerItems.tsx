import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { Divider, Icon, Text } from '@/components';
import { useTheme } from '@/hooks';
import { DrawerSubList } from './DrawerSubList';

interface Props {
  navigation: any;
}

export function DrawerItems({ navigation }: Props) {
  const theme = useTheme();

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={() => <Text style={styles.text}>Home</Text>}
        onPress={() => {
          navigation.navigate('Home');
        }}
        icon={() => <Icon icon="home" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={styles.text}>Popular</Text>}
        onPress={() => {
          navigation.navigate('Popular');
        }}
        icon={() => <Icon icon="trending-up" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={styles.text}>All</Text>}
        onPress={() => {
          navigation.navigate('All');
        }}
        icon={() => <Icon icon="chart-bar" color={theme.placeholder} />}
      />
      <DrawerItem
        label={() => <Text style={styles.text}>Saved</Text>}
        onPress={() => {}}
        icon={() => <Icon icon="bookmark" color={theme.placeholder} />}
      />
      <Divider />
      <DrawerItem
        label={() => <Text style={styles.text}>Profile</Text>}
        onPress={() => {
          navigation.navigate('Profile');
        }}
        icon={() => (
          <Icon icon="account-circle-outline" color={theme.placeholder} />
        )}
      />
      <DrawerItem
        label={() => <Text style={styles.text}>Inbox</Text>}
        onPress={() => {
          navigation.navigate('Inbox');
        }}
        icon={() => (
          <Icon icon="chat-processing-outline" color={theme.placeholder} />
        )}
      />
      <Divider />
      <DrawerItem
        label={() => <Text style={styles.text}>Settings</Text>}
        onPress={() => {
          navigation.navigate('Settings');
        }}
        icon={() => <Icon icon="cog" color={theme.placeholder} />}
      />
      <Divider />
      <DrawerSubList navigation={navigation} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
