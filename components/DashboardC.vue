<template>
  <div>
    <EnvironmentTitle class="z-20" />

    <div class="">
      <transition name="fade" mode="out-in">
        <component
          :is="activeComponent"
          :isNormalView="
            activeFullScreenComponent &&
            activeFullScreenComponent.value === null
          "
          @close="handleCloseFullScreen"
          @enlarge="handleFullScreen"
          key="activeComponent"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTitleStore } from "~/stores/titleStore";
import FullScreenEdna from "./FullScreenEdna.vue";
import FullScreenEdible from "./FullScreenEdible.vue";
import FullScreenRedlisted from "./FullScreenRedlisted.vue";
import NormalView from "./NormalView.vue"; // Component for the normal view

const route = useRoute();
const titleStore = useTitleStore();
const { geography, forestType, standAge, vegetationType } = route.params;

const activeFullScreenComponent = ref(null);

const activeComponent = computed(() => {
  switch (activeFullScreenComponent.value) {
    case "FullScreenEdna":
      return FullScreenEdna;
    case "FullScreenEdible":
      return FullScreenEdible;
    case "FullScreenRedlisted":
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.5s;
  transform-origin: center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
