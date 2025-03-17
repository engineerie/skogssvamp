import colors from "tailwindcss/colors";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    // fontFamily: {
    //   sans: ["Roboto Flex", "sans-serif"],
    //   heading: ["Inter", "sans-serif"],
    //   alt: ["Karla", "sans-serif"],
    //   mono: ["ui-monospace", "monospace"],
    // },
    extend: {
      colors: {
        primary: colors.green,
        muted: colors.neutral,
        info: colors.yellow,
        success: colors.teal,
        warning: colors.violet,
        danger: colors.rose,
      },
    },
  },
  plugins: [],
};
