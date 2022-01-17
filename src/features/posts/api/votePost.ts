/* eslint-disable no-param-reassign */
import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useSettingsStore, useToastStore } from '@/stores';

interface VotePostProps {
  id: string;
  dist: number;
}

const votePost = ({ id, dist }: VotePostProps) => Promise.resolve();

interface UseCreateCommentOptions {
  postId: string;
  page?: string;
  config?: MutationConfig<typeof votePost>;
}

export const useVotePost = ({
  config,
  postId,
  page,
}: UseCreateCommentOptions) => {
  const addToast = useToastStore((state) => state.addToast);
  const sort = useSettingsStore((state) => state.posts.feedSort);

  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries();
    },
    onError: (_, __, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData([page, sort], context.previousComments);
      }
    },
    onSuccess: () => {
      // queryClient.refetchQueries([page, sort]);
      addToast({
        type: 'success',
        text: 'Vote Recorded',
      });
    },
    ...config,
    mutationFn: votePost,
  });
};
