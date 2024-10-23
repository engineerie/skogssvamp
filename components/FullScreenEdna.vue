<template>
  <div>
    <NuxtImg
      height="270"
      src="/images/filtskinn.jpg"
      class="rounded-xl mb-2 hidden"
    />
    <!-- <transition name="fade" mode="out-in">
      <div
        v-if="selectedRows.length > 0"
        class="fixed w-80 h-72 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 border-neutral-300 z-30 shadow-lg shadow-neutral-300 dark:shadow-neutral-900 cursor-grab active:cursor-grabbing"
        :style="{ top: boxPosition.top + 'px', left: boxPosition.left + 'px' }"
        @mousedown="startDrag($event)"
        @mouseup="stopDrag"
        @mousemove="drag($event)"
      >
        <NuxtImg
          height="270"
          src="/images/filtskinn.jpg"
          class="rounded-t-xl mb-2 pointer-events-none"
        />

        <BaseButtonIcon
          shape="full"
          size="sm"
          @click="closeInfoBox"
          class="absolute top-2 right-2"
        >
          <Icon name="material-symbols:close" class="size-4" />
        </BaseButtonIcon>

        <div class="px-3 pt-1 pointer-events-none">
          <BaseHeading size="lg" class="pointer-events-none">{{
            capitalize(selectedRows[0].snamn)
          }}</BaseHeading>
          <BaseHeading weight="light" size="sm" class="pointer-events-none">{{
            selectedRows[0].taxon
          }}</BaseHeading>
        </div>
      </div>
    </transition> -->

    <transition name="slide">
      <div
        v-if="selectedRows.length > 0"
        class="fixed pointer-events-none top-0 right-0 h-full w-80 border-l dark:border-neutral-700 border-neutral-300 z-30 shadow-lg shadow-neutral-300 dark:shadow-neutral-800"
      >
        <!-- Transparent Top Section -->
        <div class="h-14 bg-transparent pointer-events-none"></div>

        <!-- Sidebar Content with Background -->
        <div
          class="relative bg-neutral-100 dark:bg-neutral-800 h-full pointer-events-auto"
        >
          <div class="p-5">
            <div class="flex justify-between items-end mb-2">
              <BaseHeading size="xl" weight="thin" class="-mb-1.5"
                >Artinformation</BaseHeading
              >
              <BaseButtonIcon
                shape="full"
                size="sm"
                @click="closeInfoBox"
                class=""
              >
                <Icon name="material-symbols:close" class="size-4" />
              </BaseButtonIcon>
            </div>
            <NuxtImg
              height="270"
              src="/images/filtskinn.jpg"
              class="rounded-xl mb-2"
            />
            <BaseHeading size="lg">{{
              capitalize(selectedRows[0].snamn)
            }}</BaseHeading>
            <BaseHeading weight="light" size="sm" class="mb-2">{{
              selectedRows[0].taxon
            }}</BaseHeading>
            <NuxtLink
              :to="stripDetailsFromURL(selectedRows[0].Artfakta)"
              target="blank"
              class="text-md font-thin mb-3"
            >
              Artfakta.se
            </NuxtLink>
            <div class="flex mt-3 items-center">
              <div
                :class="getStatusColor(selectedRows[0].RL2020kat)"
                class="h-7 w-7 rounded-full flex items-center justify-center text-white text-sm mr-2"
              >
                {{ getStatusAbbreviation(selectedRows[0].RL2020kat) }}
              </div>
              <BaseHeading weight="light" size="sm">{{
                getStatusTooltip(selectedRows[0].RL2020kat)
              }}</BaseHeading>
            </div>

            <div class="flex my-2">
              <NuxtImg
                v-if="selectedRows['Svamp-grupp-släkte'] !== 'Saknas'"
                :src="getIconPath(selectedRows[0]['Svamp-grupp-släkte'])"
                class="w-6 mr-2"
                alt="Svamp Icon"
              />
              <BaseHeading weight="light" size="sm">{{
                capitalize(selectedRows[0]["Svamp-grupp-släkte"])
              }}</BaseHeading>
            </div>
            <div v-if="selectedRows[0].matsvamp === 1" class="flex">
              <Icon
                name="icon-park-solid:knife-fork"
                class="h-7 w-7 text-yellow-500 mr-2"
              />
              <BaseHeading weight="light" size="sm"> Matsvamp </BaseHeading>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="">
      <div
        class="flex justify-between mb-2 items-end"
        :class="{ 'mt-3': isNormalView }"
      >
        <UPopover
          mode="hover"
          v-if="props.isNormalView == false"
          class="flex items-end cursor-default"
        >
          <div class="items-end flex cursor-default">
            <div
              class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
            >
              <Icon name="game-icons:plant-roots" class="h-10 w-10" />
            </div>
            <div>
              <BaseHeading
                size="3xl"
                weight="medium"
                class="text-neutral-800 dark:text-neutral-200 -mb-1.5"
                >Mykorrhizasvampar</BaseHeading
              >
              <BaseHeading weight="medium" size="xs" class="text-neutral-400"
                >Enligt markinventeringens provytor
              </BaseHeading>
            </div>
          </div>
          <template #panel>
            <div class="p-4 w-96 text-sm text-neutral-500">
              Visar mykorrhizasvampar i svensk skogsmark baserat på DNA-analys
              av svampmycel från jordprover.
            </div>
          </template>
        </UPopover>

        <div v-else></div>

        <div class="flex gap-2 items-end">
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
                  indicator
                />
              </div>
            </div>
          </div>
          <div v-if="!props.isNormalView" class="w-20">
            <BaseListbox
              v-model="rowsPerPage"
              :items="[5, 10, 20, 30, 40, 50]"
              placeholder="Rader per sida"
              shape="full"
              label="Rader"
              label-float
            />
          </div>

          <!-- display the  "sample_env_count" here  -->

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
            :data-nui-tooltip="'Få arter täcker majoriteten av marken'"
          >
            <div class="flex items-end">
              <!-- <div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div> -->
              <Icon
                name="fluent:shape-organic-16-filled"
                :class="'h-7 w-7 mt-1 mr-2 text-gray-500'"
              />

              <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                >{{ topCount }} Arter</BaseHeading
              >
            </div>
          </div>
          <!-- <div
            class="flex items-end px-3 -mr-2 pb-1 bg-white border-[0.5px] border-neutral-300 text-neutral-400"
          >
            <div class="flex items-end">
              <BaseHeading
                size="xl"
                weight="medium"
                class="-mb-1 mx-1.5 text-green-500"
                >{{ next10Percentage }}%
              </BaseHeading>
              <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                >{{ next10Count }} Arter</BaseHeading
              >
            </div>
          </div> -->

          <div
            class="flex items-end px-3 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400"
            :data-nui-tooltip="'Många arter täcker en mindre del av marken'"
          >
            <div class="flex items-end">
              <!-- <div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div> -->
              <Icon
                name="fluent:shape-organic-16-filled"
                :class="'h-7 w-7 mt-1 mr-2 text-violet-500'"
              />

              <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                >{{ remainingCount }} Arter</BaseHeading
              >
            </div>
          </div>
          <BaseInput
            v-if="!isNormalView"
            icon="i-heroicons-magnifying-glass-20-solid"
            v-model="searchQuery"
            shape="full"
            placeholder="Sök i tabell"
          />
          <BaseButtonIcon
            shape="full"
            @click="$emit(props.isNormalView ? 'enlarge' : 'close')"
          >
            <Icon
              v-if="props.isNormalView"
              name="material-symbols:open-in-full"
              class="size-5"
            />
            <Icon
              v-else
              name="material-symbols:close-fullscreen"
              class="size-5"
            />
          </BaseButtonIcon>
        </div>
      </div>
    </div>
    <div
      :class="{ 'rounded-xl': !isNormalView }"
      class="relative backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-20 mt-3.5"
    >
      <div v-if="filteredData" class="col-span-6">
        <div class="">
          <!-- v-model="selectedRows" -->

          <!-- UTable with Filtered Data -->
          <UTable
            id="scrollbar"
            :class="{ 'h-[420px]': isNormalView }"
            :sort-button="{
              color: 'text-neutral-700 dark:text-neutral-200',
              size: 'xl',
            }"
            :ui="{
              td: {
                base: 'max-w-80',
                size: 'text-md',
                color: 'text-neutral-500 dark:text-neutral-300',
              },
              thead:
                'sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-20',
              tbody: 'divide-y divide-neutral-200 dark:divide-neutral-700',
              tr: {
                selected: 'bg-neutral-100 dark:bg-neutral-800',
                active:
                  'hover:bg-neutral-100 dark:hover:bg-neutral-700 active:bg-neutral-200 dark:active:bg-neutral-800',
              },
            }"
            :columns="columns"
            :rows="paginatedData"
            @select="selectRow"
            v-model:sort="sort"
            sort-mode="manual"
            :key="route.fullPath"
          >
            <template
              v-if="isNormalView"
              #sample_plot_count-data="{ row, index }"
            >
              <div class="flex items-center justify-center">
                <div
                  data-nui-tooltip-position="right"
                  :data-nui-tooltip="`Förekommer i ${row['sample_plot_count']} av ${sampleEnvCount} skogar`"
                >
                  <Icon
                    name="fluent:shape-organic-16-filled"
                    :class="'h-8 w-8'"
                    :style="{ color: allColors[index] }"
                  />
                </div>
              </div>
            </template>
            <template #snamn-data="{ row }" v-if="isNormalView">
              <div class="truncate">
                {{ capitalize(row.snamn) }}
                <span class="italic">({{ capitalize(row.taxon) }})</span>
              </div>
            </template>
            <template #snamn-data="{ row }" v-if="!isNormalView">
              <div>{{ capitalize(row.snamn) }}</div>
            </template>
            <template #taxon-data="{ row }">
              <div class="italic font-thin max-w-52 truncate">
                {{ row.taxon }}
              </div>
            </template>
            <template #Svamp-grupp-släkte-data="{ row }">
              <div
                data-nui-tooltip-position="left"
                :data-nui-tooltip="
                  row['Svamp-grupp-släkte'] !== '0'
                    ? capitalize(row['Svamp-grupp-släkte'])
                    : 'Okänd'
                "
                class="ml-2"
              >
                <NuxtImg
                  v-if="row['Svamp-grupp-släkte'] !== 'Saknas'"
                  :src="getIconPath(row['Svamp-grupp-släkte'])"
                  class="w-6"
                  alt="Svamp Icon"
                />

                <Icon v-else name="heroicons:x-mark-20-solid" class="size-7" />
              </div>
            </template>
            <!-- Inside your UTable where you define templates for data rows -->
            <template #RL2020kat-data="{ row }">
              <div class="flex items-center space-x-2">
                <!-- Existing Status Circle -->

                <div
                  :class="getStatusColor(row.RL2020kat)"
                  class="h-5 w-5 rounded-full flex items-center justify-center text-white z-0 max-w-12"
                  data-nui-tooltip-position="left"
                  :data-nui-tooltip="
                    row['RL2020kat'] !== 'Saknas'
                      ? getStatusTooltip(row.RL2020kat)
                      : 'Ej bedömd'
                  "
                >
                  <!-- {{ getStatusAbbreviation(row.RL2020kat) }} -->
                </div>

                <!-- Conditional Blue 'S' Circle -->
                <div v-if="row.SIGNAL_art === 'S'" class="relative">
                  <div
                    class="h-5 w-5 rounded-full bg-neutral-500 opacity-100 flex items-center justify-center text-white z-10 text-sm"
                    :data-nui-tooltip="'Signalart'"
                  >
                    <!-- S -->
                  </div>
                </div>
              </div>
            </template>

            <!-- Custom rendering for matsvamp column -->
            <template #matsvamp-data="{ row }">
              <div v-if="row.matsvamp === 1" class="">
                <Icon
                  name="icon-park-solid:knife-fork"
                  class="h-7 w-7 text-yellow-500 -my-2"
                />
              </div>
              <div v-if="row.matsvamp === 0"></div>
            </template>
            <!-- ...other columns... -->
          </UTable>
          <div
            class="flex justify-between items-center p-5 border-t-[1px] border-neutral-200 dark:border-neutral-700"
          >
            <div>
              <!-- Display the current range and total items -->
              <BaseProse class="text-sm"
                >Visar {{ startItem }} till {{ endItem }} av
                {{ totalItems }} arter
              </BaseProse>
            </div>
            <div>
              <!-- Pagination component -->
              <UPagination
                :max="2"
                v-model="page"
                :page-count="rowsPerPage"
                :total="totalItems"
                :ui="{
                  wrapper: 'flex items-center gap-1',
                  rounded: '!rounded-full min-w-[32px] justify-center px-4',
                  default: {},
                }"
                size="lg"
              >
                <!-- Custom previous button -->
                <template #prev="{ onClick }">
                  <UButton
                    icon="i-heroicons-chevron-left-20-solid"
                    size="lg"
                    color="white"
                    :ui="{ rounded: 'rounded-full dark:border-neutral-700' }"
                    class="rtl:[&_span:first-child]:rotate-180 dark:bg-neutral-800 border-[0.5px]"
                    @click="onClick"
                  />
                </template>

                <!-- Custom next button -->
                <template #next="{ onClick }">
                  <UButton
                    icon="i-heroicons-chevron-right-20-solid"
                    size="lg"
                    color="white"
                    :ui="{ rounded: 'rounded-full dark:border-neutral-700' }"
                    class="rtl:[&_span:last-child]:rotate-180 dark:bg-neutral-800 border-[0.5px]"
                    @click="onClick"
                  />
                </template>
              </UPagination>
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

      <!-- Information section aligned to the bottom -->
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute } from "vue-router";

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

