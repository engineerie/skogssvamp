<template>
  <!-- Geography Options -->

  <div
    class="grid grid-cols-1 gap-3 p-5 pb-12 border-l-[1px] dark:border-neutral-800 border-neutral-00 w-96 h-screen bg-neutral-50 dark:bg-neutral-900 overflow-y-scroll shrink-0"
  >
    <div class="flex justify-between pb-">
      <BaseHeading>Miljö</BaseHeading>
      <BaseThemeSwitch />
    </div>
    <div
      class="p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
    >
      <BaseProse class="text-sm">
        Välj geografi och skogstyp direkt på kartan eller i listorna nedan.
        Uppgifter om beståndsålder och markvegetation behöver väljas
        manuellt.</BaseProse
      >
    </div>
    <div>
      <label class="text-neutral-400 text-sm">Geografi</label>
      <div
        class="p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledGeographyOptions"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
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
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledForestTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
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
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledStandAges"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
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
        class="relative p-6 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div>
          <div
            v-for="option in enabledVegetationTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500"
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
  <!-- Navigation Buttons -->
  <div class="absolute bottom-4 right-6">
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
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

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
  { value: "Norr", label: "Norra Sverige" },
  { value: "Söder", label: "Södra Sverige" },
];
const forestTypeOptions = [
  { value: "Granskog", label: "Granskog" },
  { value: "Tallskog", label: "Tallskog" },
  { value: "Barrblandskog", label: "Blandad barrskog" },
  { value: "Lövblandskog", label: "Blandad lövskog" },
  { value: "Lövskog", label: "Lövskog" },
  { value: "EkBokskog", label: "Ek och Bokskog" },
  { value: "Naturbete", label: "Naturbete" },
];
const standAgeOptions = [
  { value: "1-40", label: "1-40 år" },
  { value: "41-90", label: "41-90 år" },
  { value: "91", label: "91 år och äldre" },
  { value: "allaåldrar", label: "Alla åldrar" },
];
const vegetationTypeOptions = [
  { value: "Högört", label: "Högört" },
  { value: "Lågört", label: "Lågört" },
  { value: "Utan fältskikt", label: "Utan fältskikt" },
  { value: "Bredblad gräs", label: "Bredblad gräs" },
  { value: "Smalblad gräs", label: "Smalblad gräs" },
  { value: "Blåbär", label: "Blåbär" },
  { value: "Lingon", label: "Lingon" },
  { value: "KråkbärLjung", label: "Kråkbär och Ljung" },
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
