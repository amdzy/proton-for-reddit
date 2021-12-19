import { InboxScreen, MainScreen } from "@/screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

const Tab = createMaterialTopTabNavigator();

export const MessagesPageTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarLabelStyle: { textTransform: "none" } }}
    >
      <Tab.Screen name="All" component={InboxScreen} />
      <Tab.Screen name="Unread" component={InboxScreen} />
      <Tab.Screen name="Sent" component={InboxScreen} />
    </Tab.Navigator>
  );
};
