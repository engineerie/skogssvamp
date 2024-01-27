<template>
    <ThinSideBar class="z-50"/>
          <slot />
  </template>


  

  
  
  <script setup>
import { ref, onMounted, onServerPrefetch, watch, toRefs, computed } from 'vue';
import { Bars3CenterLeftIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { useTitleStore } from '~/stores/titleStore';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '~/stores/sidebarStore';

const sidebarStore = useSidebarStore();
const titleStore = useTitleStore();
const route = useRoute();
const isStartPage = computed(() => route.path === '/');
const { isSidebarOpen, toggleSidebar } = toRefs(sidebarStore);  // Destructure from the same instance


</script>



  <style>
  /* Add this to your styles */
  .transition-all {
    transition: all 0.3s ease-in-out;
  }
  </style>
  