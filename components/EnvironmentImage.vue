<template>
  <div class="relative grid grid-cols-4 p-5 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 ">
    <DashboardInfo class="col-span-3"/>
    <img v-if="imageUrl && !imageError" :src="imageUrl" class="w-auto px-6 py-6 rounded-xl dark:bg-violet-200 bg-violet-100 dark:bg-opacity-80"/>
    <p v-else>No image available</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  vegetationType: String,
  standAge: String
});

const imageError = ref(false);

// Convert the props to an image filename
const imageUrl = computed(() => {
  if (props.geography && props.forestType && props.vegetationType && props.standAge) {
    const imageName = `${props.geography}-${props.forestType}-${props.vegetationType}-${props.standAge}`
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/-+/g, '_') // Replace hyphens with underscores
      .replace(/[<>]+/g, ''); // Remove any < or > characters
    const finalUrl = `/images/${imageName}.png`;
    console.log('Returning dynamic URL:', finalUrl);
    return finalUrl;
  }
  console.log('Returning null');
  return null;
});
</script>