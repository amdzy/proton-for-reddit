import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { CommunitiesRes } from '../types';

const fetchCommunities = async ({ queryKey }: any): Promise<CommunitiesRes> => {
  const [query] = queryKey;

  const params = {
    type: 'sr',
    q: query,
    limit: 50,
  };

  const res = await axios({
    url: '/search',
    params,
  });

  return res.data;
};

export const useSearchCommunities = (query: string) =>
  useQuery([query, 'search'], fetchCommunities, {
    enabled: false,
    keepPreviousData: true,
  });
