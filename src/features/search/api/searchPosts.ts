import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { PostsApiResponse } from '@/features/posts/types';

const fetchPosts = async ({ queryKey }: any): Promise<PostsApiResponse> => {
  const [query] = queryKey;

  const params = {
    type: 'post',
    q: query,
    limit: 100,
    sr_detail: true,
  };

  const res = await axios({
    url: '/search',
    params,
  });

  return res.data;
};

export const useSearchPosts = (query: string) =>
  useQuery([query, 'searchPosts'], fetchPosts);
