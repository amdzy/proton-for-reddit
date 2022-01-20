import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { TabNavigatorButtons } from './Components/TabNavigatorButtons';
import { IconButton } from '@/components';
import { useSettingsStore } from '@/stores';
import { MainScreen } from '@/screens';
import { HeaderTitle } from './Components/HeaderTitle';

const Stack = createNativeStackNavigator();

export function FeedStack() {
  const HomeSort = useSettingsStore((state) => state.posts.feedSort);
  const sort = useSettingsStore((state) => state.posts.sort);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <IconButton
            icon="menu"
            onPress={() => navigation.openDrawer()}
            style={styles.icon}
          />
        ),
        animation: 'none',
        headerBackVisible: false,
      })}
    >
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => (
            <TabNavigatorButtons navigation={navigation} page="home" />
          ),
          headerTitle: () => <HeaderTitle page="Proton" sort={HomeSort} />,
        })}
        initialParams={{ page: 'home' }}
      />
      <Stack.Screen
        name="Popular"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => (
            <TabNavigatorButtons navigation={navigation} page="popular" />
          ),
          headerTitle: () => <HeaderTitle page="Popular" sort={sort} />,
        })}
        initialParams={{ page: 'popular' }}
      />
      <Stack.Screen
        name="All"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => (
            <TabNavigatorButtons navigation={navigation} page="all" />
          ),
          headerTitle: () => <HeaderTitle page="All" sort={sort} />,
        })}
        initialParams={{ page: 'all' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { marginRight: 24 },
});
