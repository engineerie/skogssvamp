import { resolve } from "path";

export default defineNuxtConfig({
  image: {
    provider: 'netlify'    },
  app: {
    ssr: false, // Disable Server-Side rendering
    target: 'static' // Set the deployment target to static
    // baseURL: '/skogssvamp/', // baseURL: '/<repository>/'
    // buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  // target: 'static',
  modules: [
    'nuxt-mapbox',
    'nuxt-icons',
    '@pinia/nuxt',
    '@nuxt/ui',
    'vue3-carousel-nuxt',
    'nuxt-swiper',
    '@nuxt/image',
  ],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZW5naW5lZXJpZWUiLCJhIjoiY2xyZzluNThyMGRuaDJsbzJhbWJoN2YwayJ9._ex2Twr8a9YSL7fyJDA-kA',
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  extends: [
    '@shuriken-ui/nuxt'
  ],
  alias: {
    '@': resolve(__dirname, "/"),
  },
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
