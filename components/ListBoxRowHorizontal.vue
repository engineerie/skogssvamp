<template>
  <div class="overflow-visible">
    <div class="grid grid-cols-4 gap-5 overflow-visible">
      <!-- ==================== GEOGRAPHY COLUMN ==================== -->
      <div
        class="relative p-6 pl-10 pb-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
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
        <!-- Info button -->
        <Icon
          @click="openModal('geography')"
          name="heroicons:question-mark-circle"
          class="size-6 text-neutral-300 absolute bottom-2 left-2 hover:text-primary-500 cursor-pointer transition-all"
        />
      </div>

      <!-- ==================== FOREST TYPE COLUMN ==================== -->
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
        <!-- Info button -->
        <Icon
          @click="openModal('forestType')"
          name="heroicons:question-mark-circle"
          class="size-6 text-neutral-300 absolute bottom-2 left-2 hover:text-primary-500 cursor-pointer transition-all"
        />
      </div>

      <!-- ==================== STAND AGE COLUMN ==================== -->
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
        <!-- Info button -->
        <Icon
          @click="openModal('standAge')"
          name="heroicons:question-mark-circle"
          class="size-6 text-neutral-300 absolute bottom-2 left-2 hover:text-primary-500 cursor-pointer transition-all"
        />
      </div>

      <!-- ==================== VEGETATION TYPE COLUMN ==================== -->
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
        <!-- Info button -->
        <Icon
          @click="openModal('vegetationType')"
          name="heroicons:question-mark-circle"
          class="size-6 text-neutral-300 absolute bottom-2 left-2 hover:text-primary-500 cursor-pointer transition-all"
        />
      </div>
    </div>

    <!-- Reusable Modal -->
    <UModal v-model="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <Icon :name="modalIcon" :class="modalIconColor" class="size-6" />
              <BaseHeading size="xl" weight="light">
                {{ modalTitle }}
              </BaseHeading>
            </div>
            <BaseButtonIcon
              shape="full"
              @click="closeModal"
              class="absolute top-4 right-4"
            >
              <Icon name="heroicons:x-mark" class="size-5" />
            </BaseButtonIcon>
          </div>
        </template>
        <div class="space-y-2">
          <div
            v-for="option in currentModalOptions"
            :key="option.value"
            class="grid grid-cols-3 flex-grow items-center justify-between rounded-xl overflow-hidden h-28"
            :class="[
              option.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:ring-1 hover:ring-neutral-200',
              option.value === currentSelectedValue
                ? 'border border-green-500 shadow-sm '
                : '',
            ]"
            @click="() => handleModalOptionClick(option)"
          >
            <!-- Left side: title and description -->
            <div class="p-4 col-span-2">
              <div class="font-semibold text-gray-700">{{ option.label }}</div>
              <div class="text-sm text-gray-500">{{ option.description }}</div>
            </div>
            <!-- Right side: placeholder image -->
            <div
              class="col-span-1 h-24 w-36 my-2 bg-gray-200 flex items-center justify-center rounded-xl"
            ></div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const restrictionEnabled = ref(false);
const setRestriction = (enabled) => {
  restrictionEnabled.value = enabled;
};

const router = useRouter();
const route = useRoute();

// --- Hover Tooltip Logic ---
const hoveredDescription = ref("");
const setHoveredDescription = (description) => {
  hoveredDescription.value = description || "";
};
const clearHoveredDescription = () => {
  hoveredDescription.value = "";
};

const props = defineProps({
  geographyFromMap: String,
});

// --- Selected Options State ---
const selectedOptions = ref({
  geography: null,
  forestType: null,
  standAge: null,
  vegetationType: null,
});

// --- Valid Combinations from JSON ---
const validCombinations = ref([]);
onMounted(async () => {
  const response = await fetch("/validCombinations.json");
  validCombinations.value = await response.json();

  // Initialize from route params if present
  selectedOptions.value.geography = route.params.geography || null;
  selectedOptions.value.forestType = route.params.forestType || null;
  selectedOptions.value.standAge = route.params.standAge || null;
  selectedOptions.value.vegetationType = route.params.vegetationType || null;
});

// Watch for changes in selectedOptions and update the route accordingly.
watch(
  selectedOptions,
  () => {
    const { geography, forestType, standAge, vegetationType } =
      selectedOptions.value;
    if (geography && forestType && standAge && vegetationType) {
      const newPath = generateParams();
      if (newPath && newPath !== route.fullPath) {
        router.push(newPath);
      }
    }
  },
  { deep: true }
);

