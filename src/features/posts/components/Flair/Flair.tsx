import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  tag: string;
  bgColor?: string;
  color: string;
}

export function Flair({ tag, bgColor, color }: Props) {
  const styles = makeStyles(color, bgColor);
  return (
    <View style={styles.container}>
      <Text style={styles.flair}>{tag}</Text>
    </View>
  );
}

const makeStyles = (color: string, bgColor?: string) =>
  StyleSheet.create({
    container: { marginLeft: 10, paddingBottom: 10 },
    flair: {
      color: color === 'dark' ? '#000000' : '#FFFFFF',
      backgroundColor: bgColor || (color === 'dark' ? '#FFFFFF' : '#000000'),
      padding: 1,
      fontSize: 12,
      paddingHorizontal: 4,
      borderRadius: 3,
    },
  });
