import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface SaveProps {
  id: string;
}

const savePost = async ({ id }: SaveProps) => {
  const res = (await axios.post('/api/save', {
    category: 'post',
    id,
  })) as any;
  if (!res.sucess) {
    throw new Error('Failed to save post, try again');
  }
  return res;
};

interface UseSavePostOptions {
  config?: MutationConfig<typeof savePost>;
}

export const useSavePost = ({ config }: UseSavePostOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries();
    },
    onError: (err: any) => {
      addToast({
        type: 'error',
        text: err,
      });
    },
    onSuccess: () => {
      addToast({
        type: 'success',
        text: 'Post Saved',
      });
    },
    ...config,
    mutationFn: savePost,
  });
};
