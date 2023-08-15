// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/styles/main.sass',
  ],
  // devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/eslint-module'
  ],
  eslint: {
    fix: true
  },
})
