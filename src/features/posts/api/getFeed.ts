import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';
import { axios } from '@/lib/axios';
import { PostsApiResponse, PostType } from '../types';

const fetchPosts = async ({
  pageParam,
  queryKey,
}: any): Promise<PostsApiResponse> => {
  const [page, sort] = queryKey;
  const params = {
    limit: 25,
    after: pageParam,
    sr_detail: true,
  };

  if (page === 'home') {
    const res = await axios({
      url: `/${sort}`,
      params,
    });

    return res.data;
  }

  const res = await axios({
    url: `/r/${page}/${sort}`,
    params,
  });
  return res.data;
};

export const useGetFeed = (page: string, sort: string) => {
  const query = useInfiniteQuery([page, sort], fetchPosts, {
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
