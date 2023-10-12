<template>
<BaseCard shape="curved" class="p-5">
    <img :src="imageUrl" class="rounded-xl p-6 dark:bg-violet-200 bg-violet-100 dark:bg-opacity-80"/>
<BaseProse size="lg" weight="semibold" class="mt-4">North - Pine - Lingon - 41-90</BaseProse>
</BaseCard>
    
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  // Convert the URL to an image filename
  const imageUrl = computed(() => {
    const { geography, forestType, vegetationType, standAge } = route.query;
    if (geography && forestType && vegetationType && standAge) {
      const imageName = `${geography}-${forestType}-${vegetationType}-${standAge}`
        .toLowerCase()
        .replace(/\+/g, ' ')
        .split(' ')
        .join('_')
        .replace(/-+/g, '_')
        .replace(/<+/g, '')
        .replace(/>+/g, '');
      const finalUrl = `/images/${imageName}.png`;
      console.log('Returning dynamic URL:', finalUrl);
      return finalUrl; 
    }
    console.log('Returning null');
    return null;
  });
  </script>
  