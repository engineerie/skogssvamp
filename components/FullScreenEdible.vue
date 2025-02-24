<template>
  <div>
    <transition name="fade" mode="out-in">
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
            capitalize(selectedRows[0].Commonname)
          }}</BaseHeading>
          <BaseHeading weight="light" size="sm" class="pointer-events-none">{{
            selectedRows[0].Scientificname
          }}</BaseHeading>
        </div>
      </div>
    </transition>

    <div class="flex justify-between mb-2 items-end">
      <UPopover mode="hover" class="flex items-end cursor-default" :ui="{}">
        <div class="items-end flex cursor-default">
          <div
            class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
          >
            <Icon name="icon-park-solid:knife-fork" class="h-10 w-10" />
          </div>

          <div>
            <BaseHeading
              size="3xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-300 mr-4 -mb-1.5"
            >
              Matsvampar
            </BaseHeading>
            <BaseHeading weight="medium" size="xs" class="text-neutral-400">
              Bedömning baserad på samlad kunskap
            </BaseHeading>
          </div>
        </div>
        <!-- Added grid/table toggle tabs (same as in FullScreenPoison.vue) -->
        <BaseTabs
          v-model="activeView"
          :tabs="[
            {
              label: 'Galleri',
              icon: 'i-heroicons-squares-2x2',
              value: 'grid',
            },
            {
              label: 'Lista',
              icon: 'material-symbols:format-list-bulleted-rounded',
              value: 'table',
            },
          ]"
          class="ml-4 -mb-4 inline-flex align-bottom"
        />
        <template #panel>
          <div class="p-4 w-96 text-sm text-neutral-500">
            Visar matsvampar som kan förekomma i miljön, baserat på
            observationer av fruktkroppar.
          </div>
        </template>
      </UPopover>

      <div class="flex gap-2 items-end">
        <!-- <BaseListbox ... /> -->
        <div v-if="!props.isNormalView" class="w-20">
          <BaseListbox
            v-model="rowsPerPage"
            :items="[10, 20, 30, 40, 50, 'Alla']"
            placeholder="Rader per sida"
            shape="full"
            label="Rader"
            label-float
          />
        </div>
        <BaseInput
          v-if="!isNormalView"
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="searchQuery"
          shape="full"
          placeholder="Sök i tabell"
          class="w-1/2"
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

    <!-- Main content: switch between table view and grid view -->
    <div
      class="relative pt-3 backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <!-- TABLE VIEW -->
      <div v-if="isTableView">
        <div v-if="filteredData" class="col-span-6 -mt-12">
          <div class="h-fit">
            <!-- UTable with Filtered Data -->
            <UTable
              :loading="isLoading"
              :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: 'Laddar',
              }"
              class="min-h-[415px] mt-8"
              :sort-button="{
                color: 'text-neutral-700 dark:text-neutral-300',
                size: 'xl',
              }"
              id="scrollbar"
              :ui="computedUITable"
              :columns="selectedColumns"
              :rows="paginatedData"
              @select="selectRow"
              v-model:sort="sort"
              sort-mode="manual"
              :key="route.fullPath"
            >
              <template #empty-state>
                <div
                  class="flex flex-col items-center justify-center py-6 gap-3"
                >
                  <span class="italic text-sm">
                    Inga vanligt förekommande matsvampar i denna miljön
                  </span>
                </div>
              </template>
              <template #Commonname-data="{ row }">
                <div class="truncate max-w-96">
                  {{ capitalize(row.Commonname) }}
                  <span
                    class="italic text-neutral-400"
                    v-if="props.isNormalView"
                  >
                    ({{ capitalize(row.Scientificname) }})
                  </span>
                </div>
              </template>
              <template #Scientificname-data="{ row }">
                <div class="italic font-thin overflow-hidden text-ellipsis">
                  {{ row.Scientificname }}
                </div>
              </template>
              <template #FoodType-data="{ row }">
                <div class="flex justify-center max-w-8">
                  <Icon
                    v-if="row.Giftsvamp"
                    name="hugeicons:danger"
                    class="text-lime-500 w-6 h-6"
                  />
                  <Icon
                    v-else-if="row['Nyasvamp-boken']"
                    name="icon-park-solid:knife-fork"
                    class="text-yellow-500 w-6 h-6"
                  />
                  <Icon
                    v-else
                    name="material-symbols:help-outline-rounded"
                    class="text-neutral-400 w-6 h-6"
                  />
                </div>
              </template>
              <template #Svamp-grupp-data="{ row }">
                <div
                  data-nui-tooltip-position="left"
                  :data-nui-tooltip="capitalize(row['Svamp-grupp'])"
                  class="ml-2"
                >
                  <NuxtImg
                    :src="getIconPath(row['Svamp-grupp'])"
                    class="w-5"
                    alt="Svamp Icon"
                  />
                </div>
              </template>
              <template #RL2020kat-data="{ row }">
                <div class="flex items-center space-x-2">
                  <div
                    :class="getStatusColor(row.RL2020kat)"
                    class="h-5 w-5 rounded-full flex items-center justify-center text-white z-0 max-w-12"
                    data-nui-tooltip-position="left"
                    :data-nui-tooltip="
                      row['RL2020kat'] !== 'Saknas'
                        ? getStatusTooltip(row.RL2020kat)
                        : 'Ej bedömd'
                    "
                  ></div>
                </div>
              </template>
              <template #Rank-data="{ row }">
                <div class="px-2 w-32">
                  <UProgress
                    max="3"
                    :value="getInvertedRankValue(row.Rank)"
                    :color="getColorForRank(row.Rank)"
                    size="md"
                    data-nui-tooltip-position="right"
                    :data-nui-tooltip="getRankTooltip(row.Rank)"
                  />
                </div>
              </template>
            </UTable>
            <div
              class="flex justify-between items-center p-5 border-t-[1px] border-neutral-200 dark:border-neutral-800"
            >
              <div>
                <BaseProse class="text-sm">
                  Visar {{ startItem }} till {{ endItem }} av
                  {{ totalItems }} arter
                </BaseProse>
              </div>
              <div>
                <div v-if="rowsPerPage !== 'Alla'">
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
                    <template #prev="{ onClick }">
                      <UButton
                        icon="i-heroicons-chevron-left-20-solid"
                        size="lg"
                        color="white"
                        :ui="{
                          rounded: 'rounded-full dark:border-neutral-800',
                        }"
                        class="rtl:[&_span:first-child]:rotate-180 dark:bg-neutral-900 border-[0.5px]"
                        @click="onClick"
                      />
                    </template>
                    <template #next="{ onClick }">
                      <UButton
                        icon="i-heroicons-chevron-right-20-solid"
                        size="lg"
                        color="white"
                        :ui="{
                          rounded: 'rounded-full dark:border-neutral-800',
                        }"
                        class="rtl:[&_span:last-child]:rotate-180 dark:bg-neutral-900 border-[0.5px]"
                        @click="onClick"
                      />
                    </template>
                  </UPagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GRID VIEW -->
      <div v-else>
        <div
          :class="[
            'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 pt-1 min-h-[399px] overflow-scroll',
            props.isNormalView ? 'md:grid-cols-3' : 'md:grid-cols-6',
          ]"
        >
          <div
            v-for="(row, index) in gridPaginatedData"
            :key="row.Commonname + row.Scientificname + index"
            class="bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer h-[184px]"
            @click="selectRow(row)"
          >
            <!-- Image Thumbnail -->
            <div class="w-full h-32 relative rounded-t-lg overflow-hidden">
              <NuxtImg
                v-if="row.images && row.images.length"
                :src="row.images[0]"
                class="w-full h-full object-cover"
                alt="Species Image"
                height="300"
                width="450"
                format="webp"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
              >
                <Icon
                  name="material-symbols:photo"
                  class="w-8 h-8 text-neutral-500"
                />
              </div>
              <div class="absolute bottom-2 left-2 flex gap-1">
                <div class="p-1 rounded-full bg-neutral-50 bg-opacity-90">
                  <Icon
                    name="icon-park-solid:knife-fork"
                    class="size-6 p-0.5 text-yellow-500"
                  />
                </div>
              </div>
            </div>
            <!-- Species Names -->
            <div class="p-2 pt-1">
              <div
                class="text-md font-medium text-neutral-500 dark:text-neutral-300 truncate"
              >
                {{ capitalize(row.Commonname) }}
              </div>
              <div
                class="text-sm font-medium text-neutral-400 dark:text-neutral-300 truncate"
              >
                {{ capitalize(row.Scientificname) }}
              </div>
            </div>
          </div>
        </div>

        <!-- GRID VIEW PAGINATION -->
        <div
          class="flex justify-between items-center p-5 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div>
            <BaseProse class="text-sm">
              Visar {{ gridStartItem }} till {{ gridEndItem }} av
              {{ totalItems }} arter
            </BaseProse>
          </div>
          <div>
            <UPagination
              v-model="gridPage"
              :page-count="gridPageSize"
              :total="totalItems"
              :ui="{
                wrapper: 'flex items-center gap-1',
                rounded: '!rounded-full min-w-[32px] justify-center px-4',
                default: {},
              }"
              size="lg"
            >
              <template #prev="{ onClick }">
                <UButton
                  icon="i-heroicons-chevron-left-20-solid"
                  size="lg"
                  color="white"
                  :ui="{ rounded: 'rounded-full dark:border-neutral-800' }"
                  class="rtl:[&_span:first-child]:rotate-180 dark:bg-neutral-900 border-[0.5px]"
                  @click="onClick"
                />
              </template>
              <template #next="{ onClick }">
                <UButton
                  icon="i-heroicons-chevron-right-20-solid"
                  size="lg"
                  color="white"
                  :ui="{ rounded: 'rounded-full dark:border-neutral-800' }"
                  class="rtl:[&_span:last-child]:rotate-180 dark:bg-neutral-900 border-[0.5px]"
                  @click="onClick"
                />
              </template>
            </UPagination>
          </div>
        </div>
      </div>
      <!-- End grid view -->
    </div>
  </div>
