<template>
  <div class="flex relative">
    <!-- Left Vertical Navigation Column -->
    <div class="sticky top-20 w-64 h-full z-40 flex-shrink-0">
      <CustomVerticalNavigation :links="navLinks" />
    </div>

    <!-- Main Content Container (scrollable) -->
    <div ref="contentContainer" class="p-8 min-h-[calc(100vh-80px)] flex-grow">
      <NuxtPage />

      <!-- Navigation Buttons with Page Titles -->
      <div class="grid grid-cols-2 mt-8 gap-6">
        <!-- Previous Link -->
        <div class="w-full">
          <NuxtLink
            v-if="prevPage"
            :to="prevPage.to"
            class="group flex items-center p-6 border border-neutral-200 bg-transparent hover:bg-neutral-50 rounded-xl text-neutral-500 w-full gap-4"
          >
            <!-- Centered icon container -->
            <div
              class="transition-all flex items-center justify-center size-10 rounded-full border border-neutral-200 p-2 bg-neutral-50 group-hover:border-green-500 group-hover:text-green-500"
            >
              <Icon name="heroicons:arrow-left" class="size-6" />
            </div>
            <div class="flex-1">
              {{ prevPage.label }}
            </div>
          </NuxtLink>
        </div>

        <div class="w-full">
          <!-- Next Link -->
          <NuxtLink
            v-if="nextPage"
            :to="nextPage.to"
            class="group flex items-center p-6 border border-neutral-200 bg-transparent hover:bg-neutral-50 rounded-xl text-neutral-500 w-full gap-4 justify-end"
          >
            <div class="flex-1 text-right">
              {{ nextPage.label }}
            </div>
            <!-- Added rounded icon container for the next button -->
            <div
              class="transition-all flex items-center justify-center size-10 rounded-full border border-neutral-200 p-2 bg-neutral-50 group-hover:border-green-500 group-hover:text-green-500"
            >
              <Icon name="heroicons:arrow-right" class="size-6" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Right Table of Contents Column -->
    <div class="w-64 p-4 sticky top-20 flex-shrink-0 h-full">
      <ClientOnly>
        <TableOfContents :items="tocStore.items" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTocStore } from "~/stores/toc";
import TableOfContents from "~/components/TableOfContents.vue";

const tocStore = useTocStore();
const route = useRoute();

// Navigation links for the left nav:
const navLinks = [
  { label: "Översikt", to: "/svampkunskap/oversikt" },
  { label: "Vad är svamp", to: "/svampkunskap/vad-ar-svamp" },
  { label: "Vad är mykorrhiza", to: "/svampkunskap/vad-ar-mykorrhiza" },
  {
    label: "Vilken betydelse har mykorrhiza",
    to: "/svampkunskap/vilken-betydelse-har-mykorrhiza",
  },
  {
    label: "Vilka svampar är mykorrhizasvampar",
    to: "/svampkunskap/vilka-svampar-ar-mykorrhizasvampar",
  },
  {
    label: "Vilka träd har mykorrhiza",
    to: "/svampkunskap/vilka-trad-har-mykorrhiza",
  },
  {
    label: "Hur många arter finns det",
    to: "/svampkunskap/hur-manga-arter-finns-det",
  },
  {
    label: "Förhållandet fruktkropp vs mycel",
    to: "/svampkunskap/forhallandet-fruktkropp-vs-mycel",
  },
  {
    label: "Mykorrhizasvampar är individer",
    to: "/svampkunskap/mykorrhizasvampar-ar-individer",
  },
  {
    label: "Hur ser det ut i marken",
    to: "/svampkunskap/hur-ser-det-ut-i-marken",
  },
  { label: "Mycelnätverket", to: "/svampkunskap/mycelnatverket" },
  {
    label: "Hur påverkar skogsbrukande",
    to: "/svampkunskap/hur-paverkar-skogsbrukande",
  },
  { label: "Läsa mer", to: "/svampkunskap/lasa-mer" },
];

// Ref for the main content container:
const contentContainer = ref(null);
// Computed property to return the container element when available:
const containerEl = computed(() => contentContainer.value);

// Create a reactive key for the TOC; update it each time the route changes.
const tocKey = ref("");
onMounted(() => {
  nextTick(() => {
    if (contentContainer.value) {
      tocKey.value = route.fullPath;
    }
  });
});
watch(
  () => route.fullPath,
  (newPath) => {
    tocStore.setItems([]); // Clear out old TOC items
    nextTick(() => {
      tocKey.value = newPath;
    });
  }
);

// Compute the current index based on the current route:
const currentIndex = computed(() => {
  return navLinks.findIndex((link) => link.to === route.fullPath);
});

// Instead of just the link URLs, we return the whole object for both previous and next pages:
const prevPage = computed(() => {
  return currentIndex.value > 0 ? navLinks[currentIndex.value - 1] : null;
});

const nextPage = computed(() => {
  return currentIndex.value < navLinks.length - 1
    ? navLinks[currentIndex.value + 1]
    : null;
});
</script>
