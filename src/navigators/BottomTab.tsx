import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Pressable, Text, View } from 'react-native';
import { Avatar, Icon } from '@/components';
import { TabNavigatorButtons } from './Components/TabNavigatorButtons';
import {
  LoginScreen,
  MainScreen,
  SettingsScreen,
  SubscriptionsScreen,
} from '@/screens';
import { MessagesPageTopTab } from './MessagesPageTopTab';
import { useAuthStore } from '@/stores';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRight: () => <TabNavigatorButtons navigation={navigation} />,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Avatar size={30} image={undefined} />
          </Pressable>
        ),
        headerLeftContainerStyle: {
          marginRight: 12,
          marginLeft: 12,
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={MainScreen}
        options={{
          headerShadowVisible: false,
          title: 'Proton',
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="home" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={isAuthenticated ? MessagesPageTopTab : LoginScreen}
        options={{
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="chat-processing-outline" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Subs"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="format-list-bulleted-type" size={size} />
          ),
          title: 'Subscriptions',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isAuthenticated ? SecondScreen : LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="account-circle-outline" size={size} />
          ),
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="cog" size={size} />
          ),
          headerLeft: () => null,
        }}
      />
    </Tab.Navigator>
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
