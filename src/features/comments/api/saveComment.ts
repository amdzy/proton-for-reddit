import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface SaveProps {
  id: string;
}

const saveComment = async ({ id }: SaveProps) => {
  const res = await axios.post(
    '/api/save',
    {},
    { params: { category: 'comment', id } }
  );
  if (res.success === false) {
    throw new Error('Failed to save comment, try again');
  }
  return res;
};

interface UseSaveCommentOptions {
  config?: MutationConfig<typeof saveComment>;
}

export const useSaveComment = ({ config }: UseSaveCommentOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onError: () => {
      addToast({
        type: 'error',
        text: 'Failed to save comment, try again',
      });
    },
    onSuccess: async () => {
      addToast({
        type: 'success',
        text: 'Comment Saved',
      });
    },
    ...config,
    mutationFn: saveComment,
  });
};
