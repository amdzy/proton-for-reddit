import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
// import { CommentApiRes } from '../types/CommentApiRes';

const fetchComments = async ({ queryKey }: any): Promise<any> => {
  const [id, sub] = queryKey;

  const res = await axios({
    url: `/r/${sub}/comments/${id}`,
  });
  return res;
};

export const useGetComments = (id: string, sub: string) =>
  useQuery([id, sub], fetchComments);
