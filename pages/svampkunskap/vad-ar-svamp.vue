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
    <h1 id="intro" size="2xl" weight="semi-bold" class="mb-4">Introduction</h1>
    <p>Some introductory text...</p>

    <h1 id="morphology" size="2xl" weight="semi-bold" class="mb-4">
      Morphology
    </h1>
    <p>Details about morphology...</p>

    <h1 id="ecology" size="2xl" weight="semi-bold" class="mb-4">Ecology</h1>
    <p>Details about ecology...</p>

    <h1 id="conclusion" size="2xl" weight="semi-bold" class="mb-4">
      Conclusion
    </h1>
    <p>Final thoughts...</p>
  </section>
</template>
