import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Comment as C } from './types';
import { CommentHeader } from './components/CommentHeader/CommentHeader';
import { CommentText } from './components/CommentText/CommentText';
import { CommentLines } from './components/CommentLines/CommentLines';
import { CommentCollapsed } from './components/CommentCollapsed/CommentCollapsed';
import { CommentActions } from './components/CommentActions/CommentActions';
import { useSettingsStore } from '@/stores';
import { Awards } from '@/features/posts/components';
import { ColorsDTO } from '@/stores/types';

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
  const styles = makeStyles(theme);

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
        voted={comment.likes}
        onPress={() => setIsCollapsed(false)}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <CommentLines depth={comment.depth} />
        <Pressable
          style={styles.button}
          onLongPress={() => setIsCollapsed(true)}
          onPress={() => setShowActions((old) => !old)}
          android_ripple={styles.ripple}
        >
          <CommentHeader
            author={comment.author}
            score={comment.score}
            date={comment.created_utc}
            flairType={comment.author_flair_type}
            flairText={comment.author_flair_text}
            flairRichText={comment.author_flair_richtext}
            scoreHidden={comment.score_hidden}
            voted={comment.likes}
          />
          {awards && <Awards awards={comment.all_awardings} />}
          <CommentText text={comment.body} />
          {showActions && <CommentActions isLiked={null} isSaved={false} />}
        </Pressable>
      </View>

      {typeof comment.replies !== 'string' &&
        comment.replies?.data?.children.map((item) => (
          <CommentMemoized comment={item.data} key={item.data.id} />
        ))}
    </>
  );
}

export const CommentMemoized = React.memo(Comment, () => false);

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    container: { flexDirection: 'row', flex: 1 },
    button: { backgroundColor: theme.surface, flex: 1 },
    ripple: { color: theme.placeholder },
  });
