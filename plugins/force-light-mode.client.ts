// /plugins/force-light-mode.client.ts

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  if (process.client) {
    const colorMode = useColorMode();

    // Log the current color mode preference before any changes
    const currentPreference = colorMode.value;
    console.log(
      "🔍 [ColorMode Plugin] Current 'nuxt-color-mode' before setting:",
      currentPreference
    );

    // Overwrite any existing preference in localStorage
    localStorage.setItem("nuxt-color-mode", "light");

    // Force light mode by setting the preference to 'light'
    colorMode.value = "light";

    // Disable system preference detection
    colorMode.system = false;

    // Remove 'dark' class and add 'light' class to enforce light mode
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");

    // Log the color mode preference after setting it to 'light'
    const updatedPreference = colorMode.value;
    console.log(
      "✅ [ColorMode Plugin] 'nuxt-color-mode' after setting to 'light':",
      updatedPreference
    );
  }
});
