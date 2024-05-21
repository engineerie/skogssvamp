<template>
  <!-- <div class="grid grid-cols-2 mb-8">
      <div class="flex items-center">
        <div
          class="rounded-lg text-violet-500 flex justify-center items-center mr-2"
        >
          <Icon name="game-icons:plant-roots" class="h-8 w-8" />
        </div>
        <div>
          <BaseHeading size="md">Mykorrhizasvampar</BaseHeading>
          <BaseParagraph size="sm" class="mb text-neutral-500"
            >Arter som kan förekomma i miljön sorterade på hur vanligt
            förekommande de är.</BaseParagraph
          >
        </div>
      </div>

      <div class="absolute top-6 right-6">
        <BaseButtonIcon
          shape="full"
          @click="$emit('enlarge')"
          size="md"
          class=""
        >
          <Icon name="material-symbols:open-in-full" class="size-5" />
        </BaseButtonIcon>
      </div>
    </div> -->
  <div class="grid grid-cols-12" v-if="activeTab === 'spatialForest'">
    <div class="col-span-7">
      <div class="flex mb-3">
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
          class="ml-4 -mb-8"
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
      </div>
      <div
        class="h-[505px] overflow-hidden backdrop-blur-3xl rounded-l-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
      >
        <!-- <DonutChart
          v-if="activeTab === 'columnChart'"
          :geography="geography"
          :forestType="forestType"
          :standAge="standAge"
          :vegetationType="vegetationType"
          @updateInfo="handleInfoUpdate"
          class="h-fit"
        /> -->
        <SpatialForest
          :geography="geography"
          :forestType="forestType"
          :standAge="standAge"
          :vegetationType="vegetationType"
        />
      </div>
    </div>
    <FullScreenEdna
      :isNormalView="true"
      @enlarge="emitEnlarge('FullScreenEdna')"
      class="col-span-5"
    />
  </div>
  <div v-if="activeTab === 'columnChart'">
    <div class="flex">
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
    </div>
    <div
      class="p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <BarChart
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
        @updateInfo="handleInfoUpdate"
        class="w-full h-full"
      />
      <!--<div v-if="data" class="col-span-6 ml-16 -mt-8">
         <div id="scrollbar" class="h-[340px] overscroll overflow-y-scroll pt-2">
          <div
            v-for="(row, index) in data"
            :key="row.taxon"
            class="flex justify-between items-center mb-2"
          >
            <div class="flex items-center gap-4">
              <div class="flex relative align-middle">
                <Icon
                  name="fluent:shape-organic-16-filled"
                  :class="'h-8 w-8'"
                  :style="{ color: allColors[index] }"
                />
              </div>
              <div>
                <BaseProse class="text-neutral-500">
                  {{
                    row.snamn ? capitalize(row.snamn) : "saknar svenskt namn"
                  }}
                </BaseProse>

                <BaseProse class="text-xs mr-2 text-neutral-500">{{
                  capitalize(row.taxon)
                }}</BaseProse>
              </div>
            </div>
            <div class="relative flex items-center h-full">
              <div
                v-if="row.snamn && !row.snamn.includes(' ')"
                class="absolute right-20 top-1/2 transform -translate-y-1/2"
              >
                <Icon
                  name="mingcute:mushroom-line"
                  class="h-6 w-6 text-neutral-500"
                />
              </div>
              <div
                v-if="row.matsvamp === 1"
                class="absolute right-8 top-1/2 transform -translate-y-1/2"
              >
                <Icon
                  name="fluent:food-16-filled"
                  class="h-6 w-6 text-yellow-500"
                />
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div v-else>
        <div class="max-w-sm space-y-2 mt-2">
          <BasePlaceload class="h-4 w-full rounded" />
          <BasePlaceload class="h-4 w-[85%] rounded" />
        </div>
      </div>
      -->

      <!-- Information section aligned to the bottom -->
      <div class="-mb-6">
        <hr class="border-stone-200 dark:border-stone-700 mb-4" />
        <div class="flex justify-between">
          <div class="flex">
            <!-- <div class="flex mt-3">
            <div
              class="flex h-fit"
              data-nui-tooltip-position="up"
              data-nui-tooltip="Mycelform (bild) / Förekomstkategori (färg)"
            >
              <BaseParagraph size="md" class="text-neutral-500">
                Mycel =</BaseParagraph
              >
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-5 w-5 ml-2 rotate-12 text-violet-500"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-5 w-5 -ml-2 rotate-45 text-green-500"
              />
              <Icon
                name="fluent:shape-organic-16-filled"
                class="h-5 w-5 -ml-2 rotate-0 mr-7 text-neutral-500"
              />
            </div>
            <div
              class="flex h-fit"
              data-nui-tooltip-position="up"
              data-nui-tooltip="Art bildar synlig fruktkropp (inkorrekt data)"
            >
              <BaseParagraph size="md" class="text-neutral-500">
                Storsvamp =</BaseParagraph
              >
              <Icon
                name="mingcute:mushroom-line"
                class="h-5 w-5 ml-2 mr-7 text-neutral-500"
              />
            </div>
            <div
              class="flex h-fit"
              data-nui-tooltip-position="up"
              data-nui-tooltip="Art är ätlig"
            >
              <BaseParagraph size="md" class="text-neutral-500">
                Matsvamp =</BaseParagraph
              >
              <Icon
                name="fluent:food-16-filled"
                class="h-5 w-5 text-yellow-500 ml-2"
              />
            </div>
          </div> -->
          </div>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  isNormalView: Boolean,
});

// Define emits
const emit = defineEmits(["enlarge"]);

const emitEnlarge = (componentName) => {
  emit("enlarge", componentName);
};

const route = useRoute();
const activeTab = ref("spatialForest");

const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

const top4Count = ref(0);
const next10Count = ref(0);
const remainingCount = ref(0);
const top4Percentage = ref(0);
const next10Percentage = ref(0);
const remainingPercentage = ref(0);

const handleInfoUpdate = (info) => {
  top4Count.value = info.top4Count;
  next10Count.value = info.next10Count;
  remainingCount.value = info.remainingCount;
  top4Percentage.value = info.top4Percentage;
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
    const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
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
