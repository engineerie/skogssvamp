/** @type {import('tailwindcss').Config} */
import { withShurikenUI } from "@shuriken-ui/tailwind";
import colors from "tailwindcss/colors";

export default withShurikenUI({
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto Flex", "sans-serif"],
      heading: ["Inter", "sans-serif"],
      alt: ["Karla", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        // Override only the colors you want to change
        primary: colors.green,
        muted: colors.neutral,
        info: colors.yellow,
        success: colors.teal,
        warning: colors.violet,
        danger: colors.rose,
      },
      shurikenUi: {
        tooltip: {
          font: "sans",
          bg: "[#22c55e]",
          bgDark: "[#22c55e]",
          text: "white",
          textDark: "white",
          minWidth: "3rem",
          maxWidth: "21rem",
        },
      },
    },
  },
});
