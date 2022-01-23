import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';
import { axios } from '@/lib/axios';
import { PostsApiResponse, PostType } from '@/features/posts/types';

const fetchPosts = async ({
  pageParam,
  queryKey,
}: any): Promise<PostsApiResponse> => {
  const [key, name] = queryKey;

  const res = await axios({
    url: `/user/${name}/submitted`,
    params: {
      limit: 25,
      after: pageParam,
      sr_detail: true,
    },
  });

  return res.data;
};

export const useGetUserPosts = (name: string) => {
  const query = useInfiniteQuery(['userPosts', name], fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.after,
  });

  const posts = useMemo(
    () =>
      query.data?.pages.reduce(
        (a: Array<{ data: PostType }>, b) => [...a, ...b.children],
        []
      ),
    [query.data?.pages]
  );

  return { ...query, posts };
};
