// export default defineNuxtPlugin({
//   setup() {
//     const authStore = useAuthStore();
//     const refreshTokenCookie = useCookie("refreshToken");

//     // Create a custom ofetch instance
//     const apiClient = $fetch.create({
//       baseURL: useRuntimeConfig().public.backendUrl,
//       retry: 1, // Optional retry logic
//       headers: {
//         Authorization: authStore.token ? `Bearer ${authStore.token}` : "",
//       },
//       onRequest({ options }) {
//         // Log requests or modify them
//         console.log("Request made:", options);
//       },
//       async onResponse({ response }) {
//         // Log responses or process them
//         console.log("Response received:", response);
//       },
//       async onResponseError({ response }) {
//         // Handle 401 errors with token refresh
//         if (response.status === 401) {
//           try {
//             await refreshAccessToken(authStore, refreshTokenCookie);

//             // Retry the failed request with the new token
//             const retryResponse = await $fetch.raw(response.url, {
//               ...response.options,
//               headers: {
//                 ...response.options?.headers,
//                 Authorization: `Bearer ${authStore.token}`,
//               },
//             });
//             return retryResponse;
//           } catch {
//             // Clear auth if refresh fails
//             authStore.clearAuth();
//             return navigateTo("/auth/login");
//           }
//         }

//         // Handle other errors
//         console.error("Error response:", response);
//         throw response;
//       },
//     });

//     // Inject the customFetch instance as $customFetch
//     return {
//       provide: {
//         apiClient,
//       },
//     };
//   },
// });
