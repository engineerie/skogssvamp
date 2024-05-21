<template>
  <div class="flex justify-center">
    <NuxtImg
      height="505"
      width="805"
      v-if="imageUrl"
      :src="imageUrl"
      class="image-fit"
      format="webp"
    />
    <BasePlaceload v-else class="h-20 w-32 mb-12 rounded-lg" />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  vegetationType: String,
  standAge: String,
});

// Convert the props to an image filename
const imageUrl = computed(() => {
  if (
    props.geography &&
    props.forestType &&
    props.vegetationType &&
    props.standAge
  ) {
    const imageName =
      `${props.geography}-${props.forestType}-${props.vegetationType}-${props.standAge}`
        .toLowerCase()
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/-+/g, "_") // Replace hyphens with underscores
        .replace(/[<>]+/g, "_"); // Remove any < or > characters
    const finalUrl = `/images/EDNA_Forest_Images/${imageName}.png`;
    console.log("Returning dynamic URL:", finalUrl);
    return finalUrl;
  }
});
</script>
