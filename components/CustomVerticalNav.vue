<template>
  <nav class="flex flex-col space-y-2">
    <!-- Loop through each navigation link -->
    <NuxtLink
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      class="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <!-- The icon always displays -->
      <Icon :name="link.icon" class="h-5 w-5" />

      <!-- When expanded, show the label -->
      <span v-if="expanded" class="ml-2 text-sm font-medium">
        {{ link.label }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// Define the props for this component
const props = defineProps<{
  expanded: boolean;
  links: Array<{
    label: string;
    icon: string;
    to: string;
  }>;
}>();
</script>

<style scoped>
/* You can add additional styles as needed */
</style>
