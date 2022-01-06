import Axios, { AxiosRequestConfig } from "axios";
import { useAuthStore, useToastStore } from "@/stores";
import { handleToken } from "@/features/auth";

async function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers === undefined) {
    config.headers = {};
  }
  try {
    await handleToken();
  } catch (err) {
    console.log(err);
  }
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: "https://www.reddit.com",
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
