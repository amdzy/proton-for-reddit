import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

const fetchPosts = () => {
  return axios({
    url: "/best",
    params: {
      limit: 25,
    },
  });
};

export const useGetPosts = () => {
  return useQuery(["postsBest"], fetchPosts);
};
