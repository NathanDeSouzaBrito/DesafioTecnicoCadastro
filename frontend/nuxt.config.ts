// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      title: "MTN - CRUD",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
