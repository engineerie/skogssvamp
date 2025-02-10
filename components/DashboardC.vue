<template>
  <div>
    <!-- A button to toggle the slideover (e.g. for species info) -->
    <BaseButtonIcon
      shape="full"
      @click="toggleSlideover"
      class="fixed top-2 right-2 z-50"
    >
      <Icon name="heroicons:chevron-left" class="size-5" />
    </BaseButtonIcon>

    <!-- Always show the EnvironmentTitle at the top -->
    <EnvironmentTitle />

    <!-- MySlideover contains additional info (e.g. SpeciesInfo) -->
    <MySlideover
      v-model="showSlideover"
      :pinned="isPinned"
      @update:pinned="(val) => (isPinned = val)"
    >
      <SpeciesInfo
        :species="speciesStore.selectedSpecies"
        :source="speciesStore.sourceComponent"
      />
    </MySlideover>

    <!-- Main content area -->
    <div class="mb-14">
      <transition name="fade" mode="out-in">
        <!-- Render either StartView or one of the other views based on the route -->
        <component
          :is="activeComponent"
          @close="handleCloseFullScreen"
          @enlarge="handleFullScreen"
          :key="$route.fullPath"
        />
      </transition>
    </div>

    <!-- Optional footer -->
    <EnvironmentFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useTitleStore } from "~/stores/titleStore";
import MySlideover from "./MySlideover.vue";
import FullScreenPoison from "./FullScreenPoison.vue";
import FullScreenEdna from "./FullScreenEdna.vue";
import FullScreenEdible from "./FullScreenEdible.vue";
import FullScreenRedlisted from "./FullScreenRedlisted.vue";
import NormalView from "./NormalView.vue"; // Component for the normal view
import StartView from "./StartView.vue"; // Component for the normal view

import { useEnvParamsStore } from "~/stores/envParamsStore";

import { useSpeciesStore } from "~/stores/speciesStore";

const speciesStore = useSpeciesStore();
const envParamsStore = useEnvParamsStore();
const titleStore = useTitleStore();

const route = useRoute();

const showSlideover = ref(false);
const isPinned = ref(true);

// Toggle the slideover panel (e.g. for SpeciesInfo)
function toggleSlideover() {
  showSlideover.value = !showSlideover.value;
}

// Open the slideover automatically when a species is selected
watch(
  () => speciesStore.selectedSpecies,
  (newVal) => {
    if (newVal) {
      showSlideover.value = true;
    }
  }
);

// A ref to track if a full-screen view is active
const activeFullScreenComponent = ref(null);

// A computed property to check if all required route parameters are provided
const hasAllParams = computed(() => {
  const { geography, forestType, standAge, vegetationType } = route.params;
  return geography && forestType && standAge && vegetationType;
});

// The active component is chosen based on the route parameters and any full-screen state:
// - If not all parameters are provided, we show StartView.
// - If all parameters are provided, we use the full-screen component if one is active,
//   or fall back to NormalView.
const activeComponent = computed(() => {
  if (!hasAllParams.value) {
    return StartView;
  }
  switch (activeFullScreenComponent.value) {
    case "FullScreenEdna":
      return FullScreenEdna;
    case "FullScreenEdible":
      return FullScreenEdible;
    case "FullScreenPoison":
      return FullScreenPoison;
    case "FullScreenRedlisted":
      return FullScreenRedlisted;
    default:
      return NormalView;
  }
});

// Handlers for toggling full-screen view states
const handleFullScreen = (componentName) => {
  activeFullScreenComponent.value = componentName;
};

const handleCloseFullScreen = () => {
  activeFullScreenComponent.value = null;
};

// Optional: handle the Esc key to clear a species selection or close modals
const handleKeydown = (event) => {
  if (event.key === "Escape" && speciesStore.selectedSpecies) {
    speciesStore.clearSelection();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);

  // Initialize the environment parameters store from the current route
  envParamsStore.setParams({
    geography: route.params.geography,
    forestType: route.params.forestType,
    standAge: route.params.standAge,
    vegetationType: route.params.vegetationType,
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

// Watch for changes in route parameters to update the environment parameters store
watch(
  () => route.params,
  (newParams) => {
    envParamsStore.setParams({
      geography: newParams.geography,
      forestType: newParams.forestType,
      standAge: newParams.standAge,
      vegetationType: newParams.vegetationType,
    });
  },
  { immediate: true }
);
</script>

<style scoped>
/* Fade transition for view changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
