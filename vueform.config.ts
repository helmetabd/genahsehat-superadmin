// vueform.config.(js|ts)

import en from "@vueform/vueform/locales/en";
import bootstrap from "@vueform/vueform/dist/bootstrap";
import customPasswordField from "./components/partials/customPasswordField.vue";
import { defineConfig } from "@vueform/vueform";

export default defineConfig({
  elements: [
    customPasswordField
  ],
  theme: bootstrap,
  locales: { en },
  locale: "en",
});
