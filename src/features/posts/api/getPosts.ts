import { axios } from "@/lib/axios";
import { AxiosPromise } from "axios";
import { useQuery } from "react-query";
import { PostType } from "../types";

interface ApiResponse {
  after: string;
  before?: string;
  dist: number;
  children: Array<{
    data: PostType;
  }>;
}

const fetchPosts = (): AxiosPromise<ApiResponse> => {
  return axios({
    url: "/hot",
    params: {
      limit: 100,
    },
  });
};

export const useGetPosts = () => {
  return useQuery(["postsBest"], fetchPosts);
};
