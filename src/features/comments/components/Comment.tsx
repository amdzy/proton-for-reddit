import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Comment as C } from '../types';
import { CommentHeader } from './CommentHeader/CommentHeader';
import { CommentText } from './CommentText/CommentText';
import { CommentLines } from './CommentLines/CommentLines';
import { CommentCollapsed } from './CommentCollapsed/CommentCollapsed';
import { CommentActions } from './CommentActions/CommentActions';
import { useSettingsStore } from '@/stores';
import { Awards } from '@/features/posts/components';

interface Props {
  comment: C;
}

export function Comment({ comment }: Props) {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(comment.collapsed);
  const [showActions, setShowActions] = useState(
    useSettingsStore.getState().comments.buttonsVisible
  );
  const awards = useSettingsStore((state) => state.comments.awards);

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
        scoreHidden={comment.score_hidden}
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
            backgroundColor: theme.surface,
            flex: 1,
          }}
          onLongPress={() => setIsCollapsed(true)}
          onPress={() => setShowActions((old) => !old)}
          android_ripple={{ color: theme.placeholder }}
        >
          <CommentHeader
            author={comment.author}
            score={comment.ups}
            date={comment.created_utc}
            flairType={comment.author_flair_type}
            flairText={comment.author_flair_text}
            flairRichText={comment.author_flair_richtext}
            scoreHidden={comment.score_hidden}
          />
          {awards && <Awards awards={comment.all_awardings} />}
          <CommentText text={comment.body} />
          {showActions && <CommentActions isLiked={null} isSaved={false} />}
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
