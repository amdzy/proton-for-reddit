import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Avatar, Spacer } from '@/components';
import { useThemeStore } from '@/stores/themeStore';

interface Props {
  text: string;
  image: string;
  navigation: any;
}

export function SubListItem({ text, image, navigation }: Props) {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}
        onPress={() => navigation.navigate('Sub', { subId: text })}
      >
        <Avatar size={35} image={image} />
        <Text style={{ color: theme.text, marginLeft: 20, fontSize: 18 }}>
          {text}
        </Text>
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        <Pressable>
          <MaterialCommunityIcons name="star" size={24} color={theme.primary} />
        </Pressable>
        <Spacer size={16} horizontal />
        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={theme.text}
          />
        </Pressable>
      </View>
    </View>
  );
}