</template>

<script setup>
console.log("FullScreenEdible setup started");

import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useSpeciesStore } from "~/stores/speciesStore";

const foodOptions = [
  {
    id: "edibleOnly",
    name: "Matsvampar",
    value: "edible",
    icon: "icon-park-solid:knife-fork",
  },
  {
    id: "poisonOnly",
    name: "Giftsvampar",
    value: "poison",
    icon: "hugeicons:danger",
  },
  {
    id: "all",
    name: "Mat- & giftsvampar",
    value: "all",
    icon: "hugeicons:mushroom",
  },
];

const selectedFoodOption = ref(foodOptions[2]); // "Alla svampar"

function getInvertedRankValue(rank) {
  if (!rank) return 0;
  return 4 - rank;
}

function getRankTooltip(rank) {
  switch (rank) {
    case 1:
      return "Många fynd";
    case 2:
      return "Färre fynd";
    case 3:
      return "Få fynd";
    default:
      return "";
  }
}

function getColorForRank(rank) {
  switch (rank) {
    case 1:
      return "yellow";
    case 2:
      return "amber";
    case 3:
      return "orange";
    default:
      return "neutral";
  }
}

const speciesStore = useSpeciesStore();

function selectRow(row) {
  speciesStore.selectSpecies(row, "edible");
}

