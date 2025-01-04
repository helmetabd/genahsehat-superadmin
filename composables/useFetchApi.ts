import { useFetch } from "nuxt/app";
type UseFetchType = typeof useFetch;

export const useFetchApi: UseFetchType = (path, options = {}) => {
  const baseUrl = useRuntimeConfig().public.backendUrl;
  options.baseURL = baseUrl;
  options.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore().token}`,
  };
  options.onResponse = ({ response }) => {
    console.log("Response received:", response);
    const responseData = response._data as { data: any | any[], message: string, statusCode: number };
    return responseData;
  }
  options.onRequest = ({ options }) => {
    console.log("Request made:", options);
  }
  return useFetch(path, options);
};
