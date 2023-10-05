// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  target: 'static',
  router: {
    base: '/skogssvamp/'
  },
  modules: [
    'nuxt-icons',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
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
})