const getIconPath = (svampGrupp) => {
  const iconMapping = {
    övrigt: "BasilOther1Solid.png",
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

const getStatusAbbreviation = (status) => {
  const abbreviations = {
    LC: "LC",
    NT: "NT",
    EN: "EN",
    VU: "VU",
    CR: "CR",
    RE: "RE",
    DD: "DD",
  };
  return abbreviations[status] || "NE";
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
  return colors[status] || "bg-neutral-300";
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

const props = defineProps({
  isNormalView: Boolean,
});
console.log("isNormalView in FullScreenEdible:", props.isNormalView);

// --- New: Toggle between grid and table views ---
const activeView = ref("grid");
const isTableView = computed(() => activeView.value === "table");

// --- Existing computed UI config ---
const computedUITable = computed(() => ({
  thead:
    "sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-50",
  td: {
    base: "",
    padding: "py-6 pl-6",
    size: "text-md",
    color: "text-neutral-500 dark:text-neutral-400",
  },
  th: { padding: "pt-4 pl-6" },
  tr: {
    padding: "pl-12",
    base: "overflow-hidden",
    selected: "bg-neutral-100 dark:bg-neutral-900",
    active:
      "hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-900",
  },
}));

const route = useRoute();
const isInfoBoxVisible = ref(false);
const selectedRows = ref([]);
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

function closeInfoBox() {
  selectedRows.value = [];
}

const showPoisonous = ref(false);
function togglePoisonous() {
  showPoisonous.value = !showPoisonous.value;
}

const columns = [
  {
    key: "Commonname",
    label: "Namn",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "Scientificname",
    label: "Latinskt namn",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "Svamp-grupp",
    label: "Grupp",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "FoodType",
    label: "",
    sortable: false,
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
  {
    key: "Rank",
    label: "Antal fynd",
    sortable: false,
  },
];

const sort = ref({ column: "", direction: "asc" });

const selectedColumns = computed(() =>
  [
    columns[3],
    columns[0],
    !props.isNormalView ? columns[1] : null,
    columns[2],
    !props.isNormalView ? columns[4] : null,
    !props.isNormalView ? columns[5] : null,
  ].filter((column) => column !== null)
);

const sortedData = computed(() => {
  let result = filteredData.value.slice();
  if (sort.value?.column) {
    const { column, direction } = sort.value;
    result.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA == null && valueB != null) return 1;
      if (valueA != null && valueB == null) return -1;
      if (valueA == null && valueB == null) return 0;
      const comparison = String(valueA).localeCompare(String(valueB), "sv", {
        numeric: true,
        sensitivity: "base",
      });
      return direction === "asc" ? comparison : -comparison;
    });
  } else {
    result.sort((a, b) => {
      const rankA = a.Rank ?? 99999;
      const rankB = b.Rank ?? 99999;
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      const nameA = (a.Commonname || "").toLowerCase();
      const nameB = (b.Commonname || "").toLowerCase();
      return nameA.localeCompare(nameB, "sv", {
        numeric: true,
        sensitivity: "base",
      });
    });
  }
  return result;
});

const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

const data = ref([]);
const isLoading = ref(true);

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const fetchData = async (geography, forestType, standAge, vegetationType) => {
  const filename = `edibledata-${geography}-${forestType}-${standAge}-${vegetationType}.json`;
  try {
    const response = await fetch(`/edible/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    data.value = await response.json();
    data.value = data.value.map((row) => {
      return {
        ...row,
        Rank: row["Rank matsvamp"] ?? row["Rank giftsvamp"] ?? null,
      };
    });
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

watch(
  () => route.params,
  (params) => {
    isLoading.value = true;
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
const rowsPerPage = ref(props.isNormalView ? 5 : 10);

const filteredData = computed(() => {
  let result = data.value.filter(
    (row) => row["Nyasvamp-boken"] && !row.Giftsvamp
  );
  if (searchQuery.value) {
    result = result.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }
  return result;
});

const paginatedData = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return sortedData.value;
  } else {
    const start = (page.value - 1) * rowsPerPage.value;
    const end = page.value * rowsPerPage.value;
    return sortedData.value.slice(start, end);
  }
});

const totalItems = computed(() => sortedData.value.length);
const startItem = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return totalItems.value > 0 ? 1 : 0;
  }
  return (page.value - 1) * rowsPerPage.value + 1;
});
const endItem = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return totalItems.value;
  }
  return Math.min(page.value * rowsPerPage.value, totalItems.value);
});

// --- GRID VIEW computed properties ---
const gridPageSize = computed(() => (props.isNormalView ? 6 : 24));
const gridPage = ref(1);
const gridPaginatedData = computed(() => {
  const start = (gridPage.value - 1) * gridPageSize.value;
  return sortedData.value.slice(start, start + gridPageSize.value);
});
const gridStartItem = computed(() =>
  sortedData.value.length > 0
    ? (gridPage.value - 1) * gridPageSize.value + 1
    : 0
);
const gridEndItem = computed(() =>
  Math.min(gridPage.value * gridPageSize.value, sortedData.value.length)
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
