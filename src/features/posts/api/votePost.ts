import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface VotePostProps {
  id: string;
  dist: number;
}

const votePost = async ({ id, dist }: VotePostProps) => {
  const res = await axios.post('/api/vote', {
    dir: dist,
    id,
  });
  if (res.json && res.json.errors) {
    throw new Error('Failed to vote, try again');
  }
  return res;
};

interface UseVotePostOptions {
  config?: MutationConfig<typeof votePost>;
}

export const useVotePost = ({ config }: UseVotePostOptions) => {
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
    onSuccess: async () => {
      addToast({
        type: 'success',
        text: 'Vote Recorded',
      });
      await queryClient.refetchQueries({ active: true });
    },
    ...config,
    mutationFn: votePost,
  });
};

// const previousData = queryClient.getQueryData<{
//   pages: Array<PostsApiResponse>;
// }>([page, sort]);

// const newData = previousData?.pages.map((page) => {
//   page.children.map((post) => {
//     if (post.data.name === data.id) {
//       post.data.likes = true;
//     }
//     return post;
//   });
//   return page;
// });

// queryClient.setQueryData([page, sort], {
//   ...previousData,
//   pages: newData,
// });

// return { previousData: { ...previousData } };
