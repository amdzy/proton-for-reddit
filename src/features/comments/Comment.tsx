import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import produce from 'immer';
import { useTheme } from '@/hooks';
import { Comment as C, CommentApiRes } from './types';
import { useSettingsStore } from '@/stores';
import { Awards } from '@/features/posts/components';
import { ColorsDTO } from '@/stores/types';
import {
  CommentActions,
  CommentAddMore,
  CommentCollapsed,
  CommentHeader,
  CommentLines,
  CommentText,
} from './components';
import { queryClient } from '@/lib/react-query';

interface Props {
  data: C;
  kind: string;
  id: string;
  fullName: string;
  sub: string;
}

export function Comment({ data, kind, fullName, sub, id }: Props) {
  const [comment, setComment] = useState(data);
  const [commentKind, setCommentKind] = useState(kind);
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(comment.collapsed);
  const [showActions, setShowActions] = useState(
    useSettingsStore.getState().comments.buttonsVisible
  );
  const awards = useSettingsStore((state) => state.comments.awards);
  const styles = makeStyles(theme);

  const handlePressMore = useCallback(
    (newData: Array<any>) => {
      if (comment.depth > 0) {
        setComment((old) => ({
          ...old,
          replies: { kind: 'Listing', data: { children: newData } },
        }));
        setCommentKind('');
      }

      if (comment.depth === 0) {
        const queryData = queryClient.getQueryData<CommentApiRes | undefined>([
          id,
          sub,
        ]);
        if (queryData) {
          const newQueryData = produce(queryData, (draft) => {
            // let last = draft[1].data.children[draft[1].data.children.length - 1];
            draft[1].data.children.pop();
            draft[1].data.children.push(...newData);
            // if (last.data.count > 100) {
            //   last = {
            //     ...last,
            //     data: { ...last.data, children: last.data.children.slice(100) },
            //   };
            //   draft[1].data.children.push(last);
            // }
          });
          queryClient.setQueryData([id, sub], newQueryData);
        }
      }
    },
    [comment.depth, id, sub]
  );

  if (commentKind === 'more') {
    return (
      <CommentAddMore
        depth={comment.depth}
        id={fullName}
        commentsIds={comment.children.join(',')}
        onPress={(data: any) => handlePressMore(data)}
      />
    );
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
      {comment.body && (
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
              isSticked={comment.stickied}
              isSubmitter={comment.is_submitter}
            />
            {awards && <Awards awards={comment.all_awardings} />}
            <CommentText text={comment.body} />
            {showActions && <CommentActions isLiked={null} isSaved={false} />}
          </Pressable>
        </View>
      )}

      {typeof comment.replies !== 'string' &&
        comment.replies?.data?.children.map((item) => (
          <CommentMemoized
            data={item.data}
            kind={item.kind}
            fullName={fullName}
            id={id}
            sub={sub}
            key={item.data.id}
          />
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
