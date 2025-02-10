<template>
  <div class="grid grid-cols-12 rounded-xl overflow-hidden">
    <div class="col-span-9 grid grid-cols-12 gap-4 backdrop-blur-3xl">
      <div class="col-span-8">
        <EnvInfo />
      </div>
      <div
        class="col-span-4 backdrop-blur-3xl overflow-clip rounded-xl border dark:border-neutral-600 dark:border-opacity-30 border-neutral-200 p-4 h-full bg-neutral-50"
      >
        <SpeciesRichness />
      </div>
    </div>

    <div class="col-span-3 flex">
      <div
        class="relative rounded-xl overflow-hidden ml-3 border border-neutral-200"
      >
        <SpatialForest />
        <div
          class="flex absolute bottom-0 justify-between w-full p-2 items-end"
        >
          <BaseHeading weight="medium" size="xs" class="text-neutral-400">
            Figuren visar hur mycelutbredningar kan se ut.
          </BaseHeading>
        </div>
        <!-- Clicking this icon opens the modal -->
        <Icon
          @click="openModal('ForestImg')"
          name="heroicons:question-mark-circle"
          class="size-6 text-neutral-400 absolute bottom-2 right-2 hover:text-primary-500 cursor-pointer transition-all"
        />
      </div>
    </div>
  </div>

  <!-- Modal for SpatialForest -->
  <UModal v-model="isForestModalOpen">
    <UCard>
      <!-- Optional header with a close button -->
      <template #header>
        <div class="flex justify-between items-center">
          <BaseHeading size="xl" weight="light">Skogsbild</BaseHeading>
          <Icon
            @click="isForestModalOpen = false"
            name="heroicons:x-mark"
            class="size-5 cursor-pointer"
          />
        </div>
      </template>

      <!-- Modal body -->
      <div class="">
        <SpatialForest />
        <div class="mt-2 text-sm text-gray-600">
          More forest modal info goes here.
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref } from "vue";

// Create a reactive variable to control the modal's visibility
const isForestModalOpen = ref(false);

// Function to open a modal based on type
function openModal(type) {
  if (type === "ForestImg") {
    isForestModalOpen.value = true;
  }
}
</script>
