import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useSubStore, useToastStore } from '@/stores';
import { About } from '../types';

interface SubscriptionProps {
  id: string;
  action: 'sub' | 'unsub';
}

const subscription = async ({ id, action }: SubscriptionProps) => {
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

interface UseSubscriptionOptions {
  config?: MutationConfig<typeof subscription>;
  name: string;
  icon: string;
}

export const useSubscription = ({
  config,
  name,
  icon,
}: UseSubscriptionOptions) => {
  const addToast = useToastStore((state) => state.addToast);
  const addSub = useSubStore((state) => state.addSub);
  const removeSub = useSubStore((state) => state.removeSub);

  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries();
      const previousData = queryClient.getQueryData<About>(['about', name]);
      if (previousData) {
        queryClient.setQueryData(['about', name], {
          ...previousData,
          user_is_subscriber: data.action === 'sub',
        });
      }
      return { ...previousData };
    },
    onError: (err, variable, ctx: any) => {
      addToast({
        type: 'error',
        text:
          variable.action === 'sub'
            ? 'Failed to subscribe, try again'
            : 'Failed to unsubscribe, try again',
      });
      if (ctx) {
        queryClient.setQueryData(['about', name], ctx);
      }
    },
    onSuccess: async (data, variable) => {
      addToast({
        type: 'success',
        text: variable.action === 'sub' ? 'Subscribed' : 'Unsubscribed',
      });
      if (variable.action === 'sub') {
        addSub({
          name,
          icon,
          id: variable.id,
        });
      }
      if (variable.action === 'unsub') {
        removeSub(name);
      }
    },
    ...config,
    mutationFn: subscription,
  });
};
