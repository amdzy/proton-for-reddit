import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface VoteCommentProps {
  id: string;
  dist: number;
}

const voteComment = async ({ id, dist }: VoteCommentProps) => {
  const res = await axios.post('/api/vote', {}, { params: { dir: dist, id } });
  if (res.json && res.json.errors) {
    throw new Error('Failed to vote, try again');
  }
  return res;
};

interface UseVoteCommentOptions {
  config?: MutationConfig<typeof voteComment>;
}

export const useVoteComment = ({ config }: UseVoteCommentOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onError: () => {
      addToast({
        type: 'error',
        text: 'Failed to vote, try again',
      });
    },
    onSuccess: async (data, variables) => {
      if (variables.dist === 1) {
        addToast({
          type: 'success',
          text: 'UpVoted',
        });
      } else if (variables.dist === -1) {
        addToast({
          type: 'success',
          text: 'DownVoted',
        });
      } else {
        addToast({
          type: 'success',
          text: 'Removed Vote',
        });
      }
    },
    ...config,
    mutationFn: voteComment,
  });
};
