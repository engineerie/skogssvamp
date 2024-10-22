<template>
  <div class="overflow-visible">
    <!-- Geography Options -->
    <div class="grid grid-cols-4 gap-5 overflow-visible">
      <div
        class="p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledGeographyOptions"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'geography-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-sm"
              data-nui-tooltip-position="right"
              :data-nui-tooltip="hoveredDescription"
            >
              {{ option.label }}
            </label>
            <BaseCheckbox
              :id="'geography-' + option.value"
              color="primary"
              :model-value="selectedOptions.geography === option.value"
              @update:model-value="
                () => updateSelection(option.value, 'geography')
              "
              :disabled="option.disabled"
              shape="full"
            />
          </div>
        </div>
      </div>
      <!-- Forest Type Options -->
      <div
        class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledForestTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'forestType-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-sm"
              data-nui-tooltip-position="left"
              :data-nui-tooltip="hoveredDescription"
            >
              {{ option.label }}
            </label>
            <BaseCheckbox
              :id="'forestType-' + option.value"
              color="primary"
              :model-value="selectedOptions.forestType === option.value"
              @update:model-value="
                () => updateSelection(option.value, 'forestType')
              "
              :disabled="option.disabled"
              shape="full"
            />
          </div>
        </div>
      </div>
      <!-- Stand Age Options -->
      <div
        class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledStandAges"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'standAge-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-sm"
              data-nui-tooltip-position="left"
              :data-nui-tooltip="hoveredDescription"
            >
              {{ option.label }}
            </label>
            <BaseCheckbox
              :id="'standAge-' + option.value"
              color="primary"
              :model-value="selectedOptions.standAge === option.value"
              @update:model-value="
                () => updateSelection(option.value, 'standAge')
              "
              :disabled="option.disabled"
              shape="full"
            />
          </div>
        </div>
      </div>
      <!-- Vegetation Type Options -->
      <div
        class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledVegetationTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'vegetationType-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-sm"
              data-nui-tooltip-position="left"
              :data-nui-tooltip="hoveredDescription"
            >
              {{ option.label }}
            </label>
            <BaseCheckbox
              :id="'vegetationType-' + option.value"
              color="primary"
              :model-value="selectedOptions.vegetationType === option.value"
              @update:model-value="
                () => updateSelection(option.value, 'vegetationType')
              "
              :disabled="option.disabled"
              shape="full"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-neutral-400 text-sm relative overflow-visible">
      <div class="absolute -bottom-8 left-0 w-3/4 z-50 overflow-visible">
        <Transition name="fade">
          <BaseMessage
            v-if="hoveredDescription"
            type="primary"
            icon="material-symbols:info-i-rounded"
            shape="full"
            class="max-w-3xl z-50"
            >{{ hoveredDescription }}</BaseMessage
          >
        </Transition>
      </div>
    </div> -->
    <!-- Navigation Buttons -->
    <!-- <div class="flex justify-end">
    <div class="mt-2">
      <div>
        <NuxtLink :to="generateParams()">
          <BaseButton
            size="sm"
            flavor="solid"
            color="default"
            shape="full"
            :disabled="isButtonDisabled()"
          >
            <Icon name="material-symbols:refresh" class="me-1 h-4 w-4" />
            <span>Uppdatera</span>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>
  </div> -->
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// State to track hovered description
const hoveredDescription = ref("");

// Function to update hovered description
const setHoveredDescription = (description) => {
  hoveredDescription.value = description || "";
};

// Function to clear hovered description
const clearHoveredDescription = () => {
  hoveredDescription.value = "";
};

const props = defineProps({
  geographyFromMap: String,
});

const router = useRouter();
const route = useRoute();
const validCombinations = ref([]);

// Options for the select fields
const geographyOptions = [
  {
    value: "Norr",
    label: "Norra Sverige",
    description: "Norr om latitud 60°",
  },
  {
    value: "Söder",
    label: "Södra Sverige",
    description: "Söder om latitud 60°",
  },
];
const forestTypeOptions = [
  {
    value: "Granskog",
    label: "Granskog",
    description: "Minst 70% barrträd och varav minst 70% av barrträden är gran",
  },
  {
    value: "Tallskog",
    label: "Tallskog",
    description: "Minst 70% barrträd och varav minst 70% av barrträden är tall",
  },
  {
    value: "Barrblandskog",
    label: "Blandad barrskog",
    description:
      "Minst 70% barrträd varav varken tall eller gran utgör 70% av barrträden",
  },
  {
    value: "Lövblandskog",
    label: "Blandad lövskog",
    description:
      "31-69% lövträd respektive barrträd, samt hygge med jordslag mull",
  },
  { value: "Lövskog", label: "Lövskog", description: "Minst 70% lövträd" },
  {
    value: "EkBokskog",
    label: "Ek och Bokskog",
    description:
      "Minst 70% lövträd varav minst 70% av lövträden är ek eller bok",
  },
  {
    value: "Naturbete",
    label: "Naturbete",
    description: "Trädbevuxna gräsmarker för bestesdjur",
  },
];
const standAgeOptions = [
  { value: "1-40", label: "1-40 år" },
  { value: "41-90", label: "41-90 år" },
  { value: "91", label: "91 år och äldre" },
  { value: "allaåldrar", label: "Alla åldrar" },
];
const vegetationTypeOptions = [
  {
    value: "Örter_grupp",
    label: "Örter",
    description: "Högört, Lågört och Bredblad gräs",
  },
  {
    value: "Blåbär_grupp",
    label: "Blåbär",
    description: "Blåbär och Smalblad gräs",
  },
  {
    value: "Lingon_grupp",
    label: "Lingon",
    description: "Lingon och Kråkbär/Ljung",
  },
];

