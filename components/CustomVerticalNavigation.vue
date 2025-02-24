<template>
  <nav class="relative">
    <ul>
      <li v-for="(link, index) in links" :key="index" class="mb-1">
        <NuxtLink :to="link.to" class="block">
          <div
            :class="[
              'w-full rounded-full text-sm p-2 px-3 transition-all',
              isActive(link)
                ? 'bg-primary-500 text-white font-medium'
                : 'bg-transparent text-neutral-500   hover:bg-neutral-200 font-medium',
            ]"
          >
            {{ link.label }}
          </div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

interface Link {
  label: string;
  to: string;
}

const props = defineProps<{
  links: Link[];
}>();

const route = useRoute();

function isActive(link: Link) {
  return route.path === link.to;
}
</script>
