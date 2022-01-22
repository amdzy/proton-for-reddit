import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface UnSaveProps {
  id: string;
}

const unSavePost = async ({ id }: UnSaveProps) => {
  const res = await axios.post(
    '/api/unsave',
    {},
    { params: { category: 'post', id } }
  );
  if (res.success === false) {
    throw new Error('Failed to unsave post, try again');
  }
  return res;
};

interface UseUnSavePostOptions {
  config?: MutationConfig<typeof unSavePost>;
}

export const useUnSavePost = ({ config }: UseUnSavePostOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onError: () => {
      addToast({
        type: 'error',
        text: 'Failed to unsave post, try again',
      });
    },
    onSuccess: async () => {
      addToast({
        type: 'success',
        text: 'Post Unsaved',
      });
      // await queryClient.refetchQueries({ active: true });
    },
    ...config,
    mutationFn: unSavePost,
  });
};
