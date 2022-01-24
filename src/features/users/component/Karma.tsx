import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Spacer, SubText } from '@/components';
import { useTheme } from '@/hooks';

interface Props {
  icon: string;
  karma?: number | string;
}

export function Karma({ icon, karma }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Icon icon={icon} size={13} color={theme.placeholder} />
      <Spacer horizontal size={4} />
      <SubText>{karma}</SubText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
});
