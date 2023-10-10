<template>
  <aside :class="[sidebarClass, 'sync-transition']" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-r-[1px] dark:border-neutral-700 border-neutral-300">
      <div class="flex flex-col ml-[88px]">
        
        <div v-if="currentDirectory === 'svampdata'">
          <BaseHeading size="lg" weight="normal" class="my-4">Mushroom Data</BaseHeading>
          <ul>
            <li><NuxtLink to="/svampdata" class="text-neutral-500 dark:text-neutral-300 text-sm">Select Location</NuxtLink></li>
            <li><NuxtLink to="/svampdata/compare" class="text-neutral-500 dark:text-neutral-300 text-sm">View Comparison</NuxtLink></li>
          </ul>

          <BaseHeading size="lg" weight="normal" class="my-4">Comparison List</BaseHeading>
          <ul>
        <li v-for="(env, index) in environments" :key="index" class="flex">
          <div class="tag-wrapper ">
            <BaseTag size="sm" shape="rounded" color="success" flavor="pastel" class="m-1">{{ env.query.geography.split(" ")[0] }}</BaseTag>
            <BaseTag size="sm" shape="rounded" color="info" flavor="pastel" class="m-1">{{ env.query.forestType }}</BaseTag>
            <BaseTag size="sm" shape="rounded" color="warning" flavor="pastel" class="m-1">{{ env.query.vegetationType }}</BaseTag>
            <BaseTag size="sm" shape="rounded" color="danger" flavor="pastel" class="m-1">{{ env.query.standAge.split(" ")[0] }}</BaseTag>
            <hr class="border-t-0.5 border-neutral-500 my-3"/>
          </div>
          <div>
          <BaseButtonIcon @click="removeEnvironment(index)" size="xs" shape="full" class="m-1"><Icon name="heroicons:x-mark-20-solid" class="h-3.5 w-3.5" /></BaseButtonIcon>
          </div>
        </li>
        
      </ul>
          
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
import { useComparisonStore } from '~/stores/comparisonStore';

const comparisonStore = useComparisonStore();
  const environments = comparisonStore.environments;

  const removeEnvironment = (index) => {
    comparisonStore.removeEnvironment(index);
  };

const { isSidebarOpen } = toRefs(useSidebarStore());

const route = useRoute();
const currentDirectory = ref('');

const sidebarClass = computed(() => {
  return isSidebarOpen.value ? 'fixed top-0 left-0 z-40 w-80 h-screen translate-x-0' : 'fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full';
});

watch(() => route.path, () => {
  const segments = route.path.split('/');
  currentDirectory.value = segments[1]; // Assuming the directory is the first segment after the initial '/'
});

</script>





