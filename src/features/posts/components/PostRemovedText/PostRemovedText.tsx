import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { SubText, Text } from '@/components';

export function PostRemovedText() {
  const theme = useTheme();
  const styles = useMemo(() => makeStyle(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          This post has been removed by the moderators{' '}
        </Text>
        <SubText fontSize={13}>
          Moderators remove posts from feeds for a variety of reasons, including
          keeping communities safe, civil, and true to their purpose.
        </SubText>
      </View>
    </View>
  );
}

const makeStyle = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: { paddingHorizontal: 10 },
    textContainer: {
      backgroundColor: theme.backdrop,
      padding: 8,
      borderRadius: 10,
    },
    text: {
      lineHeight: 20,
      fontSize: 15,
    },
  });
