import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar, IconButton, Spacer, Text } from '@/components';
import { useTheme } from '@/hooks';

interface Props {
  text: string;
  image: string;
  actions?: boolean;
  navigation: any;
}

export function SubListItem({
  text,
  image,
  actions = true,
  navigation,
}: Props) {
  const theme = useTheme();

  const handleRedirect = () => {
    if (actions) {
      navigation.navigate('Sub');
    } else {
      navigation.navigate(text);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.nameButton} onPress={handleRedirect}>
        <Avatar size={30} image={image} />
        <Text style={styles.subName}>{text}</Text>
      </Pressable>
      {actions && (
        <View style={styles.row}>
          <IconButton icon="check-circle" color={theme.primary} />
          <Spacer size={16} horizontal />
          {/* <IconButton icon="dots-vertical" color={theme.text} /> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 12,
  },
  nameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subName: { marginLeft: 20, fontSize: 16 },
  row: { flexDirection: 'row' },
});
