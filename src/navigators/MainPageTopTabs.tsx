import { MainScreen } from "@/screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions } from "react-native";

const Tab = createMaterialTopTabNavigator();

export const MainPageTopTabs = () => {
  return (
    <Tab.Navigator initialLayout={{ width: Dimensions.get("window").width }}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Popular" component={MainScreen} />
      <Tab.Screen name="All" component={MainScreen} />
    </Tab.Navigator>
  );
};
