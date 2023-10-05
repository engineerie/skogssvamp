<template>
  <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-3/4">
    <BaseHeading size="7xl" weight="extrabold" class=" text-center mb-6">Discover the Hidden World Beneath Your Forest</BaseHeading>
    <div class="flex justify-center w-2/3 mx-auto">
        <BaseHeading weight="medium" size="xl" class="mb-4 text-center">Visualize the rich diversity of mycorrhizal fungi, explore how different forest management practices impact fungal ecosystems and uncover the potential for edible and red-listed mushrooms in your area.
      </BaseHeading></div>

      <div class="flex gap-6 justify-center mt-6">
        <NuxtLink @click="openSidebar" to="/about">
        <BaseButton  color="primary" size="md" shape="full">Learn more</BaseButton>
      </NuxtLink>
        <NuxtLink @click="openSidebar" to="/svampdata"> 
        <BaseButton  color="primary" flavor="outline" shape="full" size="md">
        
          <span>Explore Data</span>
          <Icon Icon name="lucide:arrow-right" class="-ms-1 h-4 w-4" />
        </BaseButton></NuxtLink> 
      </div>
    </div>
</template>




<script setup>
import { useSidebarStore } from '~/stores/sidebarStore';
const { openSidebar } = useSidebarStore();

</script>