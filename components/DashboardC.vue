<template>
  <div class="pointer-events-none dark:opacity-50 opacity-5">
    <div class="fixed bg-green-300  dark:bg-green-700 rounded-full w-96 h-96 top-72 left-20 blur-3xl      dark:opacity-10 opacity-20"></div>
    <div class="fixed bg-green-500  dark:bg-green-500 rounded-full w-2/3 h-96 -top-10 left-20 blur-3xl    dark:opacity-10 opacity-20"></div>
    <div class="fixed bg-violet-400 dark:bg-violet-800 rounded-full w-1/3 h-96 -top-10 right-20 blur-3xl  dark:opacity-10 opacity-10"></div>
    <div class="fixed bg-green-400  dark:bg-green-800 rounded-full w-64 h-64 -top-32 left-0 blur-3xl      dark:opacity-20 opacity-10"></div>
    <div class="fixed bg-green-300  dark:bg-green-500 rounded-full w-72 h-72 top-20 left-1/2 blur-3xl     dark:opacity-0  opacity-0 "></div>
    <div class="fixed bg-green-400  dark:bg-green-500 rounded-full w-2/3 h-96 -top-44 right-0 blur-3xl    dark:opacity-10 opacity-0 "></div>
    <div class="fixed bg-rose-200   dark:bg-rose-200 rounded-full w-52 h-52 -top-20 -right-10 blur-3xl    dark:opacity-10 opacity-20"></div>
    <div class="fixed bg-green-500  dark:bg-green-800 rounded-full w-48 h-48 top-20 left-40 blur-3xl      dark:opacity-10 opacity-10"></div>
    <div class="fixed bg-violet-500 dark:bg-violet-900 rounded-full w-48 h-96 top-30 left-72 blur-3xl     dark:opacity-10 opacity-10"></div>
    <div class="fixed bg-green-300  dark:bg-green-800 rounded-full w-2/3 h-96 top-40 -right-20 blur-3xl   dark:opacity-20 opacity-20"></div>
    <div class="fixed bg-green-200  dark:bg-green-500 rounded-full w-56 h-56 -bottom-10 right-40 blur-3xl dark:opacity-15 opacity-15"></div>
  </div>

  <div>
    <EnvironmentTitle :geography="geography" 
                      :forestType="forestType" 
                      :standAge="standAge" 
                      :vegetationType="vegetationType" 
                      class="z-20"/>

    <div class="">
      <transition name="fade" mode="out-in">
        <component :is="activeComponent" 
                   :geography="geography" 
                   :forestType="forestType" 
                   :standAge="standAge" 
                   :vegetationType="vegetationType" 
                   @close="handleCloseFullScreen"
                   @enlarge="handleFullScreen"
                   key="activeComponent"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTitleStore } from '~/stores/titleStore';
import FullScreenEdna from './FullScreenEdna.vue';
import FullScreenEdible from './FullScreenEdible.vue';
import FullScreenRedlisted from './FullScreenRedlisted.vue';
import NormalView from './NormalView.vue'; // Component for the normal view

const route = useRoute();
const titleStore = useTitleStore();
const { geography, forestType, standAge, vegetationType } = route.params;

const activeFullScreenComponent = ref(null);

const activeComponent = computed(() => {
  switch (activeFullScreenComponent.value) {
    case 'FullScreenEdna':
      return FullScreenEdna;
    case 'FullScreenEdible':
      return FullScreenEdible;
    case 'FullScreenRedlisted':
      return FullScreenRedlisted;
    default:
      return NormalView;
  }
});

const handleFullScreen = (componentName) => {
  activeFullScreenComponent.value = componentName;
};

const handleCloseFullScreen = () => {
  activeFullScreenComponent.value = null;
};

onMounted(() => {
  titleStore.setTitle("Skogssvamp");
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* Initial state for entering and leaving */ {
  opacity: 0;
}
</style>