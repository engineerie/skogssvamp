<template>
  <!-- Geography Options -->

  <div
    class="grid grid-cols-4 gap-3 p-5 pb-4 dark:border-neutral-800 border-neutral-00 w-fulloverflow-y-scroll shrink-0"
  >
    <!-- Geography Selection -->
    <div>
      <label class="text-neutral-400 text-sm">Geografi</label>
      <div
        class="p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-10 border-[1px] dark:border-neutral-700 dark:border-opacity-30 border-stone-200 h-fit"
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
    </div>

    <!-- Forest Type Options -->
    <div>
      <label class="text-neutral-400 text-sm">Skogstyp</label>
      <div
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-10 border-[1px] dark:border-neutral-700 dark:border-opacity-30 border-stone-200 h-fit"
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
    </div>

    <!-- Stand Age Options -->
    <div>
      <label class="text-neutral-400 text-sm">Beståndsålder</label>
      <div
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-10 border-[1px] dark:border-neutral-700 dark:border-opacity-30 border-stone-200 h-fit"
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
    </div>

    <!-- Vegetation Type Options -->
    <div>
      <label class="text-neutral-400 text-sm">Markvegetation</label>
      <div
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-10 border-[1px] dark:border-neutral-700 dark:border-opacity-30 border-stone-200 h-fit"
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
  </div>

  <!-- Description Display in Bottom Left Corner -->
  <div class="flex justify-between items-start">
    <div
      class="p-4 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm max-w-md relative"
    >
      <Transition name="fade">
        <BaseMessage
          v-if="hoveredDescription"
          type="primary"
          icon="material-symbols:info-i-rounded"
          shape="full"
          class="fixed max-w-3xl"
          >{{ hoveredDescription }}</BaseMessage
        >
      </Transition>
    </div>

    <!-- Navigation Buttons -->
    <div class="">
      <NuxtLink :to="generateParams()" v-if="!isButtonDisabled()">
        <BaseIconBox
          flavor="solid"
          color="primary"
          shape="full"
          size="md"
          class="opacity-90 hover:h-14 hover:w-14 transition-all duration-100"
        >
          <Icon name="heroicons-solid:magnifying-glass" class="h-6 w-6" />
        </BaseIconBox>
      </NuxtLink>
      <div v-else>
        <BaseIconBox
          shape="full"
          flavor="solid"
          color="default"
          class="opacity-80 cursor-not-allowed"
          size="md"
        >
          <Icon name="heroicons-solid:magnifying-glass" class="h-6 w-6" />
        </BaseIconBox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

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

// Inside ListBoxRowMap component
function handleSelectionChange(selectedGeography) {
  emit("update:geographyFromMap", selectedGeography);
}

const props = defineProps({
  geographyFromMap: String,
});

watch(
  () => props.geographyFromMap,
  (newValue) => {
    // This watcher will confirm if changes are being received
    console.log("New geography from map:", newValue);
    // Potentially update local state here
  }
);

// In ListBoxRowMap component
function updateGeography(newGeography) {
  // Logic to update local state here
  emit("update:geographyFromMap", newGeography);
}

const validCombinations = ref([]);

// Fetching valid combinations on mounted
onMounted(async () => {
  const response = await fetch("/validCombinations.json");
  validCombinations.value = await response.json();
});

const fields = reactive({
  first: "",
});

const route = useRoute();

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

// Reactive state based on route parameters
const selectedOptions = ref({
  geography: null,
  forestType: null,
  standAge: null,
  vegetationType: null,
});

function isButtonDisabled() {
  // Check if any of the selected options are null or undefined
  return Object.values(selectedOptions.value).some(
    (option) => option === null || option === undefined
  );
}

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

// Compute initial state from route parameters and setup watchers
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

// Watcher to react to changes in geography from the map
watch(
  () => props.geographyFromMap,
  (newGeography) => {
    selectedOptions.value.geography = newGeography;
  },
  { immediate: true }
);

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
</script>

<style>
.disabled-text {
  color: #a3a3a3; /* or any color you prefer */
}
</style>
