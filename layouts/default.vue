<template>
    <ThinSideBar class="z-50"/>
    <SideBar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar"/> 
  
    <div :class="{'w-full': isStartPage, 'ml-[300px]': isSidebarOpen && !isStartPage, 'ml-[64px]': !isSidebarOpen && !isStartPage, 'sync-transition': true}">
      <div :class="{'p-4 pt-4 pl-10': !isStartPage, 'lg:max-w-full 2xl:max-w-screen-2xl mx-auto': !isStartPage}">
        <div v-if="!isStartPage" class="flex justify-between items-center"> 
          <div class="flex gap-2"> 
            <button @click="toggleSidebar">
              <Bars3CenterLeftIcon v-if="!isSidebarOpen" class="h-10 w-10 ml-3 text-amber-500"/>
              <ChevronLeftIcon v-else class="h-10 w-10 ml-3 text-amber-500"/>
            </button> 
            <slot name="title">
              <BaseHeading as="h1" weight="medium" size="3xl">{{ titleStore.title }}</BaseHeading>
            </slot> 
          </div>
          <BaseThemeSwitch />
        </div>
        <div v-if="isStartPage" class="flex justify-end items-center p-4">
          <BaseThemeSwitch />
        </div>
        <div :class="{'p-4 pt-8': !isStartPage}">
          <slot />
        </div>
      </div>
    </div>
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
  