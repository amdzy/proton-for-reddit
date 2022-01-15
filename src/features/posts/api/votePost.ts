/* eslint-disable no-param-reassign */
import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useSettingsStore, useToastStore } from '@/stores';
import { PostsApiResponse } from '../types';

interface VotePostProps {
  id: string;
  dist: number;
}

const votePost = ({ id, dist }: VotePostProps) => Promise.resolve();

interface UseCreateCommentOptions {
  postId: string;
  config?: MutationConfig<typeof votePost>;
}

export const useVotePost = ({ config, postId }: UseCreateCommentOptions) => {
  const addToast = useToastStore((state) => state.addToast);
  const sort = useSettingsStore((state) => state.posts.sort);

  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries();

      const previousData = queryClient.getQueryData<{
        pages: Array<PostsApiResponse>;
      }>(['feed', sort]);

      const newPosts = previousData?.pages.map((page) =>
        page.children.map((post) => {
          if (post.data.id === postId) {
            post.data = {
              ...post.data,
              likes: data.dist === 1 ? true : data.dist === 0 ? null : false,
            };
          }
          return post;
        })
      );

      queryClient.setQueryData(['feed', sort], {
        ...previousData,
        data: {
          ...previousData?.pages,
          children: newPosts,
        },
      });
    },
    onError: (_, __, context: any) => {
      if (context?.previousData) {
        console.log('error');
      }
    },
    onSuccess: () => {
      addToast({
        type: 'success',
        text: 'Vote Recorded',
      });
    },
    ...config,
    mutationFn: votePost,
  });
};
