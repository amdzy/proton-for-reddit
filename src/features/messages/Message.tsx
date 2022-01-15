import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { Stack } from '@/components';

export function Message() {
  const chosenTheme = useThemeStore((state) => state.theme);
  const theme = useThemeStore((state) => state.colors[chosenTheme]);
  return (
    <View
      style={{
        backgroundColor: theme.surface,
        padding: 12,
        marginVertical: 6,
      }}
    >
      <Stack
        direction="row"
        space={8}
        spaceHorizontal
        style={{ alignItems: 'center' }}
      >
        <MaterialCommunityIcons name="email" size={18} color={theme.text} />
        <Text style={{ color: theme.text, fontSize: 14 }}>message header</Text>
      </Stack>
      <Stack
        direction="row"
        space={8}
        spaceHorizontal
        style={{ marginVertical: 4 }}
      >
        <Text style={{ color: theme.highlight, fontSize: 13 }}>
          Sender Name
        </Text>
        <Text style={{ color: theme.placeholder, fontSize: 13 }}>1h</Text>
      </Stack>
      <View style={{ marginTop: 8 }}>
        <Text style={{ color: theme.text, lineHeight: 20, letterSpacing: 0.2 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
          corporis ullam dolore officiis eveniet, aspernatur sint aliquam atque
          non fuga nemo iusto numquam sit nostrum modi? Eum exercitationem unde
          natus?
        </Text>
      </View>
    </View>
  );
}
