<template>
  <aside :class="[sidebarClass, 'sync-transition']" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-r-[1px] dark:border-neutral-700 border-neutral-300">
      <div class="flex flex-col ml-24">
        
        <div v-if="currentDirectory === 'svampdata'">
          <BaseHeading size="lg" weight="normal" class="my-4">Mushroom Data</BaseHeading>
          <NuxtLink to="" class="text-neutral-500 dark:text-neutral-300 text-sm">Compare</NuxtLink>
        </div>
        <div v-else-if="currentDirectory === 'skogsbruk'">
          <BaseHeading size="lg" weight="normal" class="my-4">Forestry</BaseHeading>
        </div>
        <div v-else-if="currentDirectory === 'about'">
          <BaseHeading size="lg" weight="normal" class="my-4">About</BaseHeading>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '~/stores/sidebarStore';

const { isSidebarOpen } = toRefs(useSidebarStore());
console.log("Initial isSidebarOpen in SideBar.vue:", isSidebarOpen.value);

const route = useRoute();
const currentDirectory = ref('');

const sidebarClass = computed(() => {
  return isSidebarOpen.value ? 'fixed top-0 left-0 z-40 w-80 h-screen translate-x-0' : 'fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full';
});

watch(() => route.path, () => {
  const segments = route.path.split('/');
  currentDirectory.value = segments[1]; // Assuming the directory is the first segment after the initial '/'
});

watch(() => isSidebarOpen.value, (newVal) => {
  console.log("SideBar.vue: isSidebarOpen:", newVal);
});

watch(() => isSidebarOpen.value, (newVal, oldVal) => {
  console.log("SideBar.vue: isSidebarOpen changed from", oldVal, "to", newVal);
});

</script>





