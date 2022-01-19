import { useInfiniteQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { PostsApiResponse, PostType } from '../types';

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

export const useGetFeed = (page: string, sort: string) => {
  const query = useInfiniteQuery([page, sort], fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.after,
  });

  // eslint-disable-next-line arrow-body-style
  const posts = query.data?.pages.reduce((a: Array<{ data: PostType }>, b) => {
    return [...a, ...b.children];
  }, []);

  return { ...query, posts };
};
