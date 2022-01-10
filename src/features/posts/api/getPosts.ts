import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

const fetchPosts = () => {
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
