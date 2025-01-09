<template>
  <div>
    <!-- list view -->
    <div class="grid grid-cols-12 gap-4 relative">
      <transition name="fade" mode="out-in">
        <div
          v-if="activeTab === 'columnChart'"
          class="flex gap-2 absolute right-0 top-3"
        >
          <div class="flex items-end h-10">
            <div class="w-28">
              <BaseHeading weight="medium" size="xs" class="text-neutral-400"
                >Dataunderlag</BaseHeading
              >
              <div class="flex items-end">
                <UProgress
                  :color="color"
                  :indicator="false"
                  :value="sampleEnvCount"
                  :max="100"
                  size="2xl"
                  :data-nui-tooltip="`Baserat på ${sampleEnvCount} skogar`"
                />
              </div>
            </div>
          </div>

          <div
            class="flex items-end px-3 -mr-2 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-l-full text-neutral-400"
          >
            <BaseHeading size="2xl" weight="medium" class="-mb-1 mx-1.5">
              {{ data ? data.length : 0 }}
            </BaseHeading>
            <BaseHeading weight="medium" size="xs">Arter</BaseHeading>
          </div>

          <div
            class="flex items-end px-3 -mr-2 pb-1 bg-white border-[0.5px] border-neutral-300 text-neutral-400"
            :data-nui-tooltip="'Mycel från få arter dominerar i marken'"
          >
            <div class="flex items-end">
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-gray-500 z-[2]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-gray-400 z-[1]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 mr-2 text-gray-300 z-0"
              />
              <BaseHeading size="xs" weight="medium" class="text-neutral-400">
                {{ topCount }} Arter
              </BaseHeading>
            </div>
          </div>

          <div
            class="flex items-end px-3 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400"
            :data-nui-tooltip="'De flesta arterna och deras mycel är ovanliga i marken'"
          >
            <div class="flex items-end">
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-yellow-400 z-[3]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-lime-400 z-[2]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-teal-400 z-[1]"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 mr-2 text-rose-400 z-0"
              />

              <BaseHeading size="xs" weight="medium" class="text-neutral-400">
                {{ remainingCount }} Arter
              </BaseHeading>
            </div>
          </div>

          <BaseButtonIcon @click="handleZoomIn" shape="full">
            <Icon name="heroicons:magnifying-glass-plus" class="h-5 w-5" />
          </BaseButtonIcon>
          <BaseButtonIcon @click="handleZoomOut" shape="full">
            <Icon
              name="heroicons:magnifying-glass-minus-solid"
              class="h-5 w-5"
            />
          </BaseButtonIcon>
        </div>
      </transition>

      <div class="col-span-5">
        <div class="flex justify between">
          <div class="flex mb-3 items-end">
            <UPopover mode="hover" class="flex items-end cursor-default">
              <div class="items-end flex cursor-default">
                <div
                  class="dark:opacity-90 w-12 h-12 ml-2 mr-2 rounded-lg text-violet-500 flex justify-center"
                >
                  <Icon name="solar:dna-linear" class="h-11 w-11" />
                </div>
                <div>
                  <BaseHeading
                    size="3xl"
                    weight="medium"
                    class="text-neutral-800 dark:text-neutral-200 -mb-1.5"
                  >
                    Alla&nbsp;mykorrhizasvampar
                  </BaseHeading>
                  <BaseHeading
                    weight="medium"
                    size="xs"
                    class="text-neutral-400"
                  >
                    Enligt DNA från Markinventeringens provytor
                  </BaseHeading>
                </div>
              </div>
              <template #panel>
                <div class="p-4 w-96 text-sm text-neutral-500">
                  Visar mykorrhizasvampar i svensk skogsmark baserat på
                  DNA-analys av svampmycel från jordprover.
                </div>
              </template>
            </UPopover>

            <BaseTabs
              class="ml-4 -mb-4"
              v-model="activeTab"
              :tabs="[
                {
                  label: 'Lista',
                  icon: 'material-symbols:format-list-bulleted-rounded',
                  value: 'spatialForest',
                },
                {
                  label: 'Diagram',
                  icon: 'material-symbols:bar-chart',
                  value: 'columnChart',
                },
              ]"
            />
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'spatialForest'" class="h-[505px] -mt-1">
            <div class="relative">
              <SpatialForest
                :geography="geography"
                :forestType="forestType"
                :standAge="standAge"
                :vegetationType="vegetationType"
                :data="data"
                :topCount="topCount"
                :remainingCount="remainingCount"
              />
              <div
                class="flex absolute bottom-0 justify-between w-full p-2 items-end"
              >
                <BaseHeading weight="medium" size="xs" class="text-neutral-400"
                  >Figuren visar hur mycelutbredningar kan se ut.<br />
                  Ofta täcker ca 10% av arterna ca 80% av marken.</BaseHeading
                >
                <div class="flex h-fit shrink-0">
                  <!-- Left mini-legend -->
                  <div
                    class="rounded-l-full flex items-end px-3 -mr-2 py-1 bg-white border-[0.5px] border-r-0 border-neutral-300 text-neutral-400"
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
                      <BaseHeading
                        size="xs"
                        weight="medium"
                        class="text-neutral-400"
                      >
                        {{ topCount }} Arter
                      </BaseHeading>
                    </div>
                  </div>

                  <!-- Right mini-legend -->
                  <div
                    class="flex items-end px-3 py-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400 border-l-0"
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
                      <BaseHeading
                        size="xs"
                        weight="medium"
                        class="text-neutral-400"
                      >
                        {{ remainingCount }} Arter
                      </BaseHeading>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="flex gap-2 w-full p-2">
                <UBadge
                  icon="i-material-symbols-location-on-outline"
                  size="sm"
                  color="white"
                  variant="solid"
                  :ui="{ rounded: 'rounded-full' }"
                  class="flex gap-1"
                >
                  <Icon
                    name="material-symbols:location-on-outline"
                    class="text-fuchsia-500"
                  />
                  {{ geographyLabel }}
                </UBadge>
                <UBadge
                  icon="i-material-symbols-location-on-outline"
                  size="sm"
                  color="white"
                  variant="solid"
                  :ui="{ rounded: 'rounded-full' }"
                  class="flex gap-1"
                >
                  <Icon name="lucide:trees" class="text-green-500" />
                  {{ forestTypeLabel }}
                </UBadge>
                <UBadge
                  icon="i-material-symbols-location-on-outline"
                  size="sm"
                  color="white"
                  variant="solid"
                  :ui="{ rounded: 'rounded-full' }"
                  class="flex gap-1"
                >
                  <Icon name="carbon:crop-growth" class="text-violet-500" />
                  {{ standAgeLabel }}
                </UBadge>
                <UBadge
                  icon="i-material-symbols-location-on-outline"
                  size="sm"
                  color="white"
                  variant="solid"
                  :ui="{ rounded: 'rounded-full' }"
                  class="flex gap-1"
                >
                  <Icon
                    name="fluent-emoji-high-contrast:herb"
                    class="text-teal-500"
                  />
                  {{ vegetationTypeLabel }}
                </UBadge>
              </div>
              <div
                class="rounded-xl p-3 bg-white border-[1px] overflow-hidden border-neutral-200 h-full"
              >
                <p class="text-neutral-500 text-sm">
                  Här är underlaget från markinventeringen [gott] och visar
                  [många] arter, så som [art1, art2]. I den här miljön finns det
                  [få] Naturvårdsarter t.ex. [art3], [Många] matsvampar kan
                  också finnas här, t.ex [art4].
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <transition name="fade">
        <FullScreenEdna
          v-if="activeTab === 'spatialForest'"
          :isNormalView="true"
          @enlarge="emitEnlarge('FullScreenEdna')"
          class="col-span-7"
        />
      </transition>
    </div>

    <!-- column chart view -->
    <div>
      <transition name="fade" mode="out-in">
        <div
          v-if="activeTab === 'columnChart'"
          class="p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
        >
          <BarChart
            :chartData="data"
            :geography="geography"
            :forestType="forestType"
            :standAge="standAge"
            :vegetationType="vegetationType"
            class="w-full h-full"
            :chartWidth="chartWidth"
            :key="`-${routeKey}`"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

// -- PROPS --
const props = defineProps({
  isNormalView: Boolean,
});

// -- EMITS --
const emit = defineEmits(["zoomIn", "zoomOut", "enlarge"]);
const emitEnlarge = (componentName) => {
  emit("enlarge", componentName);
};

// -- ROUTE --
const route = useRoute();

// -- TABS, CHART WIDTH, ZOOM --
const activeTab = ref("spatialForest");
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
