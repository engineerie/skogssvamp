// comparisonStore.ts
import { defineStore } from 'pinia';

export const useComparisonStore = defineStore({
  id: 'comparisonStore',
  state: () => ({
    environments: [],
  }),
  actions: {
    addEnvironment(environment) {
      this.environments.push(environment);
    },
    clearEnvironments() {
      this.environments = [];
    }
  },
});
