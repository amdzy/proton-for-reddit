import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, SubText } from '@/components';
import { useVotePost } from '../../api';
import { useAuthStore, useToastStore } from '@/stores';

interface Props {
  numComments: number;
  numLikes: number;
  likes: boolean | null;
  postId: string;
  postName: string;
  page?: string;
}

export function CardFooter({
  numComments,
  numLikes,
  likes,
  postId,
  postName,
  page,
}: Props) {
  const voteMutation = useVotePost({ postId, page });
  const [isLiked, setIsLiked] = useState(likes);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToast = useToastStore((state) => state.addToast);

  const handleUpVote = () => {
    setIsLiked(true);
    voteMutation.mutate({ id: postName, dist: 1 });
  };

  const handleDownVote = () => {
    setIsLiked(false);
    voteMutation.mutate({ id: postName, dist: -1 });
  };

  const handleRemoveVote = () => {
    setIsLiked(null);
    voteMutation.mutate({ id: postName, dist: 0 });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        flexWrap: 'nowrap',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 0.4,
        }}
      >
        {isLiked === true ? (
          <IconButton
            icon="arrow-up-thick"
            color="orange"
            onPress={handleRemoveVote}
          />
        ) : (
          <IconButton icon="arrow-up-thick" onPress={handleUpVote} />
        )}
        <SubText>{numLikes}</SubText>
        {isLiked === false ? (
          <IconButton
            icon="arrow-down-thick"
            color="purple"
            onPress={handleRemoveVote}
          />
        ) : (
          <IconButton icon="arrow-down-thick" onPress={handleDownVote} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 0.3,
        }}
      >
        <IconButton icon="comment-outline" />
        <SubText>{numComments}</SubText>
      </View>
      <IconButton icon="bookmark-outline" />
      <IconButton icon="share-variant" />
    </View>
  );
}
