import {
  ColorScreen,
  FontScreen,
  SettingsScreen,
  ThemeScreen,
} from "@/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="General" component={ThemeScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
      <Stack.Screen name="Colors" component={ColorScreen} />
      <Stack.Screen name="Fonts" component={FontScreen} />
    </Stack.Navigator>
  );
};
