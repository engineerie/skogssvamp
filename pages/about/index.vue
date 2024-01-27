<template>
  
</template>

<script setup>
import { useTitleStore } from '~/stores/titleStore';
import { onMounted } from 'vue';

const titleStore = useTitleStore();

onMounted(() => {
  titleStore.setTitle('About');
});
</script>
