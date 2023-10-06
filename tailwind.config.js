/** @type {import('tailwindcss').Config} */
import { withShurikenUI } from '@shuriken-ui/tailwind';
import colors from 'tailwindcss/colors';


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
      sans: ['Roboto Flex', 'sans-serif'],
      heading: ['Inter', 'sans-serif'],
      alt: ['Karla', 'sans-serif'],
      mono: ['ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        // Override only the colors you want to change
        primary: colors.amber, 
        muted: colors.neutral,
        info: colors.stone,
        success: colors.teal,
        warning: colors.amber,
        danger: colors.rose,
      },
      shurikenUi: {
        tooltip: {
          font: 'sans',
          bg: '[#f59e0b]',
          bgDark: '[#f59e0b]',
          text: 'white',
          textDark: 'white',
          minWidth: '3rem',
          maxWidth: '21rem',
        }
      },
    },
  },
});





