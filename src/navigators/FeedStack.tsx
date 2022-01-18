import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { MainScreen } from '@/screens';
import { TabNavigatorButtons } from './Components/TabNavigatorButtons';
import { IconButton, SubText, Text } from '@/components';
import { useSettingsStore } from '@/stores';

const Stack = createNativeStackNavigator();

export function FeedStack() {
  const HomeSort = useSettingsStore((state) => state.posts.feedSort);
  const sort = useSettingsStore((state) => state.posts.sort);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <IconButton
            icon="menu"
            onPress={() => navigation.openDrawer()}
            style={styles.icon}
          />
        ),
        animation: 'none',
        headerBackVisible: false,
      })}
    >
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => <TabNavigatorButtons navigation={navigation} />,
          headerTitle: () => (
            <View>
              <Text style={styles.text}>Proton</Text>
              <SubText style={styles.sort}>{HomeSort}</SubText>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Popular"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => <TabNavigatorButtons navigation={navigation} />,
          headerTitle: () => (
            <View>
              <Text style={styles.text}>Popular</Text>
              <SubText style={styles.sort}>{sort}</SubText>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="All"
        component={MainScreen}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerRight: () => <TabNavigatorButtons navigation={navigation} />,
          headerTitle: () => (
            <View>
              <Text style={styles.text}>All</Text>
              <SubText style={styles.sort}>{sort}</SubText>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { marginRight: 24 },
  text: { fontSize: 18, fontWeight: 'bold' },
  sort: { textTransform: 'capitalize' },
});
