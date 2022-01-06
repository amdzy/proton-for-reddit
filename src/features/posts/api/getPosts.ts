import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

const fetchPosts = () => {
  console.log("ran");
  return axios({
    url: "/best",
    params: {
      limit: 30,
    },
  });
};

export const useGetPosts = () => {
  return useQuery(["postsBest"], fetchPosts);
};