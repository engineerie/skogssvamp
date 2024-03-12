<template>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-3">
      <div class="zoomable-image relative">
        <!-- <transition name="fade" mode="in-out"> -->
          <!-- Using both forestStore.time and forestStore.stateOn in key to enforce re-render -->
          <NuxtImg 
           height="1200"
            id="zoomableImage" 
            :src="forestStore.currentImage" 
            :key="`${forestStore.time}-${forestStore.stateOn}`" 
            class="z-0 rounded-xl" 
            :style="{ transform: `scale(${zoomLevel})` }" 
          />
        <!-- </transition> -->
      </div>
    </div>
    <div class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border  dark:border-neutral-800 border-stone-200 ">
    </div>
    <timeLine class="col-span-4 "/>

</div>
</template>
  
  <script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useForestStore } from '~/stores/forestStore';
import { useTitleStore } from '~/stores/titleStore';

const titleStore = useTitleStore();
const forestStore = useForestStore();
const zoomableImage = ref(null);
const zoomLevel = ref(1);
const minZoom = 1;
const maxZoom = 3; // Adjust max zoom as needed

// Event handler for image zoom
const handleScroll = (event) => {
  event.preventDefault();
  const delta = event.deltaY || event.detail || event.wheelDelta;
  zoomLevel.value += delta * -0.01;
  zoomLevel.value = Math.min(Math.max(minZoom, zoomLevel.value), maxZoom);
};

onMounted(() => {
  titleStore.setTitle("Skogsbruk");

  if (zoomableImage.value) {
    zoomableImage.value.addEventListener('wheel', handleScroll);
    zoomableImage.value.addEventListener('load', () => {
      // Image loaded logic
    });
  }
});

onUnmounted(() => {
  if (zoomableImage.value) {
    zoomableImage.value.removeEventListener('wheel', handleScroll);
    zoomableImage.value.removeEventListener('load', () => {
      // Image unloaded logic
    });
  }
});

const imagePath = computed(() => forestStore.currentImage);
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