const generateParams = () => {
  if (
    !selectedOptions.value.geography ||
    !selectedOptions.value.forestType ||
    !selectedOptions.value.standAge ||
    !selectedOptions.value.vegetationType
  ) {
    return "";
  }
  const path = [
    encodeURIComponent(selectedOptions.value.geography),
    encodeURIComponent(selectedOptions.value.forestType),
    encodeURIComponent(selectedOptions.value.standAge),
    encodeURIComponent(selectedOptions.value.vegetationType),
  ].join("/");
  return `/svampdata/dashboard/${path}`;
};

// --- Options Arrays ---
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
  {
    value: "EkBokskog",
    label: "Ek och Bokskog",
    description: "Minst 70% lövträd, och minst 70% av dessa är ek eller bok",
  },
  {
    value: "Lövskog",
    label: "Övrig lövskog",
    description: "Minst 70% lövträd",
  },
  {
    value: "Naturbete",
    label: "Trädklädd betesmark",
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
    description: "Trädbeståndets medelålder är äldre än 90 år",
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
      "Näringsfattig mark med fältskikt som domineras av lingon, kråkbär, ljung, eller andra fattigris",
  },
];

// --- VALID COMBINATIONS: Compute Enabled Options Based on JSON ---
const enabledGeographyOptions = computed(() => {
  return geographyOptions.map((option) => ({
    ...option,
    disabled:
      restrictionEnabled.value &&
      (selectedOptions.value.forestType ||
        selectedOptions.value.standAge ||
        selectedOptions.value.vegetationType)
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
      restrictionEnabled.value &&
      (selectedOptions.value.geography ||
        selectedOptions.value.standAge ||
        selectedOptions.value.vegetationType)
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
      restrictionEnabled.value &&
      (selectedOptions.value.geography ||
        selectedOptions.value.forestType ||
        selectedOptions.value.vegetationType)
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
      restrictionEnabled.value &&
      (selectedOptions.value.geography ||
        selectedOptions.value.forestType ||
        selectedOptions.value.standAge)
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

// --- Update Selection Function ---
function updateSelection(value, category) {
  selectedOptions.value[category] =
    selectedOptions.value[category] === value ? null : value;
}

// --- Modal Logic ---
const openModalType = ref(null);
const isModalOpen = computed({
  get: () => openModalType.value !== null,
  set: (val) => {
    if (!val) openModalType.value = null;
  },
});
function openModal(type) {
  openModalType.value = type;
}
function closeModal() {
  openModalType.value = null;
}

const currentModalOptions = computed(() => {
  switch (openModalType.value) {
    case "geography":
      return enabledGeographyOptions.value;
    case "forestType":
      return enabledForestTypes.value;
    case "standAge":
      return enabledStandAges.value;
    case "vegetationType":
      return enabledVegetationTypes.value;
    default:
      return [];
  }
});
const modalTitle = computed(() => {
  switch (openModalType.value) {
    case "geography":
      return "Var i Sverige";
    case "forestType":
      return "Skogstyp";
    case "standAge":
      return "Beståndsålder";
    case "vegetationType":
      return "Fältskikt";
    default:
      return "";
  }
});
const modalIcon = computed(() => {
  switch (openModalType.value) {
    case "geography":
      return "material-symbols:location-on-outline";
    case "forestType":
      return "lucide:trees";
    case "standAge":
      return "carbon:crop-growth";
    case "vegetationType":
      return "fluent-emoji-high-contrast:herb";
    default:
      return "";
  }
});
const modalIconColor = computed(() => {
  switch (openModalType.value) {
    case "geography":
      return "text-fuchsia-500";
    case "forestType":
      return "text-green-500";
    case "standAge":
      return "text-violet-500";
    case "vegetationType":
      return "text-teal-500";
    default:
      return "";
  }
});
const currentSelectedValue = computed(() => {
  return selectedOptions.value[openModalType.value];
});
function handleModalOptionClick(option) {
  if (option.disabled) return;
  updateSelection(option.value, openModalType.value);
  closeModal();
}

// --- Reset Selections ---
function resetSelections() {
  selectedOptions.value = {
    geography: null,
    forestType: null,
    standAge: null,
    vegetationType: null,
  };
}

// Expose properties and functions for parent components.
defineExpose({
  selectedOptions,
  openModal,
  resetSelections,
  setRestriction,
  updateSelection,
  enabledGeographyOptions,
  enabledForestTypes,
  enabledStandAges,
  enabledVegetationTypes,
});
</script>

<style scoped>
.disabled-text {
  color: #a3a3a3;
}
.relative {
  position: relative;
}
/* Transition styles */
.transition-height {
  transition: height 0.5s ease-in-out;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
