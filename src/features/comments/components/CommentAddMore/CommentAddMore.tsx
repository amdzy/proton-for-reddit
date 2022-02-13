import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/hooks';
import { ColorsDTO } from '@/stores/types';
import { CommentLines } from '../CommentLines/CommentLines';
import { fetchMoreComments } from '../../api';

interface Props {
  depth: number;
  id: string;
  commentsIds: string;
  onPress: (data: any) => void;
}

export function CommentAddMore({ depth, id, commentsIds, onPress }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handlePress = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMoreComments(id, commentsIds);
      const newData = data.json.data.things;
      onPress(newData);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <CommentLines depth={depth} />
      <Pressable
        style={styles.button}
        onPress={handlePress}
        android_ripple={styles.ripple}
        disabled={isLoading}
      >
        <Text style={styles.text}>
          {isError && !isLoading && 'Error loading more comments'}
          {isLoading && !isError && 'Loading...'}
          {!isError && !isLoading && 'Load More Comments'}
        </Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      flex: 1,
      backgroundColor: theme.surface,
    },
    ripple: { color: theme.placeholder },
    text: {
      textAlign: 'center',
      flex: 1,
      color: theme.highlight,
    },
  });
