import {
  ColorScreen,
  CommentSettingScreen,
  DataScreen,
  FilterScreen,
  FontScreen,
  GeneralScreen,
  NotificationScreen,
  PostSettingScreen,
  ThemeScreen,
  ViewSettingScreen,
} from "@/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  return (
    <>
      <Stack.Screen name="General" component={GeneralScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
      <Stack.Screen name="Colors" component={ColorScreen} />
      <Stack.Screen name="Fonts" component={FontScreen} />
      <Stack.Screen name="Filters" component={FilterScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen
        name="Data"
        component={DataScreen}
        options={{ title: "Data Saver" }}
      />
      <Stack.Screen
        name="PostSettings"
        component={PostSettingScreen}
        options={{ title: "Posts" }}
      />
      <Stack.Screen
        name="CommentSettings"
        component={CommentSettingScreen}
        options={{ title: "Comments" }}
      />
      <Stack.Screen
        name="ViewSettings"
        component={ViewSettingScreen}
        options={{ title: "Views" }}
      />
    </>
  );
};
