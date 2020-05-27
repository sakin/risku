export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/uuid.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBs1V_qQaA2-p048cC51badY9UPOR2stOg",
          authDomain: "risku-68279.firebaseapp.com",
          databaseURL: "https://risku-68279.firebaseio.com",
          projectId: "risku-68279",
          storageBucket: "risku-68279.appspot.com",
          messagingSenderId: "730584144273",
          appId: "1:730584144273:web:cdb43759efb010e0cd6230",
          measurementId: "G-JNMKHT0ZEH"
        },
        services: {
          auth: {
            persistence: "local",
            initialize: {
              // onAuthStateChangedMutation: "user/SET_AUTH_USER",
              onAuthStateChangedMutation: null,
              onAuthStateChangedAction: "user/onAuthStateChangedAction"
            },
            ssr: false
          }, 
          firestore: true,
          storage: true,
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  // build: {
  //   /*
  //   ** You can extend webpack config here
  //   */
  //   extend (config, ctx) {
  //   }
  // }
  build: {
    postcss: { preset: { stage: 0 } }
  }
};
