<template>
    <div class="zoomable-image relative">
    <transition
      name="fade"
      mode="in-out"
    >
      <img id="zoomableImage" :src="forestStore.currentImage" :key="forestStore.time" class="z-0 absolute" :style="{ transform: `scale(${zoomLevel})` }" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useForestStore } from '~/stores/forestStore';
import { useTitleStore } from '~/stores/titleStore';
// Store for title management
const titleStore = useTitleStore();

// Setting the title when the component is mounted
onMounted(() => {
  // const environmentTitle = `${geography}, ${forestType}, ${standAge}, ${vegetationType}`;
  titleStore.setTitle("Skogsbruk");
});

const forestStore = useForestStore();
  
  // definePageMeta({ layout: 'none' });
  
  const zoomLevel = ref(1);
  
  const handleScroll = (event) => {
    event.preventDefault();
    const delta = event.deltaY || event.detail || event.wheelDelta;
    zoomLevel.value += delta * -0.01;
    
    // Restrict scale
    zoomLevel.value = Math.min(Math.max(1, zoomLevel.value), 1);
  };

const imagePath = computed(() => forestStore.currentImage);
const imageLoaded = ref(false);

onMounted(() => {
  const imageElement = document.querySelector('.zoomable-image');
  imageElement.addEventListener('wheel', handleScroll);
  
  // Pre-load images logic here (if implemented)
  
  imageElement.addEventListener('load', () => {
    imageLoaded.value = true; // Set to true once the image is loaded
  });
});
  </script>
  

  <style>
    .zoomable-image {
      transition: transform 0.2s ease-in-out;
    }
    
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s ease;
    }
    
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
    </style>