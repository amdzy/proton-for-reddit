import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useToastStore } from '@/stores';

interface FollowUserProps {
  id: string;
  action: 'sub' | 'unsub';
}

const followUser = async ({ id, action }: FollowUserProps) => {
  //   const res = await axios.put(`/api/v1/me/friends/${name}`, {
  //     json: {
  //       name,
  //       note: 'Added using Proton',
  //     },
  //   });
  const res = await axios.post(
    '/api/subscribe',
    {},
    { params: { action, sr: id } }
  );
  if (res.success === false) {
    throw new Error('Error');
  }
  return res;
};

interface UseFollowUserOptions {
  config?: MutationConfig<typeof followUser>;
  name: string;
}

export const useFollowUser = ({ config, name }: UseFollowUserOptions) => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries();
      const previousData = queryClient.getQueryData<any>(['aboutUser', name]);
      //   if (previousData) {
      //     queryClient.setQueryData(['about', name], {
      //       ...previousData,
      //       user_is_subscriber: data.action === 'sub',
      //     });
      //   }
      return { ...previousData };
    },
    onError: (err, variable, ctx: any) => {
      addToast({
        type: 'error',
        text:
          variable.action === 'sub'
            ? 'Failed to follow, try again'
            : 'Failed to unfollow, try again',
      });
      if (ctx) {
        queryClient.setQueryData(['aboutUser', name], ctx);
      }
    },
    onSuccess: async (data, variable) => {
      addToast({
        type: 'success',
        text: variable.action === 'sub' ? 'Followed User' : 'Unfollowed User',
      });
    },
    ...config,
    mutationFn: followUser,
  });
};
