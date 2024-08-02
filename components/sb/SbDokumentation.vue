<template>
  <BaseHeading
    size="xl"
    weight="normal"
    class="text-neutral-800 dark:text-neutral-100 mb-6"
  >
    Dokumentation
  </BaseHeading>

  <button
    @click="toggleSvampar"
    class="flex justify-between items-center w-full text-left py-2"
  >
    <BaseHeading
      size="sm"
      weight="bold"
      class="text-neutral-800 dark:text-neutral-100"
    >
      Svampar i olika skogar
    </BaseHeading>
    <span
      class="transform transition-transform pb-1"
      :class="!svamparOpen ? 'rotate-90' : ''"
    >
      <icon name="heroicons:chevron-down-20-solid" size="25px" />
      <!-- Down arrow, rotates when open -->
    </span>
  </button>
  <transition name="slide-fade">
    <div v-if="svamparOpen" class="transform transition-transform duration-200">
      <UVerticalNavigation class="ml-4" :links="svampar" :ui="uiSettings" />
    </div>
  </transition>
  <!-- Collapsible Section for "Svampar och skogsbruk" -->
  <button
    @click="toggleSkogssbruk"
    class="flex justify-between items-center w-full text-left py-2 mt-4"
  >
    <BaseHeading
      size="sm"
      weight="bold"
      class="text-neutral-800 dark:text-neutral-100"
    >
      Svampar och skogsbruk
    </BaseHeading>
    <span
      class="transform transition-transform pb-1"
      :class="!skogssbrukOpen ? 'rotate-90' : ''"
    >
      <icon name="heroicons:chevron-down-20-solid" size="25px" />
      <!-- Down arrow, rotates when open -->
    </span>
  </button>
  <transition name="slide-fade">
    <UVerticalNavigation
      v-if="skogssbrukOpen"
      class="ml-4"
      :links="skogssbruk"
      :ui="uiSettings"
    />
  </transition>
</template>

<script setup>
import { ref } from "vue";

// State for collapsible sections
const svamparOpen = ref(true);
const skogssbrukOpen = ref(true);

// Toggle functions
const toggleSvampar = () => (svamparOpen.value = !svamparOpen.value);
const toggleSkogssbruk = () => (skogssbrukOpen.value = !skogssbrukOpen.value);

const svampar = [
  { label: "Miljöindelningar", to: "/guide/miljoindelningar" },
  { label: "Vanliga arter", to: "/vanliga-arter" },
  { label: "Artrikedom", to: "/artrikedom" },
  { label: "Matsvampar", to: "/matsvampar" },
  { label: "Rödlistning", to: "/rodlistning" },
];

const skogssbruk = [
  { label: "Skogsbruksmetoder", to: "/skogsbruksmetoder" },
  { label: "Visualiseringar", to: "/visualiseringar" },
  { label: "Hur svampar återetablerar sig", to: "/ateretablering" },
];

const uiSettings = {
  wrapper: "border-s border-gray-200 dark:border-gray-800 space-y-2",
  base: "group block border-s -ms-px leading-6 before:hidden",
  padding: "p-0 ps-4",
  rounded: "",
  font: "",
  ring: "",
  active: "text-primary-500 dark:text-primary-400 border-current font-semibold",
  inactive:
    "border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300",
};
</script>

<style>
/* Additional styles for rotating arrow */
.rotate-90 {
  transform: rotate(-90deg);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>
