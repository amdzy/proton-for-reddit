import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { InboxScreen } from '@/screens';

const Tab = createMaterialTopTabNavigator();

export function MessagesPageTopTab() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarLabelStyle: { textTransform: 'none' } }}
    >
      <Tab.Screen name="All" component={InboxScreen} />
      <Tab.Screen name="Unread" component={InboxScreen} />
      <Tab.Screen name="Sent" component={InboxScreen} />
    </Tab.Navigator>
  );
}
