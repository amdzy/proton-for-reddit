import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { User } from '../types';

const fetchAbout = async ({ queryKey }: any): Promise<User> => {
  const [key, userName] = queryKey;
  const res = await axios({
    url: `/user/${userName}/about`,
  });
  return res.data;
};

export const useGetUserAbout = (userName: string) =>
  useQuery(['aboutUser', userName], fetchAbout);
