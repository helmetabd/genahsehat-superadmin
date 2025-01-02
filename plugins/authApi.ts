// export default defineNuxtPlugin({
//   setup() {
//     const authStore = useAuthStore();
//     const refreshTokenCookie = useCookie("refreshToken");

//     // Create a custom ofetch instance
//     const authApi = $fetch.create({
//       baseURL: useRuntimeConfig().public.backendUrl,
//       retry: 1, // Optional retry logic
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "X-Api-Key": useRuntimeConfig().apiKey,
//       },
//       onRequest({ options }) {
//         // Log requests or modify them
//         console.log("Request made:", options);
//       },
//       async onRequestError({ request, options, error }) {
//         console.log("[fetch request error]", request, error);
//         return Promise.reject(error);
//       },
//       async onResponse({ request, response, options }) {
//         // Log responses or process them
//         console.log("Response received:", response);
//       },
//       async onResponseError({ request, options, response }) {
//         // Handle 401 errors with token refresh
//         // if (response.status === 401) {
//         //   try {
//         //     await refreshAccessToken(authStore, refreshTokenCookie);
//         //     // Retry the failed request with the new token
//         //     const retryResponse = await $fetch.raw(response.url, {
//         //       ...response.options,
//         //       headers: {
//         //         ...response.options?.headers,
//         //         Authorization: `Bearer ${authStore.token}`,
//         //       },
//         //     });
//         //     return retryResponse;
//         //   } catch {
//         //     // Clear auth if refresh fails
//         //     authStore.clearAuth();
//         //     return navigateTo("/auth/login");
//         //   }
//         // }
//         // Handle other errors
//         console.error("Error response:", response);
//         throw response;
//       },
//     });

//     // Inject the customFetch instance as $customFetch
//     return {
//       provide: {
//         authApi,
//       },
//     };
//   },
// });
