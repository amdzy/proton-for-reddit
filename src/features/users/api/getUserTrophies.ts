import { useQuery } from 'react-query';
import { SubModerated, SubModeratedRes, Trophies, TrophiesRes } from '../types';

const fetchTrophies = async ({
  queryKey,
}: any): Promise<{
  trophies: Array<{ data: Trophies }>;
  mods: Array<SubModerated>;
}> => {
  const [key, userName] = queryKey;
  const [trophiesRes, modRes] = await Promise.all([
    fetch(`https://www.reddit.com/user/${userName}/trophies.json?raw_json=1`),
    fetch(
      `https://www.reddit.com/user/${userName}/moderated_subreddits.json?raw_json=1`
    ),
  ]);
  const [trophiesData, modData]: [TrophiesRes, SubModeratedRes] =
    await Promise.all([trophiesRes.json(), modRes.json()]);
  return {
    trophies: trophiesData.data.trophies,
    mods: modData.data,
  };
};

export const useGetUserTrophies = (userName: string) =>
  useQuery(['trophies', userName], fetchTrophies);
