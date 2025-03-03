// stores/annotationStore.js
import { defineStore } from "pinia";

export const useAnnotationStore = defineStore("annotation", {
  state: () => ({
    activeAnnotation: null,
    activeOverlay: null,
  }),
  actions: {
    openPopup(annotation, overlay) {
      console.log("[annotationStore] openPopup:", annotation);
      this.activeAnnotation = annotation;
      this.activeOverlay = overlay;
    },
    closePopup() {
      console.log("[annotationStore] closePopup invoked.");
      this.activeAnnotation = null;
    },
    clearOverlay() {
      console.log("[annotationStore] clearOverlay invoked.");
      this.activeOverlay = null;
    },
  },
});
