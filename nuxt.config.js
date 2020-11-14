export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fa'
    },
    title: 'Coleus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/mixins/common.js',
    { src: '~/plugins/progressive-image.js', mode: 'client' },
    '~/plugins/common.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    { path: '~/components/', prefix: 'coleus' },
    { path: '~/components/svg/', prefix: 'coleus-svg' }
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/components',
    ['@nuxtjs/google-analytics', { id: process.env.GOOGLE_ANALYTICS_ID }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    apiPrefix: 'api'
  },

  pwa: {
    meta: {
      name: 'Coleus',
      author: 'Amirmasoud Sheydaei',
      theme_color: '#ffffff',
      lang: 'fa',
      ogHost: process.env.BASE_URL || 'http://coleus.test',
      nativeUI: true
    },
    manifest: {
      name: 'Coleus',
      lang: 'fa'
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  publicRuntimeConfig: {
    appLocale: process.env.APP_LOCALE || 'fa',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  privateRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
  }
}
