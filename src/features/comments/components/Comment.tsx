import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Comment as C } from '../types';
import { CommentHeader } from './CommentHeader/CommentHeader';
import { CommentText } from './CommentText/CommentText';
import { Text } from '@/components';

interface Props {
  comment: C;
}

const arr = new Array(2).fill(1);

export function Comment({ comment }: Props) {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const depth = useRef(new Array(comment.depth).fill(1));

  if (!comment) {
    return null;
  }

  if (isCollapsed) {
    return (
      <Pressable
        onLongPress={() => setIsCollapsed(false)}
        style={{ padding: 14 }}
      >
        <Text>Collapsed</Text>
      </Pressable>
    );
  }

  return (
    <>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {depth.current.map((x, i) => (
          <View
            style={{
              width: 12,
              borderRightWidth: 1,
              borderRightColor: theme.backdrop,
              backgroundColor: theme.surface,
            }}
            key={i}
          />
        ))}
        <Pressable
          style={{
            padding: 14,
            backgroundColor: theme.surface,
            flex: 1,
          }}
          onLongPress={() => setIsCollapsed(true)}
        >
          <CommentHeader
            author={comment.author}
            score={comment.ups}
            date={comment.created_utc}
          />
          <CommentText text={comment.body} />
        </Pressable>
      </View>

      {typeof comment.replies !== 'string' &&
        comment.replies?.data?.children.map((item) => (
          <Comment comment={item.data} key={item.data.id} />
        ))}
    </>
  );
}
