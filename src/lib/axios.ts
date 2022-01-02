import Axios, { AxiosRequestConfig } from "axios";
import { useToastStore } from "@/stores";

function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: "",
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const text = error.response?.data?.message || error.message;
    useToastStore.getState().addToast({
      type: "error",
      text,
    });

    return Promise.reject(error);
  }
);
