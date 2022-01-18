import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTab } from './BottomTab';
import { DrawerItems } from './Components/DrawerItems';

const Drawer = createDrawerNavigator();

export function DrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerShown: false,
      })}
      drawerContent={({ navigation }) => (
        <DrawerItems navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={BottomTab} />
    </Drawer.Navigator>
  );
}
