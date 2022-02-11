import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { CommentApiRes } from '../types/CommentApiRes';

const fetchComments = async ({ queryKey }: any): Promise<any> => {
  const [id, sort, sub] = queryKey;

  const res = await axios({
    url: `/r/${sub}/comments/${id}`,
  });
  return res;
};

export const useGetComments = (id: string, sort: string, sub: string) =>
  useQuery([id, sort, sub], fetchComments);
