import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Spacer, Text } from '@/components';
import { SubscriptionBtn } from './SubscriptionBtn';

interface Props {
  name: string;
  icon: string;
  id: string;
  actions?: boolean;
  navigation: any;
}

export function SubListItem({
  name,
  icon,
  id,
  actions = true,
  navigation,
}: Props) {
  const handleRedirect = () => {
    if (actions) {
      navigation.navigate('Sub', {
        sub: name,
        subIcon: icon,
      });
    } else {
      navigation.navigate(name);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.nameButton} onPress={handleRedirect}>
        <Avatar size={30} image={icon} />
        <Text style={styles.subName}>{name}</Text>
      </Pressable>
      {actions && (
        <View style={styles.row}>
          <SubscriptionBtn
            name={name}
            icon={icon}
            id={id}
            subscribed
            size={24}
          />
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
