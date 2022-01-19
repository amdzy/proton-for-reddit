import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { DrawerHeader } from './components/DrawerHeader';
import { DrawerItems } from './components/DrawerItems';
import { DrawerLogin } from './components/DrawerLogin';

interface Props {
  navigation: any;
}

export function Drawer({ navigation }: Props) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <DrawerContentScrollView>
      <DrawerHeader
        showLogin={showLogin}
        onPress={() => setShowLogin((old) => !old)}
      />
      {showLogin && <DrawerLogin />}
      {!showLogin && <DrawerItems navigation={navigation} />}
    </DrawerContentScrollView>
  );
}
