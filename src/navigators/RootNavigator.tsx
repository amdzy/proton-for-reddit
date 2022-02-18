import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CommentsScreen,
  ImageScreen,
  PostSearchScreen,
  ProfileScreen,
  SearchScreen,
  SubredditScreen,
  UserSearchScreen,
  VideoScreen,
} from '@/screens';
import { useTheme } from '@/hooks';
import { SearchBar } from '@/features/search';
import { SettingsStack } from './SettingsStack';
import { DrawerNav } from './DrawerNav';
import { useSettingsStore } from '@/stores';
import { TabNavigatorButtons } from './Components/TabNavigatorButtons';
import { HeaderTitle } from './Components/HeaderTitle';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const theme = useTheme();
  const sort = useSettingsStore((state) => state.posts.sort);

  const myTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.primary,
        background: theme.background,
        card: theme.toolbar,
        text: theme.text,
        border: theme.surface,
      },
    }),
    [theme]
  );

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
        <Stack.Screen
          name="Root"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
        <Stack.Screen
          name="Sub"
          component={SubredditScreen}
          // Typescript error Property 'sub' does not exist on type 'object'
          options={({ route, navigation }: any) => ({
            headerShadowVisible: false,
            headerTitle: () => (
              <HeaderTitle page={route.params?.sub} sort={sort} />
            ),
            headerRight: () => (
              <TabNavigatorButtons
                navigation={navigation}
                page={route.params?.sub}
              />
            ),
          })}
          initialParams={{ sub: '' }}
        />
        <Stack.Screen
          name="UsersProfile"
          component={ProfileScreen}
          options={({ route }: any) => ({
            headerShadowVisible: false,
            headerTitle: route.params.name,
          })}
          initialParams={{ name: '' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitle: () => <SearchBar />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="SearchPosts"
          component={PostSearchScreen}
          options={({ route }: any) => ({
            headerShadowVisible: false,
            headerTitle: route.params?.query,
          })}
          initialParams={{ query: '' }}
        />
        <Stack.Screen
          name="SearchUsers"
          component={UserSearchScreen}
          options={({ route }: any) => ({
            headerShadowVisible: false,
            headerTitle: route.params?.query,
          })}
          initialParams={{ query: '' }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Images"
          component={ImageScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
            animation: 'none',
          }}
        />
        {SettingsStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
