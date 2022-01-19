import { useInfiniteQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { PostsApiResponse } from '../types';

const fetchPosts = async ({
  pageParam,
  queryKey,
}: any): Promise<PostsApiResponse> => {
  const [page, sort] = queryKey;
  if (page === 'home') {
    const res = await axios({
      url: `/${sort}`,
      params: {
        limit: 25,
        after: pageParam,
      },
    });

    return res.data;
  }

  const res = await axios({
    url: `/r/${page}/${sort}`,
    params: {
      limit: 25,
      after: pageParam,
    },
  });
  return res.data;
};

export const useGetFeed = (page: string, sort: string) =>
  useInfiniteQuery([page, sort], fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.after,
  });