// Method to strip 'detaljer' from the URL if it exists
const stripDetailsFromURL = (url) => {
  if (!url) return "";
  return url.replace("/detaljer", "");
};

const selectedRows = ref([]);
function selectRow(row) {
  selectedRows.value = [row]; // Store the selected row in the array
}

function closeInfoBox() {
  selectedRows.value = []; // Clear the selection to hide the sidebar
}

// Capitalize function for displaying the species name
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const sampleEnvCount = computed(() => {
  return data.value.length > 0 ? data.value[0].sample_env_count : 0;
});

const getIconPath = (svampGrupp) => {
  const iconMapping = {
    övrigt: "default-icon.png",
    hattsvamp: "hattsvamp.png",
    kantarell: "kantarell.webp",
    sopp: "sopp.png",
    taggsvamp: "taggsvamp.png",
    fingersvamp: "fingersvamp.webp",
    tryffel: "tryffel.webp",
    skinnsvamp: "skinnsvamp.webp",
    skålsvamp: "skalsvamp.webp",
  };

  return `/images/svampgrupp/${iconMapping[svampGrupp] || "default-icon.webp"}`;
};

const props = defineProps({
  isNormalView: Boolean,
});

const route = useRoute();
const activeTab = ref("spatialForest");

const isInfoBoxVisible = ref(false);

