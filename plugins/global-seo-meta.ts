export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:rendered", () => {
    const route = useRoute();
    useHead({
      titleTemplate: () => {
        if (
          ["/login", "/signup", "/forgot-password", "/logout"].some((path) =>
            route.path.toString().includes(path)
          )
        ) {
          return `%siteName`;
        } else {
          return `%s %separator %siteName`;
        }
      },
    });
  });
});
