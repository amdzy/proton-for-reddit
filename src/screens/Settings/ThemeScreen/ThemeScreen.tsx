import React from 'react';
import { View } from 'react-native';
import { ListItem } from '@/components';
import { useTheme } from '@/hooks';

export function ThemeScreen({ navigation }: any) {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ListItem
        text="Customize colors"
        icon="palette"
        onPress={() => navigation.navigate('Colors')}
      />
      <ListItem
        text="Fonts"
        icon="format-size"
        onPress={() => navigation.navigate('Fonts')}
      />
    </View>
  );
}
