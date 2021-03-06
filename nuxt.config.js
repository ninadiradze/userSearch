export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'userSearch',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],
  /*
   ** Global SCSS Variables
   */
  styleResources: {
    scss: ['./assets/scss/common/_variables.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
    // '@nuxtjs/eslint-module'
  ],
  /*
 ** Axios module configuration
 ** See https://axios.nuxtjs.org/options
 */
  axios: {
    baseURL: process.env.API_URL,
    proxy: true
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
