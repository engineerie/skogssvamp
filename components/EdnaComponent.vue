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
            <BaseHeading size="2xl" weight="medium" class="-mb-1 mx-1.5"
              >{{ data ? data.length : 0 }}
            </BaseHeading>
            <BaseHeading weight="medium" size="xs">Arter</BaseHeading>
          </div>

          <div
            class="flex items-end px-3 -mr-2 pb-1 bg-white border-[0.5px] border-neutral-300 text-neutral-400"
            :data-nui-tooltip="'Mycel från få arter dominerar i marken'"
          >
            <div class="flex items-end">
              <!-- <div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div> -->

              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-gray-500 z-40"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-gray-400 z-30"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 mr-2 text-gray-300 z-20"
              />

              <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                >{{ topCount }} Arter</BaseHeading
              >
            </div>
          </div>

          <div
            class="flex items-end px-3 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400"
            :data-nui-tooltip="'De flesta arterna och deras mycel är ovanliga i marken'"
          >
            <div class="flex items-end">
              <!-- <div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div> -->
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-yellow-400 z-30"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-lime-400 z-20"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 -mr-5 text-teal-400 z-10"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-7 w-7 mt-1 mr-2 text-rose-400 z-0"
              />

              <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                >{{ remainingCount }} Arter</BaseHeading
              >
            </div>
          </div>

          <!-- <div
          class="flex items-end pl-2 pr-4 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400"
        >
          <BaseHeading size="2xl" weight="medium" class="-mb-1 mx-1.5"
            >{{ sampleEnvCount }}
          </BaseHeading>
          <BaseHeading weight="medium" size="xs">Provytor</BaseHeading>
        </div> -->

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
                <div class="">
                  <BaseHeading
                    size="3xl"
                    weight="medium"
                    class="text-neutral-800 dark:text-neutral-200 -mb-1.5"
                    >Alla&nbsp;mykorrhizasvampar</BaseHeading
                  >
                  <BaseHeading
                    weight="medium"
                    size="xs"
                    class="text-neutral-400"
                    >Enligt DNA från Markinventeringens provytor
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
            >
            </BaseTabs>
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div
            v-if="activeTab === 'spatialForest'"
            class="h-[505px] -mt-1 overflow-hidden backdrop-blur-3xl rounded-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-200"
          >
            <SpatialForest
              :geography="geography"
              :forestType="forestType"
              :standAge="standAge"
              :vegetationType="vegetationType"
              :data="data"
              :topCount="topCount"
              :remainingCount="remainingCount"
            />
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
      <!-- <div class="flex">
      <div
        class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
      >
        <Icon name="game-icons:plant-roots" class="h-10 w-10" />
      </div>
      <BaseHeading
        size="3xl"
        weight="medium"
        class="text-neutral-800 dark:text-neutral-300"
        >Mykorrhizasvampar</BaseHeading
      >
      <BaseTabs
        class="ml-4"
        v-model="activeTab"
        :tabs="[
          { icon: 'material-symbols:bar-chart', value: 'columnChart' },
          {
            icon: 'material-symbols:format-list-bulleted-rounded',
            value: 'spatialForest',
          },
        ]"
      >
      </BaseTabs>
    </div> -->
      <transition name="fade" mode="out-in">
        <div
          v-if="activeTab === 'columnChart'"
          class="p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
        >
          <BarChart
            :geography="geography"
            :forestType="forestType"
            :standAge="standAge"
            :vegetationType="vegetationType"
            @updateInfo="handleInfoUpdate"
            class="w-full h-full"
            :chartWidth="chartWidth"
            :key="`-${routeKey}`"
          />

          <!-- Information section aligned to the bottom -->
          <!-- <div class="-mb-6">
          <hr class="border-stone-200 dark:border-stone-700 mb-4" />
          <div class="flex justify-between">
            <div class="flex"></div>
            <div class="flex">
              <div
                class="border-r-[1px] dark:border-neutral-800 border-stone-300 mb-6 mr-4 pr-4 mt-3 pl-8 flex"
              >
                <BaseParagraph size="md" class="text-neutral-500">
                  {{ data ? data.length : 0 }} arter
                </BaseParagraph>
              </div>
              <div v-if="activeTab === 'columnChart'" class="flex gap-8">
                <div>
                  <BaseParagraph size="md" class="text-neutral-500"
                    >{{ top4Count }} arter</BaseParagraph
                  >
                  <div class="flex items-center">
                    <div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div>
                    <BaseParagraph size="md" class="text-neutral-500"
                      >{{ top4Percentage }}%</BaseParagraph
                    >
                  </div>
                </div>
                <div>
                  <BaseParagraph size="md" class="text-neutral-500"
                    >{{ next10Count }} arter</BaseParagraph
                  >
                  <div class="flex items-center">
                    <div class="bg-green-500 rounded-full w-2 h-2 mr-1"></div>
                    <BaseParagraph size="md" class="text-neutral-500"
                      >{{ next10Percentage }}%</BaseParagraph
                    >
                  </div>
                </div>
                <div>
                  <BaseParagraph size="md" class="text-neutral-500"
                    >{{ remainingCount }} arter</BaseParagraph
                  >
                  <div class="flex items-center">
                    <div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div>
                    <BaseParagraph size="md" class="text-neutral-500"
                      >{{ remainingPercentage }}%</BaseParagraph
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const sampleEnvCount = computed(() => {
  // Check if data is not empty and return the sample_env_count of the first item
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

const props = defineProps({
  isNormalView: Boolean,
});

const route = useRoute();

const routeKey = computed(
  () =>
    `${route.path}-${route.params.geography}-${route.params.forestType}-${route.params.standAge}-${route.params.vegetationType}`
);

const chartWidth = ref("100%");

const handleZoomIn = () => {
  let currentWidth = parseInt(chartWidth.value);
  if (currentWidth < 600) {
    // Check and adjust these limits as needed
    chartWidth.value = `${currentWidth + 250}%`; // Adjust zoom increment here
  }
};

const handleZoomOut = () => {
  let currentWidth = parseInt(chartWidth.value);
  if (currentWidth > 100) {
    // Check and adjust these limits as needed
    chartWidth.value = `${currentWidth - 250}%`; // Adjust zoom decrement here
  }
};

// Define emits
const emit = defineEmits(["zoomIn", "zoomOut", "enlarge"]);

const emitEnlarge = (componentName) => {
  emit("enlarge", componentName);
};

const activeTab = ref("spatialForest");

const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

const topCount = ref(0);
const next10Count = ref(0);
const remainingCount = ref(0);
const topPercentage = ref(0);
const next10Percentage = ref(0);
const remainingPercentage = ref(0);

const handleInfoUpdate = (info) => {
  topCount.value = info.topCount;
  next10Count.value = info.next10Count;
  remainingCount.value = info.remainingCount;
  topPercentage.value = info.topPercentage;
  next10Percentage.value = info.next10Percentage;
  remainingPercentage.value = info.remainingPercentage;
};

const data = ref([]);
const allColors = ref([]);

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const generateColors = (start, end, steps) => {
  const stepR = (end[0] - start[0]) / (steps - 1);
  const stepG = (end[1] - start[1]) / (steps - 1);
  const stepB = (end[2] - start[2]) / (steps - 1);
  const colors = [];

  for (let i = 0; i < steps; i++) {
    const r = Math.round(start[0] + stepR * i);
    const g = Math.round(start[1] + stepG * i);
    const b = Math.round(start[2] + stepB * i);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
};

const fetchData = async (geography, forestType, standAge, vegetationType) => {
  const filename = `data-${geography}-${forestType}-${standAge}-${vegetationType}.json`;
  try {
    const response = await fetch(`/edna/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    data.value = await response.json();

    // Generate colors after data is fetched
    const topColors = generateColors([82, 82, 82], [212, 212, 212], 4);
    const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
    const otherColors = generateColors(
      [46, 16, 101],
      [232, 121, 249],
      Math.max(data.value.length - 14, 0)
    );
    allColors.value = [...top4Colors, ...next10Colors, ...otherColors];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Watch for changes in route params and fetch data accordingly
watch(
  () => route.params,
  (params) => {
    const { geography, forestType, standAge, vegetationType } = params;
    if (geography && forestType && standAge && vegetationType) {
      fetchData(geography, forestType, standAge, vegetationType);
    }
  },
  { immediate: true }
);

watch(
  () => route.params,
  (params) => {
    geography.value = params.geography || "default-value";
    forestType.value = params.forestType || "default-value";
    standAge.value = params.standAge || "default-value";
    vegetationType.value = params.vegetationType || "default-value";
  },
  { immediate: true }
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to /* Initial and final state during transition */ {
  opacity: 0;
}
</style>
