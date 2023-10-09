// comparisonStore.ts
import { defineStore } from 'pinia';

export const useComparisonStore = defineStore({
  id: 'comparisonStore',
  state: () => ({
    environments: [],
  }),
  actions: {
    addEnvironment(environment) {
        if (this.environments.length >= 5) {
            // Possibly display a message to the user about max number of environments reached
            console.log('Maximum number of environments reached');
            return;
          }
      this.environments.push(environment);
    },
    clearEnvironments() {
      this.environments = [];
    },
    removeEnvironment(index) {
        this.environments.splice(index, 1);
    },
  },

});
