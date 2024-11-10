<template>
  <div
    class="fixed top-0 right-0 h-full w-80 border-l dark:border-neutral-700 border-neutral-300 z-50 shadow-lg shadow-neutral-300 dark:shadow-neutral-800"
  >
    <!-- Transparent Top Section -->
    <!-- <div class="h-14 bg-transparent pointer-events-none"></div> -->

    <!-- Sidebar Content with Background -->
    <div
      class="relative bg-neutral-100 dark:bg-neutral-800 h-full pointer-events-auto overflow-y-auto pb-14"
    >
      <div class="p-5">
        <div class="flex justify-between items-end mb-2">
          <BaseHeading size="3xl" weight="thin" class="-mb-1.5"
            >Artinformation</BaseHeading
          >
          <BaseButtonIcon
            shape="full"
            size="md"
            @click="$emit('close')"
            class=""
          >
            <Icon name="mdi:chevron-right" class="size-6" />
          </BaseButtonIcon>
        </div>
        <!-- Display species information based on source -->
        <component :is="infoComponent" :species="species" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

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
