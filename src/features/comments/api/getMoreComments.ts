import { axios } from '@/lib/axios';

export const fetchMoreComments = async (
  id: string,
  children: string
): Promise<any> => {
  const res = await axios({
    url: `api/morechildren.json`,
    params: {
      link_id: id,
      api_type: 'json',
      children,
      limit_children: true,
      profile_img: true,
    },
  });
  return res;
};
