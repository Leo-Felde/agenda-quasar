import fs from 'fs'

export default defineNuxtConfig({
  devServer: {
    host: 'agenda.teste',
    port: 3000,
    https: {
      key: fs.readFileSync('./localhost.key').toString(),
      cert: fs.readFileSync('./localhost.crt').toString(),
    },
  },
  ssr: false,
  css: [
    '~/assets/styles/main.sass',
  ],
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/eslint-module',
    '@vite-pwa/nuxt'
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

  pwa: {
    strategies: 'injectManifest',
    manifest: {
      name: 'Agenda PWA',
      short_name: 'agenda',
      description: 'App de agenda usando Nuxt PWA',
      background_color: '#fff',
      theme_color: '#1976D2',
      accent_color: '#1976D2',
      display: 'standalone',
      icons: [
        {
          src: 'icons/64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  eslint: {
    fix: true
  },
})
