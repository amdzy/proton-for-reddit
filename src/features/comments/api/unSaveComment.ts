import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface UnSaveProps {
  id: string;
}

const unSaveComment = async ({ id }: UnSaveProps) => {
  const res = await axios.post(
    '/api/unsave',
    {},
    { params: { category: 'post', id } }
  );
  if (res.success === false) {
    throw new Error('Failed to unsave comment, try again');
  }
  return res;
};

interface UseUnSaveCommentOptions {
  config?: MutationConfig<typeof unSaveComment>;
}

export const useUnSaveComment = ({ config }: UseUnSaveCommentOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onError: () => {
      addToast({
        type: 'error',
        text: 'Failed to unsave comment, try again',
      });
    },
    onSuccess: async () => {
      addToast({
        type: 'success',
        text: 'Comment Unsaved',
      });
    },
    ...config,
    mutationFn: unSaveComment,
  });
};
