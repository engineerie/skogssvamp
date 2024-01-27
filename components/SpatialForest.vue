<template>
  <div class="flex justify-center">
   <img v-if="imageUrl" :src="imageUrl" class="rounded-xl p-6 pt-0 mb-2 h-[300px] w-auto"/>
   <BasePlaceload v-else class="h-20 w-32 mb-12 rounded-lg" />
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

// Convert the props to an image filename
const imageUrl = computed(() => {
  if (props.geography && props.forestType && props.vegetationType && props.standAge) {
    const imageName = `${props.geography}-${props.forestType}-${props.vegetationType}-${props.standAge}`
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/-+/g, '_') // Replace hyphens with underscores
      .replace(/[<>]+/g, ''); // Remove any < or > characters
    const finalUrl = `/images/spatial/${imageName}.png`;
    console.log('Returning dynamic URL:', finalUrl);
    return finalUrl;

  }
});
</script>