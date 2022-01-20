import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { About } from '../types';

const fetchAbout = async ({ queryKey }: any): Promise<About> => {
  const [key, page] = queryKey;
  const res = await axios({
    url: `/r/${page}/about`,
  });
  return res.data;
};

export const useGetSubAbout = (page: string) =>
  useQuery(['about', page], fetchAbout);
