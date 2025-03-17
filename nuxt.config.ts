// import { resolve } from "path";
// import fs from "fs";
// import path from "path";

// const manifestPath = path.resolve("public/imagemanifest/manifest.json");
// let images: string[] = [];

// if (fs.existsSync(manifestPath)) {
//   const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
//   const categories = ["Giftsvampar", "Matsvampar", "RödlistadeSvampar"];

//   categories.forEach((category) => {
//     if (manifest[category]) {
//       manifest[category].forEach((fileName: string) => {
//         images.push(`/images/svampbilder/${category}/${fileName}`);
//       });
//     }
//   });
// } else {
//   console.warn("Manifest file not found at:", manifestPath);
// }

export default defineNuxtConfig({
  // extends: ["@shuriken-ui/nuxt"],
  // runtimeConfig: {
  //   public: {
  //     geeClientId: process.env.GEE_CLIENT_ID,
  //     geeClientSecret: process.env.GEE_CLIENT_SECRET,
  //     images,
  //   },
  // },

  // ui: {
  //   primary: "gray",
  //   gray: "neutral",
  //   icons: ["material-symbols", "fluent"],
  // },

  // app: {
  //   ssr: false,
  //   target: "static",
  // },

  // tailwindcss: {
  //   configPath: "~/tailwind.config.js",
  // },

  modules: [
    "nuxt-mapbox",
    "nuxt-icons",
    "@pinia/nuxt",
    "@nuxt/ui",
    "vue3-carousel-nuxt",
    "nuxt-swiper",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss", // Add this line
  ],

  // colorMode: {
  //   preference: "light",
  //   fallback: "light",
  //   globalName: "__NUXT_COLOR_MODE__",
  //   componentName: "ColorScheme",
  //   classPrefix: "",
  //   classSuffix: "-mode",
  //   storage: false,
  //   storageKey: "nuxt-color-mode",
  // },

  mapbox: {
    accessToken:
      "pk.eyJ1IjoiZW5naW5lZXJpZWUiLCJhIjoiY2xyZzluNThyMGRuaDJsbzJhbWJoN2YwayJ9._ex2Twr8a9YSL7fyJDA-kA",
  },

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  // alias: {
  //   "@": resolve(__dirname, "/"),
  // },

  css: ["~/assets/main.css"],
  devtools: { enabled: true },

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },

  compatibilityDate: "2025-03-05",
});
