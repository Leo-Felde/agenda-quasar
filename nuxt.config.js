// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  generate: {
    dir: '/src-cordova/www'
  },
  build: {
    publicPath: '/src-cordova/www',
  },
  scripts: [
    {
      src: '/cordova.js',
      type: 'text/javascript',
    },
  ],
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
