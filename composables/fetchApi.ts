import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    onResponse({ response }) {
      console.log("Response received composable:", response);
      const responseData = response._data as {
        data: any | any[];
        message: string;
        statusCode: number;
      };
      return responseData;
    },
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}
