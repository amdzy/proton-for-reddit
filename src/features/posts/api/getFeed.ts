import { useInfiniteQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { PostsApiResponse } from '../types';

const fetchPosts = async ({
  pageParam,
  queryKey,
}: any): Promise<PostsApiResponse> => {
  const [Key, sort] = queryKey;
  const res = await axios({
    url: `/${sort}`,
    params: {
      limit: 25,
      after: pageParam,
    },
  });
  return res.data;
};

export const useGetFeed = (sort: string) =>
  useInfiniteQuery(['feed', sort], fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.after,
  });
