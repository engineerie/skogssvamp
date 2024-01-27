// stores/forestStore.ts
import { defineStore } from 'pinia';

export const useForestStore = defineStore({
  id: 'forest',
  state: () => ({
    time: 'before', // Possible values: 'before', 'after', '80years'
  }),
  getters: {
    currentImage: (state) => {
      return `/images/${state.time}.jpg`; // Path to the image based on the time
    }
  }
});
