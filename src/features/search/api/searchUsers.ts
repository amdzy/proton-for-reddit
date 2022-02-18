import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { UsersRes } from '../types';

const fetchUsers = async ({ queryKey }: any): Promise<UsersRes> => {
  const [query] = queryKey;

  const params = {
    type: 'user',
    q: query,
    limit: 100,
  };

  const res = await axios({
    url: '/search',
    params,
  });

  return res.data;
};

export const useSearchUsers = (query: string) =>
  useQuery([query, 'searchPosts'], fetchUsers);
