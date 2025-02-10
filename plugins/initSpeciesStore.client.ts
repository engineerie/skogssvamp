import { defineNuxtPlugin } from "#app";
import { useSpeciesStore } from "~/stores/speciesStore";

export default defineNuxtPlugin((nuxtApp) => {
  const speciesStore = useSpeciesStore();
  speciesStore.loadSavedSpecies();
});
