<template>
  <!-- Geography Options -->
  <div class="container mx-auto px-6 text-center">
    <BaseHeading lead="tight" size="4xl" class="font-bold mb-4 text-center">
      Använd skogsmiljö-filter <br /><span class="text-primary-500"
        >eller utforska via karta</span
      >
    </BaseHeading>
    <p class="text-xl mb-10 text-neutral-500 mx-40 text-center">
      Genom att ange var i Sverige, vilka trädslag som växer där, deras ålder
      och fältskitetets sammansättning kan du se vilka arter som kan förekomma i
      miljön. Prova nedan eller sök via karta.
    </p>
  </div>
  <div
    class="grid grid-cols-4 gap-3 p-5 pb-4 dark:border-neutral-800 border-neutral-00 w-fulloverflow-y-scroll shrink-0 mb-6"
  >
    <!-- Geography Selection -->
    <div
      class="bg-white ring-1 ring-neutral-200 hover:ring-fuchsia-500 transition-all rounded-2xl p-4 relative pb-8 mt-14 h-full"
    >
      <div class="flex items-center justify-center">
        <div
          class="my-4 rounded-lg text-fuchsia-500 flex justify-center items-center mr-2"
        >
          <Icon name="material-symbols:location-on-outline" class="h-10 w-10" />
        </div>
        <BaseHeading size="2xl" weight="light"> Var i Sverige </BaseHeading>
      </div>
      <div class="relative p-6 pb-4 h-fit">
        <div>
          <div
            v-for="option in enabledGeographyOptions"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500 items-center"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'geography-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-lg"
              data-nui-tooltip-position="left"
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

      <Icon
        name="heroicons:question-mark-circle"
        class="h-8 w-8 text-neutral-300 absolute bottom-4 left-4"
      />
    </div>

    <!-- Forest Type Options -->
    <div
      class="bg-white ring-1 ring-neutral-200 hover:ring-green-500 transition-all rounded-2xl p-4 relative pb-8"
    >
      <div class="flex items-center justify-center">
        <div
          class="my-4 rounded-lg text-green-500 flex justify-center items-center mr-2"
        >
          <Icon name="lucide:trees" class="h-10 w-10" />
        </div>
        <BaseHeading size="2xl" weight="light"> Skogstyp </BaseHeading>
      </div>
      <div class="relative p-6 pb-4 h-fit">
        <div>
          <div
            v-for="option in enabledForestTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500 items-center"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'forestType-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-lg"
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
      <Icon
        name="heroicons:question-mark-circle"
        class="h-8 w-8 text-neutral-300 absolute bottom-4 left-4"
      />
    </div>

    <!-- Stand Age Options -->
    <div
      class="bg-white ring-1 ring-neutral-200 hover:ring-violet-500 transition-all rounded-2xl p-4 relative pb-8 mt-16 h-full"
    >
      <div class="flex items-center justify-center">
        <div
          class="my-4 rounded-lg text-violet-500 flex justify-center items-center mr-2"
        >
          <Icon name="carbon:crop-growth" class="h-10 w-10" />
        </div>
        <BaseHeading size="2xl" weight="light"> Beståndsålder </BaseHeading>
      </div>
      <label class="text-neutral-400 text-sm"></label>
      <div class="relative p-6 pb-4 h-fit">
        <div>
          <div
            v-for="option in enabledStandAges"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500 items-center"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'standAge-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-lg"
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
      <Icon
        name="heroicons:question-mark-circle"
        class="h-8 w-8 text-neutral-300 absolute bottom-4 left-4"
      />
    </div>

    <!-- Vegetation Type Options -->
    <div
      class="bg-white ring-1 ring-neutral-200 hover:ring-teal-500 transition-all rounded-2xl p-4 relative pb-8 mt-6 h-full"
    >
      <div class="flex items-center justify-center">
        <div
          class="my-4 rounded-lg text-teal-500 flex justify-center items-center mr-2"
        >
          <Icon name="fluent-emoji-high-contrast:herb" class="h-10 w-10" />
        </div>
        <BaseHeading size="2xl" weight="light"> Fältskikt </BaseHeading>
      </div>
      <div class="relative p-6 pb-4 h-fit">
        <div>
          <div
            v-for="option in enabledVegetationTypes"
            :key="option.value"
            class="flex justify-between mb-2 text-neutral-500 items-center"
            @mouseover="setHoveredDescription(option.description)"
            @mouseleave="clearHoveredDescription"
          >
            <label
              :for="'vegetationType-' + option.value"
              :class="{
                'opacity-40 cursor-not-allowed': option.disabled,
                'cursor-pointer': !option.disabled,
              }"
              class="text-lg"
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
      <Icon
        name="heroicons:question-mark-circle"
        class="h-8 w-8 text-neutral-300 absolute bottom-4 left-4"
      />
    </div>
  </div>

  <!-- Description Display in Bottom Left Corner -->
  <div class="flex justify-center items-start mt-24">
    <!-- Navigation Buttons -->
    <div class="flex gap-4">
      <NuxtLink to="/svampdata">
        <BaseButton color="default" size="lg" shape="full">
          <span>Sök i karta</span>
          <Icon
            name="material-symbols:map-outline-rounded"
            class="-ms-1 size-6"
          />
        </BaseButton>
        <!-- <BaseIconBox
          flavor="solid"
          color="primary"
          shape="full"
          size="md"
          class="opacity-90 hover:h-14 hover:w-14 transition-all duration-100"
        >
          <Icon name="heroicons-solid:magnifying-glass" class="h-6 w-6" />
        </BaseIconBox> -->
      </NuxtLink>
      <NuxtLink :to="generateParams()" v-if="!isButtonDisabled()">
        <BaseButton color="primary" size="lg" shape="full">
          <span>Gå till miljö</span>
          <Icon name="heroicons:arrow-right-16-solid" class="-ms-1 size-6" />
        </BaseButton>
        <!-- <BaseIconBox
          flavor="solid"
          color="primary"
          shape="full"
          size="md"
          class="opacity-90 hover:h-14 hover:w-14 transition-all duration-100"
        >
          <Icon name="heroicons-solid:magnifying-glass" class="h-6 w-6" />
        </BaseIconBox> -->
      </NuxtLink>
      <div v-else>
        <BaseButton
          color="primary"
          disabled
          size="lg"
          shape="full"
          data-nui-tooltip-position="right"
          data-nui-tooltip="Ange miljö ovanför först"
        >
          <span>Gå till miljö</span>
          <Icon name="heroicons:arrow-right-16-solid" class="-ms-1 size-6" />
        </BaseButton>
        <!-- <BaseIconBox
          shape="full"
          flavor="solid"
          color="default"
          class="opacity-80 cursor-not-allowed"
          size="md"
        >
          <Icon name="heroicons-solid:magnifying-glass" class="h-6 w-6" />
        </BaseIconBox> -->
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
    description: "Norr om breddgrad 60°",
  },
  {
    value: "Söder",
    label: "Södra Sverige",
    description: "Söder om breddgrad 60°",
  },
];
const forestTypeOptions = [
  {
    value: "Granskog",
    label: "Granskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är gran",
  },
  {
    value: "Tallskog",
    label: "Tallskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är tall",
  },
  {
    value: "Barrblandskog",
    label: "Barrblandskog",
    description: "Minst 70% barrträd, men varken tall eller gran uppnår 70%",
  },
  {
    value: "Lövblandskog",
    label: "Blandskog",
    description: "31-69% lövträd eller barrträd",
  },
  { value: "Lövskog", label: "Lövskog", description: "Minst 70% lövträd" },
  {
    value: "EkBokskog",
    label: "Ek och Bokskog",
    description: "Minst 70% lövträd, och minst 70% av dessa är ek eller bok",
  },
  {
    value: "Naturbete",
    label: "Naturbete",
    description: "Trädbevuxna gräsmarker som används för betesdjur",
  },
];
const standAgeOptions = [
  {
    value: "1-40",
    label: "1-40 år",
    description: "Trädbeståndets medelålder är mellan 1 och 40 år",
  },
  {
    value: "41-90",
    label: "41-90 år",
    description: "Trädbeståndets medelålder är mellan 41 och 90 år",
  },
  {
    value: "91",
    label: "91 år och äldre",
    description: "Trädbeståndets medelålder är äldre än 90 år ",
  },
  {
    value: "allaåldrar",
    label: "Alla åldrar",
    description: "Inkluderar trädbestånds med alla trädmedelåldrar",
  },
];
const vegetationTypeOptions = [
  {
    value: "Örter_grupp",
    label: "Örttyper",
    description:
      "Näringsrik mark med fältskikt som innehåller högörter, lågörter och bredbladiga gräs",
  },
  {
    value: "Blåbär_grupp",
    label: "Blåbärstyper",
    description: "Fältskikt som domineras av blåbär och smalbladiga gräs",
  },
  {
    value: "Lingon_grupp",
    label: "Lingon-fattigristyper",
    description:
      "Näringsfattig mark med fältskikt som domineras av lingon, kråkbär, ljung, eller andra  fattigris",
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

function emitSelections() {
  if (!isButtonDisabled()) {
    emit("selections-changed", { ...selectedOptions.value });
  }
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
