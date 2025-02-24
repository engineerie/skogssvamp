<script setup lang="ts">
import { onMounted, onActivated } from "vue";
import { useTocStore } from "~/stores/toc";

// Get the TOC store.
const tocStore = useTocStore();

// Define the manual TOC for this page.
const manualToc = [
  { id: "intro", text: "Introduction" },
  { id: "morphology", text: "Morphology" },
  { id: "ecology", text: "Ecology" },
  { id: "conclusion", text: "Conclusion" },
];

// Set the TOC when the page is first mounted.
onMounted(() => {
  tocStore.setItems(manualToc);
});

// Also set (or reset) the TOC whenever the page becomes active.
onActivated(() => {
  tocStore.setItems(manualToc);
});
</script>

<template>
  <section>
    <BaseHeading id="intro" size="2xl" weight="semi-bold" class="mb-4">
      Introduction
    </BaseHeading>
    <p>Some introductory text...</p>

    <BaseHeading id="morphology" size="2xl" weight="semi-bold" class="mb-4">
      Morphology
    </BaseHeading>
    <p>Details about morphology...</p>

    <BaseHeading id="ecology" size="2xl" weight="semi-bold" class="mb-4">
      Ecology
    </BaseHeading>
    <p>Details about ecology...</p>

    <BaseHeading id="conclusion" size="2xl" weight="semi-bold" class="mb-4">
      Conclusion
    </BaseHeading>
    <p>Final thoughts...</p>
  </section>
</template>
