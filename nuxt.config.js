// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/styles/main.sass',
    'biblioteca-quasar/dist/style.css'
  ],

  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/eslint-module'
  ],
  
  quasar: {
    extras: {
      fontIcons: ['material-icons']
    },

    plugins: [
      'Notify',
      'Dialog'
    ],
    config: {
      notify:{}
    }
  },

  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },

  eslint: {
    fix: true
  },
})
