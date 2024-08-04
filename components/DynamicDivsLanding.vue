<template>
  <div class="flex flex-col h-screen">
    <!-- Set the direction to column -->
    <div class="flex justify-between p-6">
      <!-- This is the top div -->
      <BaseHeading size="5xl" weight="md" class="">Skogssvamp</BaseHeading>
      <BaseThemeSwitch class="opacity-90" />
    </div>

    <!-- This div should take up remaining space -->
    <div class="flex flex-grow gap-5 overflow-hidden pt-0 p-6">
      <!-- Added flex-grow and overflow-hidden -->
      <div
        :class="[
          'relative delay-200 transition-width duration-700 ease-in-out bg-white bg-opacity-50 border border-neutral-300 rounded-2xl overflow-hidden',
          leftFlex,
          isRightExpanded ? 'hover:w-5/6' : '',
          !isRightExpanded && !isLeftExpanded ? 'hover:w-4/6' : '',
        ]"
      >
        <BaseButtonIcon
          @click="expandLeft"
          color="default"
          flavor="solid"
          size="md"
          shape="full"
          class="absolute bottom-2 right-2"
        >
          <Icon name="heroicons:plus" class="h-5 w-5" />
        </BaseButtonIcon>
      </div>
      <div
        :class="[
          'relative delay-200 transition-width duration-700 ease-in-out bg-white border bg-opacity-50 border-neutral-300 rounded-2xl overflow-hidden',
          rightFlex,
          isLeftExpanded ? 'hover:w-5/6' : '',
          !isRightExpanded && !isLeftExpanded ? 'hover:w-4/6' : '',
        ]"
      >
        <BaseButtonIcon
          @click="expandRight"
          color="default"
          flavor="solid"
          size="md"
          shape="full"
          class="absolute bottom-2 right-2"
        >
          <Icon name="heroicons:plus" class="h-5 w-5" />
        </BaseButtonIcon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

// More specific initial state that includes a flex-basis
const initialFlexBasis = "50%"; // Assume you start with half-half
const leftFlex = ref(`flex-grow w-1/2`); // Normal state with width
const rightFlex = ref(`flex-grow w-1/2`); // Normal state with width

// States to track whether the divs are expanded
const isLeftExpanded = ref(false);
const isRightExpanded = ref(false);

function expandLeft() {
  leftFlex.value = "flex-grow w-4/5"; // Expanded state
  rightFlex.value = "flex-grow w-1/5"; // Contracted state
  isLeftExpanded.value = true;
  isRightExpanded.value = false;
}

function expandRight() {
  leftFlex.value = "flex-grow w-1/5"; // Contracted state
  rightFlex.value = "flex-grow w-4/5"; // Expanded state
  isLeftExpanded.value = false;
  isRightExpanded.value = true;
}
</script>
