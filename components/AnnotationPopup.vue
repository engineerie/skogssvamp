<template>
  <div class="p-2 w-64 bg-neutral-50 rounded-lg">
    <NuxtImg
      width="400"
      :src="annotation.thumbnail"
      :alt="annotation.title"
      class="rounded-xl w-fit"
    />
    <h3 class="text-md font-medium text-neutral-800">{{ annotation.title }}</h3>
    <p class="text-md font-normal text-neutral-500">{{ annotation.text }}</p>
    <button class="close-button" @click="closePopup">Close</button>
  </div>
</template>

<script setup>
import { useAnnotationStore } from "~/stores/annotationStore";

const props = defineProps({
  annotation: {
    type: Object,
    required: true,
  },
});

const annotationStore = useAnnotationStore();

function closePopup() {
  console.log("[AnnotationPopup] closePopup button clicked.");
  // When the user clicks Close, update the store.
  annotationStore.closePopup();
  // Optionally log after store update.
  console.log(
    "[AnnotationPopup] annotationStore.activeAnnotation:",
    annotationStore.activeAnnotation
  );
}
</script>
