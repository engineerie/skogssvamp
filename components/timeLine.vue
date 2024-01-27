<script setup>
import { useForestStore } from '~/stores/forestStore';
const forestStore = useForestStore();
</script>


<template>
    <div class="flex justify-center">
      <div class="absolute z-20 bottom-4 px-4 py-3 ml-20 mr-80 dark:bg-neutral-900 border-neutral-800 rounded-full border-[1px] flex gap-12 justify-center items-center">
  <BaseRadio v-model="forestStore.time" name="checkbox_base" value="before" label="Innan avverkning" color="primary" />
  <BaseRadio v-model="forestStore.time" name="checkbox_base" value="after" label="Direkt efter avverkning" color="primary" />
  <BaseRadio v-model="forestStore.time" name="checkbox_base" value="80years" label="80 år efter avverkning" color="primary" />
  </div>
  
    </div>
  </template>