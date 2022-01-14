import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";
import { PostsApiResponse, PostType } from "../types";

const fetchPosts = async ({
  pageParam,
  queryKey,
}: any): Promise<PostsApiResponse> => {
  const [_key, sort] = queryKey;
  const res = await axios({
    url: `/${sort}`,
    params: {
      limit: 25,
      after: pageParam,
    },
  });
  return res.data;
};

export const useGetFeed = (sort: string) => {
  return useInfiniteQuery(["feed", sort], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.after,
  });
};
