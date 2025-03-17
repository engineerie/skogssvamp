<template>
  <div>
    <!-- list view -->
    <div class="flex justify-between">
      <div class="flex justify between">
        <div class="flex gap-4">
          <h1 class="text-neutral-800 dark:text-neutral-200 text-3xl ml-4">
            Alla&nbsp;mykorrhizasvampar
          </h1>
          <UTabs
            v-model="selectedIndex"
            :items="items"
            :ui="{
              list: {
                rounded: 'rounded-full',

                marker: {
                  rounded: 'rounded-full',
                },
              },
            }"
          />
          <UBadge
            v-if="!isNormalView"
            size="lg"
            color="violet"
            variant="subtle"
            :ui="{ rounded: 'rounded-lg' }"
            class="h-fit"
            ><Icon
              name="solar:dna-linear"
              class="size-6 text-violet-500 mr-1"
            />Enligt DNA från markinventeringens provytor
          </UBadge>
        </div>
      </div>
      <div class="flex gap-4 items-end pb-2">
        <div class="w-32">
          <h1 class="text-neutral-400 text-xs">
            Baserat på {{ sampleEnvCount }} skogar
          </h1>
          <UProgress
            :color="color"
            :indicator="false"
            :value="sampleEnvCount"
            :max="100"
            size="xl"
            :data-nui-tooltip="`Baserat på ${sampleEnvCount} skogar`"
          />
        </div>
        <UButton
          size="lg"
          :icon="
            props.isNormalView
              ? 'material-symbols:open-in-full'
              : 'material-symbols:close-fullscreen'
          "
          :color="props.isNormalView ? 'white' : 'rose'"
          :ui="{ rounded: 'rounded-full' }"
          @click="$emit('enlarge')"
        />
      </div>
    </div>
    <FullScreenEdna
      v-if="activeTab === 'spatialForest'"
      :isNormalView="props.isNormalView"
    />

    <!-- column chart view -->

    <div
      v-if="activeTab === 'columnChart'"
      class="p-6 backdrop-blur-3xl rounded-xl bg-white dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <div class="absolute top-2 right-2">
        <div class="flex h-fit shrink-0 gap-1 items-center">
          <!-- Left mini-legend -->
          <h1
            class="text-neutral-800 mr-2 bg-neutral-50 border-[0.5px] border-neutral-100 py-1 px-2 rounded-xl"
          >
            {{ data ? data.length : 0 }} Arter
          </h1>
          <div
            class="rounded-l-xl flex items-end px-3 -mr-2 py-1 bg-neutral-50 border-[0.5px] border-r-0 border-neutral-100 text-neutral-400"
          >
            <div class="flex items-end" :data-nui-tooltip="'Mycelform'">
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 -mr-5 text-gray-500 z-[2]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 -mr-5 text-gray-400 z-[1]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 mr-2 text-gray-300 z-0"
              />
              <h1 class="text-neutral-400">{{ topCount }} Arter</h1>
            </div>
          </div>
          <!-- Right mini-legend -->
          <div
            class="flex items-end px-3 py-1 bg-neutral-50 border-[0.5px] border-neutral-100 rounded-r-xl text-neutral-400 border-l-0"
          >
            <div class="flex items-end" :data-nui-tooltip="'Mycelform'">
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 -mr-5 text-yellow-400 z-[3]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 -mr-5 text-lime-400 z-[2]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 -mr-5 text-teal-400 z-[1]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-6 w-6 mr-2 text-rose-400 z-0"
              />
              <h1 size="xs" weight="medium" class="text-neutral-400">
                {{ remainingCount }} Arter
              </h1>
            </div>
          </div>
          <UButton
            class="z-10"
            icon="heroicons:magnifying-glass-plus"
            @click="handleZoomIn"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            v-if="activeTab === 'columnChart'"
          />
          <UButton
            class="z-10"
            icon="heroicons:magnifying-glass-minus-solid"
            @click="handleZoomOut"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            v-if="activeTab === 'columnChart'"
          />
        </div>
      </div>
      <BarChart
        :chartData="data"
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
        class="w-full h-[450px]"
        :chartWidth="chartWidth"
        :key="`-${routeKey}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const items = [
  {
    label: "Diagram",
    icon: "material-symbols:bar-chart",
    value: "columnChart",
  },
  {
    label: "Tabell",
    icon: "material-symbols:table-outline",
    value: "spatialForest",
  },
];

const activeTab = ref("columnChart");

// Create a computed property that converts between the index and the custom value
const selectedIndex = computed({
  get() {
    // Find the index of the active tab value in the items array.
    const index = items.findIndex((item) => item.value === activeTab.value);
    return index === -1 ? 0 : index;
  },
  set(index) {
    // Update your custom active tab value based on the new index.
    activeTab.value = items[index].value;
  },
});

