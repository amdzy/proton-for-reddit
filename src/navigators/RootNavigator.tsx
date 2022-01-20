import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { ImageScreen, SubredditScreen, VideoScreen } from '@/screens';
import { useTheme } from '@/hooks';
import { SearchBar } from '@/features/search';
import { SettingsStack } from './SettingsStack';
import { DrawerNav } from './DrawerNav';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const theme = useTheme();

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
        <Stack.Screen name="Comments" component={SecondScreen} />
        <Stack.Screen name="Sub" component={SubredditScreen} />
        <Stack.Screen
          name="Search"
          component={SecondScreen}
          options={{
            headerTitle: () => <SearchBar />,
            headerBackTitleVisible: false,
          }}
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

function SecondScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>
      <Button title="button" onPress={() => navigation.navigate('Images')} />
    </View>
  );
}
