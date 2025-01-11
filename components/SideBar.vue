<template>
  <aside :class="[sidebarClass, 'sync-transition']" aria-label="Sidebar">
    <div
      class="h-full px-3 py-2 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 border-r-[1px] dark:border-neutral-800 border-neutral-300"
    >
      <div class="flex flex-col ml-[80px]">
        <div v-if="currentDirectory === 'svampdata'" class="">
          <SbSvamp />
        </div>
        <div v-else-if="currentDirectory === 'svampdata/dashboard'" class="">
          <SbSvampInfo />
        </div>
        <div v-else-if="currentDirectory === 'skogsbruk/modell'">
          <SbSkogsbruk />
        </div>
        <div v-else-if="currentDirectory === 'about'">
          <BaseHeading size="lg" weight="normal" class="my-4"
            >About</BaseHeading
          >
        </div>
        <div v-else-if="currentDirectory.startsWith('guide')">
          <SbDokumentation />
          <!-- <BaseHeading size="lg" weight="normal" class="my-4">Dokumentation</BaseHeading> -->
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { ref, watch, computed, onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebarStore";
import { useComparisonStore } from "~/stores/comparisonStore";

const { isSidebarOpen } = toRefs(useSidebarStore());
const comparisonStore = useComparisonStore();
const route = useRoute();
const currentDirectory = ref("");

const sidebarClass = computed(() => {
  return isSidebarOpen.value
    ? "fixed top-0 left-0 z-40 w-[420px] h-screen translate-x-0"
    : "fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full";
});

const initializeCurrentDirectory = () => {
  const segments = route.path.split("/");
  currentDirectory.value = segments.slice(1, 3).join("/");
};

onMounted(() => {
  initializeCurrentDirectory(); // Initialize when component mounts
});

watch(
  () => route.path,
  () => {
    initializeCurrentDirectory(); // Update on route changes
  }
);
</script>
