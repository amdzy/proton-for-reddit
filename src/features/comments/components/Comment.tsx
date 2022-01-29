import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Comment as C } from '../types';
import { CommentHeader } from './CommentHeader/CommentHeader';
import { CommentText } from './CommentText/CommentText';
import { CommentLines } from './CommentLines/CommentLines';
import { CommentCollapsed } from './CommentCollapsed/CommentCollapsed';

interface Props {
  comment: C;
}

export function Comment({ comment }: Props) {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!comment) {
    return null;
  }

  if (isCollapsed) {
    return (
      <CommentCollapsed
        author={comment.author}
        score={comment.ups}
        date={comment.created_utc}
        depth={comment.depth}
        onPress={() => setIsCollapsed(false)}
      />
    );
  }

  return (
    <>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <CommentLines depth={comment.depth} />
        <Pressable
          style={{
            padding: 14,
            backgroundColor: theme.surface,
            flex: 1,
          }}
          onLongPress={() => setIsCollapsed(true)}
          android_ripple={{ color: theme.placeholder }}
        >
          <CommentHeader
            author={comment.author}
            score={comment.ups}
            date={comment.created_utc}
          />
          <CommentText text={comment.body} />
        </Pressable>
      </View>

      {typeof comment.replies !== 'string' && (
        <FlatList
          data={comment.replies?.data?.children}
          renderItem={({ item }) => (
            <CommentMemoized comment={item.data} key={item.data.id} />
          )}
          keyExtractor={(item) => item.data.id}
        />
      )}
    </>
  );
}

export const CommentMemoized = React.memo(Comment, () => false);