// Fetching valid combinations on mounted
onMounted(async () => {
  const response = await fetch("/validCombinations.json");
  validCombinations.value = await response.json();

  // Initialize selectedOptions based on current route params
  selectedOptions.value.geography = route.params.geography || null;
  selectedOptions.value.forestType = route.params.forestType || null;
  selectedOptions.value.standAge = route.params.standAge || null;
  selectedOptions.value.vegetationType = route.params.vegetationType || null;
});

// Reactive state based on route parameters
const selectedOptions = ref({
  geography: null,
  forestType: null,
  standAge: null,
  vegetationType: null,
});

// Watch for changes in selected options and update the URL
watch(
  selectedOptions,
  () => {
    if (
      selectedOptions.value.geography &&
      selectedOptions.value.forestType &&
      selectedOptions.value.standAge &&
      selectedOptions.value.vegetationType
    ) {
      const newPath = generateParams();
      router.push(newPath); // or router.replace(newPath) if you want to replace the current URL without adding to the history
    }
  },
  { deep: true }
);

// Watch for changes in the route params and update the selectedOptions accordingly
watch(
  () => route.params,
  (newParams) => {
    selectedOptions.value.geography = newParams.geography || null;
    selectedOptions.value.forestType = newParams.forestType || null;
    selectedOptions.value.standAge = newParams.standAge || null;
    selectedOptions.value.vegetationType = newParams.vegetationType || null;
  },
  { immediate: true }
);

// Function to update selections and toggle the checkbox
function updateSelection(value, category) {
  selectedOptions.value[category] =
    selectedOptions.value[category] === value ? null : value;
}

const enabledGeographyOptions = computed(() => {
  return geographyOptions.map((option) => ({
    ...option,
    disabled:
      selectedOptions.value.forestType ||
      selectedOptions.value.standAge ||
      selectedOptions.value.vegetationType
        ? !validCombinations.value.some(
            (comb) =>
              (!selectedOptions.value.forestType ||
                comb.forest === selectedOptions.value.forestType) &&
              (!selectedOptions.value.standAge ||
                comb.age === selectedOptions.value.standAge) &&
              (!selectedOptions.value.vegetationType ||
                comb.veg === selectedOptions.value.vegetationType) &&
              comb.geo === option.value
          )
        : false,
  }));
});

const enabledForestTypes = computed(() => {
  return forestTypeOptions.map((option) => ({
    ...option,
    disabled:
      selectedOptions.value.geography ||
      selectedOptions.value.standAge ||
      selectedOptions.value.vegetationType
        ? !validCombinations.value.some(
            (comb) =>
              (!selectedOptions.value.geography ||
                comb.geo === selectedOptions.value.geography) &&
              (!selectedOptions.value.standAge ||
                comb.age === selectedOptions.value.standAge) &&
              (!selectedOptions.value.vegetationType ||
                comb.veg === selectedOptions.value.vegetationType) &&
              comb.forest === option.value
          )
        : false,
  }));
});

const enabledStandAges = computed(() => {
  return standAgeOptions.map((option) => ({
    ...option,
    disabled:
      selectedOptions.value.geography ||
      selectedOptions.value.forestType ||
      selectedOptions.value.vegetationType
        ? !validCombinations.value.some(
            (comb) =>
              (!selectedOptions.value.geography ||
                comb.geo === selectedOptions.value.geography) &&
              (!selectedOptions.value.forestType ||
                comb.forest === selectedOptions.value.forestType) &&
              (!selectedOptions.value.vegetationType ||
                comb.veg === selectedOptions.value.vegetationType) &&
              comb.age === option.value
          )
        : false,
  }));
});

const enabledVegetationTypes = computed(() => {
  return vegetationTypeOptions.map((option) => ({
    ...option,
    disabled:
      selectedOptions.value.geography ||
      selectedOptions.value.forestType ||
      selectedOptions.value.standAge
        ? !validCombinations.value.some(
            (comb) =>
              (!selectedOptions.value.geography ||
                comb.geo === selectedOptions.value.geography) &&
              (!selectedOptions.value.forestType ||
                comb.forest === selectedOptions.value.forestType) &&
              (!selectedOptions.value.standAge ||
                comb.age === selectedOptions.value.standAge) &&
              comb.veg === option.value
          )
        : false,
  }));
});

const generateParams = () => {
  if (
    !selectedOptions.value.geography ||
    !selectedOptions.value.forestType ||
    !selectedOptions.value.standAge ||
    !selectedOptions.value.vegetationType
  ) {
    return ""; // Return an empty string or handle this case appropriately
  }

  const path = [
    encodeURIComponent(selectedOptions.value.geography),
    encodeURIComponent(selectedOptions.value.forestType),
    encodeURIComponent(selectedOptions.value.standAge),
    encodeURIComponent(selectedOptions.value.vegetationType),
  ].join("/");

  return `/svampdata/dashboard/${path}`;
};

// Watcher to react to changes in geography from the map
watch(
  () => props.geographyFromMap,
  (newGeography) => {
    selectedOptions.value.geography = newGeography;
  },
  { immediate: true }
);
</script>

<style>
.disabled-text {
  color: #a3a3a3; /* or any color you prefer */
}
</style>
