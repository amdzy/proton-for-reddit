import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface UnSaveProps {
  id: string;
}

const unSavePost = async ({ id }: UnSaveProps) => {
  const res = (await axios.post('/api/unsave', {
    category: 'post',
    id,
  })) as any;
  if (!res.sucess) {
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
    onSuccess: () => {
      queryClient.refetchQueries({ active: true });
      addToast({
        type: 'success',
        text: 'Post Unsaved',
      });
    },
    ...config,
    mutationFn: unSavePost,
  });
};
