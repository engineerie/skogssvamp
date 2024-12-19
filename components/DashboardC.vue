<template>
  <div>
    <EnvironmentTitle />

    <!-- USlideover for SpeciesInfo -->
    <USlideover
      v-model="isOpen"
      :ui="{
        width: 'w-screen max-w-md',
      }"
    >
      <UCard
        class="flex flex-col flex-1 overflow-y-scroll"
        id="scrollbar"
        :ui="{
          body: {
            base: 'flex-1',
            background: '',
            padding: 'px-0 py-0 sm:p-0',
          },
          header: {
            base: '',
            background: '',
            padding: 'px-4 py-3 sm:px-6',
          },

          ring: '',
        }"
      >
        <!-- SpeciesInfo Component -->
        <SpeciesInfo
          :species="speciesStore.selectedSpecies"
          :source="speciesStore.sourceComponent"
          @close="isOpen = false"
        />

        <!-- <template #footer>
          <BaseProse class="text-neutral-500">
            Se
            <NuxtLink to="/guide" class="underline" @click="isOpen = false"
              >dokumentationen</NuxtLink
            >
            för mer information.
          </BaseProse>
        </template> -->
      </UCard>
    </USlideover>

    <!-- Other Components -->
    <div>
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
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useTitleStore } from "~/stores/titleStore";
import FullScreenEdna from "./FullScreenEdna.vue";
import FullScreenEdible from "./FullScreenEdible.vue";
import FullScreenRedlisted from "./FullScreenRedlisted.vue";
import NormalView from "./NormalView.vue"; // Component for the normal view

import { useSpeciesStore } from "~/stores/speciesStore";

const speciesStore = useSpeciesStore();

const route = useRoute();
const titleStore = useTitleStore();
const { geography, forestType, standAge, vegetationType } = route.params;

const activeFullScreenComponent = ref(null);
const isModalOpen = ref(false);

// Reference for SpeciesInfo panel (optional for focus trapping)
const panelRef = ref(null);

// Computed to select the active component based on fullscreen state
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

// Computed property to bind USlideover's isOpen state
const isOpen = computed({
  get: () => !!speciesStore.selectedSpecies,
  set: (val) => {
    if (!val) speciesStore.clearSelection();
  },
});

// Functions to manage fullscreen and modal states
const handleFullScreen = (componentName) => {
  activeFullScreenComponent.value = componentName;
};

const handleCloseFullScreen = () => {
  activeFullScreenComponent.value = null;
};

// Function to handle 'Esc' key press
const handleKeydown = (event) => {
  if (event.key === "Escape" && speciesStore.selectedSpecies) {
    speciesStore.clearSelection();
  }
};

// Watch for changes in selectedSpecies to toggle body overflow
watch(
  () => speciesStore.selectedSpecies,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

// Add event listener on mount
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);

  // Initialize focus trap if SpeciesInfo is open
  if (speciesStore.selectedSpecies && panelRef.value) {
    useFocusTrap(panelRef.value);
  }

  // Open the modal every time the page is loaded
  if (route.path.startsWith("/svampdata/dashboard/")) {
    isModalOpen.value = true;
  }
});

// Remove event listener before unmounting
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
/* Fade Transition for Other Components */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Additional styling if necessary */

#scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#scrollbar::-webkit-scrollbar-thumb {
  display: none;
  background-color: #6f202033; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: medium;
  scrollbar-color: #88888800 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out; /* transition effect for Firefox */
}
</style>
