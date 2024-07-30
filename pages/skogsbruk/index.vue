<template>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-3">
      <div class="zoomable-image relative">
        <NuxtImg
          width="1200"
          :src="currentImagePath"
          class="z-0 rounded-xl"
          format="webp"
          quality="70"
        />
        <div class="absolute bottom-0 w-full p-5">
          <URange
            :step="25"
            v-model="time"
            size="md"
            :ui="{
              track: {
                background:
                  '[&::-webkit-slider-runnable-track]:bg-gray-200/40 [&::-moz-range-track]:bg-gray-200/40 [&::-webkit-slider-runnable-track]:dark:bg-gray-700/40 [&::-moz-range-track]:dark:bg-gray-700/40',
              },
            }"
          />
        </div>
      </div>
    </div>
    <div
      class="relative p-3 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200 flex flex-col justify-between"
    >
      <div>
        <UTabs
          :items="startskog"
          class="w-full"
          v-model="selectedStartskogIndex"
        >
          <template #default="{ item, selected }">
            <span
              class="truncate"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            >
              {{ item.label }}
            </span>
          </template>
        </UTabs>
        <UTabs
          :items="frameworks"
          class="w-full"
          orientation="vertical"
          v-model="selectedFrameworkIndex"
        >
          <template #default="{ item, selected }" class="justify-start">
            <Icon
              :name="item.icon"
              class="w-4 h-4 flex-shrink-0 mr-2"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            />
            <span
              class="truncate"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            >
              {{ item.label }}
            </span>
          </template>
        </UTabs>
        <div class="grid grid-cols-1 gap-3 mx-2 my-3">
          <BaseSwitchThin v-model="showTree" label="Träd" color="primary" />
          <BaseSwitchThin v-model="showFungi" label="Svamp" color="primary" />
        </div>
      </div>
      <div class="w-full mt-auto">
        <USelectMenu v-model="selectedTimeIndex" :options="timesLabels" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useTitleStore } from "~/stores/titleStore";

// Reactive references for state management
const time = ref(25);
const showTree = ref(true); // State for tree visibility switch
const showFungi = ref(true); // State for fungi visibility switch
const selectedFrameworkIndex = ref(0); // Index of selected framework
const selectedStartskogIndex = ref(0); // Reactive state for selected startskog

const selectedTimeIndex = ref(0); // Index of selected time from times array

const frameworks = [
  {
    id: 1,
    label: "Trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
  },
  {
    id: 4,
    label: "Naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
  },

  {
    id: 2,
    label: "Blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
  },
  {
    id: 5,
    label: "Luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
  },
  {
    id: 3,
    label: "Skärmträd",
    text: "Fröträd lämnas",
    icon: "simple-icons:redwoodjs",
  },
];

const timesLabels = [
  "Innan avverkning",
  "Efter avverkning",
  "20 år efter avverkning",
  "50 år efter avverkning",
  "80 år efter avverkning",
];

const times = ["före", "efter", "20", "50", "80"];

const startskog = [
  {
    label: "Naturskog",
    value: "naturskog",
    icon: "i-heroicons-information-circle",
  },
  {
    label: "Produktion",
    value: "produktionsskog_",
    icon: "i-heroicons-arrow-down-tray",
  },
];

const currentFramework = computed(
  () => frameworks[selectedFrameworkIndex.value]
);
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value].value
); // Use value for filename

const currentTime = computed(() => times[selectedTimeIndex.value]);

// Map slider values to time labels for filenames
function mapTimeToLabel(value) {
  const labels = [0, 25, 50, 75, 100]; // Slider values
  const index = labels.indexOf(value);
  return times[index] || times[0]; // Default to 'före' if not found
}

// Current image path computed with mapped time label
const currentImagePath = computed(() => {
  const framework = currentFramework.value.label.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value;
  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});
// Computed property to convert numeric time value to index
const timeIndex = computed({
  get: () => time.value / 25,
  set: (index) => {
    time.value = index * 25; // Ensure this triggers updates to both URange and USelectMenu
  },
});

// Sync timeIndex with a human-readable format for USelectMenu
const time_value = computed({
  get: () => times[timeIndex.value],
  set: (val) => {
    const index = times.indexOf(val);
    if (index !== -1) timeIndex.value = index; // Update the index which updates time
  },
});
// Setup the title store
const titleStore = useTitleStore();
onMounted(() => titleStore.setTitle("Skogsbruk"));
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
