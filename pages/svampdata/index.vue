<template>
  <div>
    <ListBoxRow />
  </div>
</template>

<script setup>
import { useTitleStore } from '~/stores/titleStore';
import { onMounted } from 'vue';

const titleStore = useTitleStore();

onMounted(() => {
  titleStore.setTitle('Select Location');
});
</script>

<script>
export default {
  layout: 'sidebarLayout'
};
</script>


