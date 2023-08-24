const path = require('path')

export default defineNuxtConfig({
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'dist')
    }
  },
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
    plugins: [
      'Notify',
      'Dialog'
    ],
    config: {
      notify:{}
    }
  },
  eslint: {
    fix: true
  },
})
