import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, IconButton, Spacer, SubText, Text } from '@/components';
import { useTheme } from '@/hooks';

interface Props {
  name: string;
  icon: string;
  active?: number;
  subscriber?: number;
  description?: string;
  subscribed?: boolean;
}

export function SubHeader({
  name,
  icon,
  active,
  subscriber,
  description = '',
  subscribed,
}: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.toolbar,
        ...styles.container,
      }}
    >
      <Avatar image={icon} size={80} />
      <View style={styles.rowContainer}>
        <Text style={styles.subName}>{name}</Text>
        {subscribed !== undefined && (
          <IconButton icon="plus-circle" size={18} style={styles.icon} />
        )}
      </View>
      {subscriber !== undefined && (
        <View style={styles.rowContainer}>
          <SubText fontSize={12}>{subscriber} members</SubText>
          <Spacer horizontal size={8} />
          <SubText fontSize={12}>{active} online</SubText>
        </View>
      )}
      {description?.length > 0 && (
        <Text style={styles.subDesc} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  subName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  icon: { position: 'absolute', right: -25 },
  subDesc: {
    fontSize: 13,
    paddingTop: 4,
  },
});