// -- PROPS --
const props = defineProps({
  isNormalView: Boolean,
});

// -- EMITS --
const emit = defineEmits(["zoomIn", "zoomOut", "enlarge"]);
// const emitEnlarge = (componentName) => {
//   emit("enlarge", componentName);
// };

// -- ROUTE --
const route = useRoute();

// -- TABS, CHART WIDTH, ZOOM --
// const activeTab = ref("columnChart");
const chartWidth = ref("100%");

const handleZoomIn = () => {
  let currentWidth = parseInt(chartWidth.value);
  if (currentWidth < 600) {
    chartWidth.value = `${currentWidth + 250}%`;
  }
};

const handleZoomOut = () => {
  let currentWidth = parseInt(chartWidth.value);
  if (currentWidth > 100) {
    chartWidth.value = `${currentWidth - 250}%`;
  }
};

// -- LABELS (Computed) --
const geographyOptions = [
  { value: "Norr", label: "Norra Sverige" },
  { value: "Söder", label: "Södra Sverige" },
];
const forestTypeOptions = [
  { value: "Granskog", label: "Granskog" },
  { value: "Tallskog", label: "Tallskog" },
  { value: "Barrblandskog", label: "Barrblandskog" },
  { value: "Lövblandskog", label: "Blandskog" },
  { value: "Lövskog", label: "Övrig lövskog" },
  { value: "EkBokskog", label: "Ek och Bokskog" },
  { value: "Naturbete", label: "Trädklädd betesmark" },
];
const standAgeOptions = [
  { value: "1-40", label: "1-40 år" },
  { value: "41-90", label: "41-90 år" },
  { value: "91", label: "91 år och äldre" },
  { value: "allaåldrar", label: "Alla åldrar" },
];
const vegetationTypeOptions = [
  { value: "Örter_grupp", label: "Örttyper" },
  { value: "Blåbär_grupp", label: "Blåbärstyper" },
  { value: "Lingon_grupp", label: "Lingon-fattigristyper" },
];

const geographyLabel = computed(() => {
  const param = decodeURIComponent(route.params.geography || "");
  const option = geographyOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
const forestTypeLabel = computed(() => {
  const param = decodeURIComponent(route.params.forestType || "");
  const option = forestTypeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
const standAgeLabel = computed(() => {
  const param = decodeURIComponent(route.params.standAge || "");
  const option = standAgeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
const vegetationTypeLabel = computed(() => {
  const param = decodeURIComponent(route.params.vegetationType || "");
  const option = vegetationTypeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});

const routeKey = computed(() => {
  return `${route.path}-${route.params.geography}-${route.params.forestType}-${route.params.standAge}-${route.params.vegetationType}`;
});

// -- REFS FOR SELECTED PARAMS --
const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

// -- DATA REFS --
const data = ref([]);

// We want to see topCount / remainingCount in Edna
const topCount = ref(0);
const remainingCount = ref(0);

// EXAMPLE for coloring a progress bar
const sampleEnvCount = computed(() => {
  return data.value.length > 0 ? data.value[0].sample_env_count : 0;
});

const color = computed(() => {
  switch (true) {
    case sampleEnvCount.value < 10:
      return "red";
    case sampleEnvCount.value < 50:
      return "amber";
    default:
      return "primary";
  }
});

// -- WATCH ROUTE PARAMS & FETCH DATA --
watch(
  () => route.params,
  async (params) => {
    const { geography, forestType, standAge, vegetationType } = params;
    if (geography && forestType && standAge && vegetationType) {
      await fetchData(geography, forestType, standAge, vegetationType);
    }
  },
  { immediate: true }
);

watch(
  () => route.params,
  (params) => {
    geography.value = params.geography || "default";
    forestType.value = params.forestType || "default";
    standAge.value = params.standAge || "default";
    vegetationType.value = params.vegetationType || "default";
  },
  { immediate: true }
);

// -- FETCH LOGIC (in Edna) --
async function fetchData(geog, forest, age, vegType) {
  const filename = `data-${geog}-${forest}-${age}-${vegType}.json`;
  try {
    const response = await fetch(`/edna/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${filename}`);
    }
    const jsonData = await response.json();

    // Let's sort in descending order by sample_plot_count
    jsonData.sort((a, b) => b.sample_plot_count - a.sample_plot_count);

    // Update the data
    data.value = jsonData;

    // Now compute topCount and remainingCount
    const total = data.value.length;
    const topTenPercent = Math.floor(total * 0.1);
    topCount.value = topTenPercent;
    remainingCount.value = total - topTenPercent;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// No need for handleInfoUpdate or "updateInfo" from BarChart anymore
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
