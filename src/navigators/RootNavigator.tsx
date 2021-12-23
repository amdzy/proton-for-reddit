import React, { useMemo } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Pressable, Text, View } from "react-native";
import { MainPageTopTabs } from "./MainPageTopTabs";
import { Avatar, TabBarIcon } from "@/components";
import { TabNavigatorButtons } from "./Components/TabNavigatorButtons";
import { useThemeStore } from "@/stores/themeStore";
import {
  ColorScreen,
  FilterScreen,
  FontScreen,
  NotificationScreen,
  SettingsScreen,
  SubscriptionsScreen,
  ThemeScreen,
} from "@/screens";
import { MessagesPageTopTab } from "./MessagesPageTopTab";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);

  const myTheme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.primary,
        background: theme.background,
        card: theme.toolbar,
        text: theme.text,
        border: theme.surface,
      },
    };
  }, [theme]);

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen
          name="Main"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Comments" component={SecondScreen} />
        <Stack.Screen name="Sub" component={SecondScreen} />
        <Stack.Screen name="Search" component={SecondScreen} />
        <Stack.Screen name="General" component={ThemeScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="Colors" component={ColorScreen} />
        <Stack.Screen name="Fonts" component={FontScreen} />
        <Stack.Screen name="Filters" component={FilterScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRight: () => <TabNavigatorButtons navigation={navigation} />,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Avatar size={30} />
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
        component={MainPageTopTabs}
        options={{
          headerShadowVisible: false,
          title: "Proton",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} icon={"home"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={MessagesPageTopTab}
        options={{
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"chat-processing-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subs"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"format-list-bulleted-type"}
              size={size}
            />
          ),
          title: "Subscriptions",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"account-circle-outline"}
              size={size}
            />
          ),
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} icon={"cog"} size={size} />
          ),
          headerLeft: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const SecondScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Second Screen</Text>
      <Button title="button" onPress={() => navigation.navigate("Search")} />
    </View>
  );
};
