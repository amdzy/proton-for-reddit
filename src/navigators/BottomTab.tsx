import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Pressable, View } from 'react-native';
import { Avatar, Icon, SubText, Text } from '@/components';
import { TabNavigatorButtons } from './Components/TabNavigatorButtons';
import {
  LoginScreen,
  MainScreen,
  SettingsScreen,
  SubscriptionsScreen,
} from '@/screens';
import { MessagesPageTopTab } from './MessagesPageTopTab';
import { useAuthStore, useSettingsStore } from '@/stores';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const sort = useSettingsStore((state) => state.posts.feedSort);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
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
        options={({ navigation }) => ({
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="home" size={size} />
          ),
          headerRight: () => <TabNavigatorButtons navigation={navigation} />,
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Proton</Text>
              <SubText style={{ textTransform: 'capitalize' }}>{sort}</SubText>
            </View>
          ),
        })}
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
