import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View } from 'react-native';
import { Icon, IconButton, Text } from '@/components';
import { LoginScreen, SettingsScreen, SubscriptionsScreen } from '@/screens';
import { useAuthStore } from '@/stores';
import { FeedStack } from './FeedStack';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        ),
        headerLeftContainerStyle: {
          marginRight: 12,
          marginLeft: 12,
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="home" size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Inbox"
        component={SecondScreen}
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
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="cog" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SecondScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>
      <Button title="button" onPress={() => {}} />
    </View>
  );
}