const isDragging = ref(false);

const dragOffset = reactive({ x: 0, y: 0 });

function startDrag(event) {
  isDragging.value = true;
  const boxRect = event.target.getBoundingClientRect();
  dragOffset.x = event.clientX - boxRect.left;
  dragOffset.y = event.clientY - boxRect.top;
}

function stopDrag() {
  isDragging.value = false;
}

function drag(event) {
  if (isDragging.value) {
    boxPosition.left = event.clientX - dragOffset.x;
    boxPosition.top = event.clientY - dragOffset.y;
  }
}
onMounted(() => {
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
});

const getStatusAbbreviation = (status) => {
  const abbreviations = {
    LC: "LC",
    NT: "NT", // Near Threatened
    EN: "EN", // Endangered
    VU: "VU", // Vulnerable
    CR: "CR", // Critically Endangered
    RE: "RE", // Regionally Extinct
    DD: "DD", // Data Deficient
  };
  return abbreviations[status] || "NE"; // Default case
};

const getStatusColor = (status) => {
  const colors = {
    LC: "bg-green-500",
    NT: "bg-[#D7838E]",
    EN: "bg-[#CC526B]",
    VU: "bg-[#D7838E]",
    CR: "bg-[#C4004F]",
    RE: "bg-[#421A31]",
    DD: "bg-[#E8E9E7]",
  };
  return colors[status] || "bg-yellow-500";
};

