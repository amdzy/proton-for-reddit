import React, { useMemo } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { MainPageTopTabs } from "./MainPageTopTabs";
import { Avatar, TabBarIcon } from "@/components";
import { TabNavigatorButtons } from "./Components/TabNavigatorButtons";
import {
  ColorScreen,
  CommentSettingScreen,
  DataScreen,
  FilterScreen,
  FontScreen,
  GeneralScreen,
  LoginScreen,
  MainScreen,
  NotificationScreen,
  PostSettingScreen,
  SettingsScreen,
  SubscriptionsScreen,
  ThemeScreen,
  VideoScreen,
  ViewSettingScreen,
} from "@/screens";
import { MessagesPageTopTab } from "./MessagesPageTopTab";
import { useTheme } from "@/hooks";
import { SearchBar } from "@/features/search";
import { useAuthStore } from "@/stores";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const theme = useTheme();

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
        <Stack.Screen
          name="Search"
          component={SecondScreen}
          options={{
            headerTitle: () => {
              return <SearchBar />;
            },
            headerBackTitleVisible: false,
          }}
        />
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
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.background },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNav = () => {
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
        component={MainScreen}
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
        component={isAuthenticated ? MessagesPageTopTab : LoginScreen}
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
        component={isAuthenticated ? SecondScreen : LoginScreen}
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
