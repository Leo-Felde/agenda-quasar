// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/styles/main.sass',
  ],
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/eslint-module'
  ],
  
  quasar: {
    extras: {
      fontIcons: ['material-icons']
    },
    plugins: ['Notify'],
    config: {
      notify:{}
    }
  },
  eslint: {
    fix: true
  },
})