const getStatusTooltip = (status) => {
  const tooltips = {
    LC: "Livskraftig",
    NT: "Nära hotad",
    EN: "Starkt hotad",
    VU: "Sårbar",
    CR: "Akut hotad",
    RE: "Nationellt utdöd",
    DD: "Kunskapsbrist",
  };
  return tooltips[status] || "Ej bedömd";
};

const sort = ref({ column: "", direction: "asc" });

const columns = [
  {
    key: "sample_plot_count",
    label: props.isNormalView ? "" : "Förekomst",
    sortable: props.isNormalView ? false : true,
    render: (row, index) => ({
      template: `<Icon name="fluent:shape-organic-16-filled" :style="{ color: allColors[${index}] }" class="h-8 w-8"/>`,
    }),
  },
  {
    key: "snamn",
    label: "Namn",
    sortable: props.isNormalView ? false : true,
  },
  ...(props.isNormalView
    ? []
    : [
        {
          key: "taxon",
          label: "Latinskt namn",
          sortable: true,
        },
      ]),
  {
    key: "Svamp-grupp-släkte",
    label: "Grupp",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "matsvamp",
    label: "Matsvamp",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "RL2020kat",
    label: "Status",
    sortable: props.isNormalView ? false : true,
    render: (row) => {
      const statusAbbr = getStatusAbbreviation(row.RL2020kat);
      const statusColor = getStatusColor(row.RL2020kat);
      const tooltip = getStatusTooltip(row.RL2020kat);
      return `<div class="flex items-center justify-center w-6 h-6 rounded-full ${statusColor} text-white" data-nui-tooltip-position="top" data-nui-tooltip="${tooltip}">${statusAbbr}</div>`;
    },
  },
];

