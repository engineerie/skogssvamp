<!-- ListBoxRow.vue -->

<template>
  <!-- Geography Options -->
  <div class="grid grid-cols-4 gap-5">
    <div
      class="p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
    >
      <!-- <div class="absolute right-0 top-0">
        <div
          class="w-14 h-14 rounded-lg text-fuchsia-500 flex justify-center items-center"
        >
          <Icon name="material-symbols:location-on-outline" class="h-6 w-6" />
        </div>
      </div> -->
      <div>
        <div
          v-for="option in geographyOptions"
          :key="option.value"
          class="mb-2"
        >
          <div class="flex justify-between gap-2">
            <span
              :class="{ 'disabled-text': isOptionDisabled(option) }"
              class="text-md"
              >{{ option.label }}</span
            >
            <BaseRadio
              color="primary"
              v-model="selectedOptions.geography"
              :value="option.value"
              name="geography"
              :disabled="isOptionDisabled(option)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Forest Type Options -->
    <div
      class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
    >
      <!-- <div class="absolute right-0 top-0">
        <div
          class="w-14 h-14 rounded-lg text-green-500 flex justify-center items-center"
        >
          <Icon name="lucide:trees" class="h-6 w-6" />
        </div>
      </div> -->
      <div>
        <!-- <label>Skogstyp</label> -->
        <div
          v-for="option in forestTypeOptions"
          :key="option.value"
          class="mb-1.5"
        >
          <BaseRadio
            color="primary"
            v-model="selectedOptions.forestType"
            :value="option.value"
            :label="option.label"
            name="forestType"
          />
        </div>
      </div>
    </div>
    <!-- Stand Age Options -->
    <div
      class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
    >
      <!-- <div class="absolute right-0 top-0">
        <div
          class="w-14 h-14 rounded-lg text-violet-500 flex justify-center items-center"
        >
          <Icon name="carbon:crop-growth" class="h-6 w-6" />
        </div>
      </div> -->
      <div>
        <!-- <label>Beståndsålder</label> -->
        <div
          v-for="option in standAgeOptions"
          :key="option.value"
          class="mb-1.5"
        >
          <BaseRadio
            color="primary"
            v-model="selectedOptions.standAge"
            :value="option.value"
            :label="option.label"
            name="standAge"
          />
        </div>
      </div>
    </div>
    <!-- Vegetation Type Options -->
    <div
      class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
    >
      <!-- <div class="absolute right-0 top-0">
        <div
          class="w-14 h-14 rounded-lg text-teal-500 flex justify-center items-center"
        >
          <Icon name="fluent-emoji-high-contrast:herb" class="h-6 w-6" />
        </div>
      </div> -->
      <div>
        <!-- <label>Markvegetation</label> -->
        <div
          v-for="option in vegetationTypeOptions"
          :key="option.value"
          class="mb-1.5"
        >
          <BaseRadio
            color="primary"
            v-model="selectedOptions.vegetationType"
            :value="option.value"
            :label="option.label"
            name="vegetationType"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- I want to move this div outside of the component to the-->
  <div class="flex justify-end">
    <div class="mt-2">
      <div v-if="!isButtonDisabled">
        <NuxtLink :to="generateParams()">
          <BaseButton size="sm" flavor="solid" color="primary" shape="full">
            <Icon name="material-symbols:travel-explore" class="me-1 h-4 w-4" />
            <span>Utforska</span>
          </BaseButton>
        </NuxtLink>
      </div>
      <div v-else>
        <BaseButton
          size="sm"
          disabled
          flavor="pastel"
          color="muted"
          shape="full"
        >
          <Icon name="material-symbols:travel-explore" class="me-1 h-4 w-4" />
          <span>Utforska</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const fields = reactive({
  first: "",
});

const route = useRoute();

// Options for the select fields
const geographyOptions = [
  { value: "North Sweden", label: "Norra Sverige" },
  { value: "South Sweden", label: "Södra Sverige" },
];
const forestTypeOptions = [
  { value: "Spruce", label: "Gran" },
  { value: "Pine", label: "Tall" },
  { value: "Mixed Coniferous", label: "Blandad barrskog" },
  { value: "Mixed Deciduous", label: "Blandad lövskog" },
];
const standAgeOptions = [
  { value: "1-40 years", label: "1-40 år" },
  { value: "41-90 years", label: "41-90 år" },
  { value: "91< years", label: "91 år och äldre" },
];
const vegetationTypeOptions = [
  { value: "Tall herbs", label: "Högört" },
  { value: "Low herbs", label: "Lågört" },
  { value: "No field layer", label: "Kalmark" },
  { value: "Broad grasses", label: "Bredblad gräs" },
  { value: "Narrow grasses", label: "Smalblad gräs" },
  { value: "Blueberry", label: "Blåbär" },
  { value: "Lingonberry", label: "Lingon" },
  { value: "Crowberry/heather", label: "Kråkbär/Ljung" },
];

// Reactive state based on route parameters
const selectedOptions = ref({
  geography: "",
  forestType: "",
  standAge: "",
  vegetationType: "",
});

// Compute initial state from route parameters and setup watchers
watch(
  () => route.params,
  (newParams) => {
    selectedOptions.value.geography =
      newParams.geography || geographyOptions[0].value;
    selectedOptions.value.forestType =
      newParams.forestType || forestTypeOptions[0].value;
    selectedOptions.value.standAge =
      newParams.standAge || standAgeOptions[0].value;
    selectedOptions.value.vegetationType =
      newParams.vegetationType || vegetationTypeOptions[0].value;
  },
  { immediate: true }
);

// Helper functions
const isOptionDisabled = (option) => {
  return option.label.startsWith("S") || option.value.startsWith("S");
};

const generateParams = () => {
  const path = [
    encodeURIComponent(selectedOptions.value.geography),
    encodeURIComponent(selectedOptions.value.forestType),
    encodeURIComponent(selectedOptions.value.standAge),
    encodeURIComponent(selectedOptions.value.vegetationType),
  ].join("/");
  return `/svampdata/dashboard/${path}`;
};
</script>

<style>
.disabled-text {
  color: #a3a3a3; /* or any color you prefer */
}
</style>
