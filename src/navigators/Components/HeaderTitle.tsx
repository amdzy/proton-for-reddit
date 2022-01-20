import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SubText, Text } from '@/components';

interface Props {
  page: string;
  sort: string;
}

export function HeaderTitle({ page, sort }: Props) {
  return (
    <View>
      <Text style={styles.text}>{page}</Text>
      <SubText style={styles.sort}>{sort}</SubText>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 18, fontWeight: 'bold' },
  sort: { textTransform: 'capitalize' },
});
