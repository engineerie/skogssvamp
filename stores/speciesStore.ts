// stores/speciesStore.js

import { defineStore } from "pinia";

export const useSpeciesStore = defineStore("speciesStore", {
  state: () => ({
    selectedSpecies: null,
    sourceComponent: null, // 'edna', 'edible', 'redlisted'
  }),
  actions: {
    selectSpecies(speciesData, sourceComponent) {
      this.selectedSpecies = speciesData;
      this.sourceComponent = sourceComponent;
    },
    clearSelection() {
      this.selectedSpecies = null;
      this.sourceComponent = null;
    },
  },
});