const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

const topCount = ref(0);
const remainingCount = ref(0);
const topPercentage = ref(0);
const remainingPercentage = ref(0);

const handleInfoUpdate = (info) => {
  topCount.value = info.topCount;
  remainingCount.value = info.remainingCount;
  topPercentage.value = info.topPercentage;
  remainingPercentage.value = info.remainingPercentage;
};

const data = ref([]);
const allColors = ref([]);

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

    const totalSum = data.value.reduce(
      (acc, row) => acc + row.sample_plot_count,
      0
    );

    let cumulativeSum = 0;
    const totalDataPoints = data.value.length;
    let index = 0;

    // Calculate topCount
    while (cumulativeSum / totalSum < 0.5 && index < totalDataPoints) {
      cumulativeSum += data.value[index].sample_plot_count;
      index++;
    }

    // Update topCount and remainingCount
    topCount.value = index;
    remainingCount.value = totalDataPoints - index;

    const grayColors = generateColors(
      [82, 82, 82],
      [212, 212, 212],
      topCount.value
    );
    const purpleColors = generateColors(
      [46, 16, 101],
      [232, 121, 249],
      remainingCount.value
    );

    allColors.value = [...grayColors, ...purpleColors];
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

const searchQuery = ref("");
const page = ref(1);
const rowsPerPageOptions = [5, 10, 20, 30, 40, 50]; // Options for rows per page
const rowsPerPage = ref(props.isNormalView ? 500 : 10);

const filteredData = computed(() => {
  let result = data.value;

  // Apply any filters you have
  if (searchQuery.value) {
    result = result.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }

  return result;
});

const sortedData = computed(() => {
  let result = filteredData.value.slice(); // Create a shallow copy to sort

  if (sort.value && sort.value.column) {
    const column = sort.value.column;
    const direction = sort.value.direction;

    result.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle null or undefined values
      if (valueA == null && valueB != null) return 1;
      if (valueA != null && valueB == null) return -1;
      if (valueA == null && valueB == null) return 0;

      // Compare values using Swedish locale
      const comparison = String(valueA).localeCompare(String(valueB), "sv", {
        numeric: true,
        sensitivity: "base",
      });

      return direction === "asc" ? comparison : -comparison;
    });
  }

  return result;
});

const paginatedData = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = page.value * rowsPerPage.value;
  return sortedData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / rowsPerPage.value);
});

// Computed property for total number of items
const totalItems = computed(() => filteredData.value.length);

// Computed property for the starting item number
const startItem = computed(() => (page.value - 1) * rowsPerPage.value + 1);

// Computed property for the ending item number
const endItem = computed(() =>
  Math.min(page.value * rowsPerPage.value, totalItems.value)
);
</script>

<style scoped>
/* For Webkit browsers like Chrome, Safari */

/* Hide scrollbar for IE, Edge and Firefox */
#scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#scrollbar::-webkit-scrollbar-thumb {
  display: none;
  background-color: #6f202033; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: medium;
  scrollbar-color: #88888800 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out; /* transition effect for Firefox */
}

#scrollbar:hover {
  scrollbar-color: #ff0000 #f2f3f5;
}
</style>
