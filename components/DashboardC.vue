<template>
      <ListBoxRow />
</template>



<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTitleStore } from '~/stores/titleStore';

const route = useRoute();
const query = ref(route.query);
const titleStore = useTitleStore();

const formattedQuery = computed(() => {
  const mapping = {
    // ... your mapping
  };
  const parts = [];
  for (const [key, value] of Object.entries(query.value)) {
    parts.push(mapping[value] || value);
  }
  return parts.join(', ');
});

// Watch for changes in formattedQuery and update the title
watch(formattedQuery, (newVal) => {
  titleStore.setTitle(newVal);
});

// Also set the title when the component is mounted
onMounted(() => {
  titleStore.setTitle(formattedQuery.value);
});
</script>

  
