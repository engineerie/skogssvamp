<template>
  <div class="flex flex-col h-full" @click.stop ref="panelRef">
    <!-- Display species information based on source -->
    <component :is="infoComponent" :species="species" />

    <!-- Hidden loop to preload all images from manifest.json -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import EdnaSpeciesInfo from "~/components/EdnaSpeciesInfo.vue";
import EdibleSpeciesInfo from "~/components/EdibleSpeciesInfo.vue";
import RedlistedSpeciesInfo from "~/components/RedlistedSpeciesInfo.vue";

const props = defineProps({
  species: Object,
  source: String,
});

const emit = defineEmits(["close"]);

// Dynamically select the component based on source
const infoComponent = computed(() => {
  switch (props.source) {
    case "edna":
      return EdnaSpeciesInfo;
    case "edible":
      return EdibleSpeciesInfo;
    case "redlisted":
      return RedlistedSpeciesInfo;
    default:
      return null;
  }
});
</script>

<style scoped>
#scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#scrollbar::-webkit-scrollbar-thumb {
  display: none;
  background-color: #6f202033; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: medium;
  scrollbar-color: #88888800 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out; /* transition effect for Firefox */
}
</style>
