import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("token");

  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.backendUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    onRequest({ request, options, error }) {
      if (
        ["/login", "/signup", "/forgot-password", "/logout"].some((route) =>
          request.toString().includes(route)
        )
      ) {
        // console.log(request);
        options.headers.set("X-Api-Key", useRuntimeConfig().public.apiKey); // Add the secret API key
      } else if (token.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set("Authorization", `Bearer ${token.value}`);
      } else {
        throw error
      }
      //  else {
      //   console.log("No token found in session", useRuntimeConfig().apiKey);

      //   options.headers.set("X-Api-Key", useRuntimeConfig().apiKey);
      // }
    },
    onRequestError({ request, options, error }) {
      console.error("Request error", error);
    },
    onResponse({ response }) {
      // console.log("Response received api:", response);
      //   const responseData = response._data as {
      //     data: any | any[];
      //     message: string;
      //     statusCode: number;
      //   };
      // Process the response data here if needed
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        localStorage.clear();
        Swal.fire(
          "Session invalid",
          "Sesi anda telah berahir / Anda login di perangkat lain!",
          "error"
        ).then(async (e) => {
          if (e.isConfirmed) {
            await navigateTo("/auth/login");
          }
        });
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
