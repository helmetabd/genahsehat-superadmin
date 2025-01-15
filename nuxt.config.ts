// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      templateParams: {
        seperator: "—", // choose a seperator
        siteName: "Genah Sehat Admin", // set a site name
      },
      meta: [
        {
          name: "description",
          content: "Genah Sehat Admin Page for managing data users",
        },
        {
          name: "keywords",
          content: "Genah Sehat, Admin, Users, Data, Management",
        },
        { name: "author", content: "IT GBNA" },
      ],
    },
  },
  css: ["~/assets/scss/config/app.scss"],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      apiKey: process.env.NUXT_API_KEY,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  particles: {
    mode: "slim",
    lazy: true,
  },
  modules: [
    "@pinia/nuxt",
    "@vueform/nuxt",
    '@vee-validate/nuxt',
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-particles",
    "nuxt-auth-utils",
  ],
});
