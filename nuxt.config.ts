import { resolve } from "path";

export default defineNuxtConfig({
  app: {
    // baseURL: '/skogssvamp/', // baseURL: '/<repository>/'
    // buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  // target: 'static',
  modules: [
    'nuxt-icons',
    '@pinia/nuxt',
  ],
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
