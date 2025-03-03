<template>
  <div>
    <!-- Info box for selected row -->
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
          <BaseHeading size="lg" class="pointer-events-none">
            {{ capitalize(selectedRows[0].Commonname) }}
          </BaseHeading>
          <BaseHeading weight="light" size="sm" class="pointer-events-none">
            {{ selectedRows[0].Scientificname }}
          </BaseHeading>
        </div>
      </div>
    </transition>

    <!-- Header with title, filters and view toggle -->
    <div class="flex justify-between mb-2 items-end">
      <div class="items-end flex cursor-default">
        <div
          class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-teal-500 flex justify-center items-center"
        >
          <Icon name="material-symbols:award-star-outline" class="h-10 w-10" />
        </div>

        <BaseHeading
          size="3xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
        >
          Naturvårdsarter
        </BaseHeading>
        <UBadge
          v-if="!isNormalView"
          class="truncate"
          size="lg"
          color="amber"
          variant="subtle"
          :ui="{ rounded: 'rounded-lg' }"
          ><Icon
            name="lineicons:mushroom-1"
            class="size-6 text-amber-500 mr-1"
          />Enligt samlad kunskap, främst var fruktkroppar förekommer
        </UBadge>
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
          class="ml-4 -mb-6 inline-flex align-bottom"
        />
      </div>

      <!-- New: Grid/table view toggle -->

      <div class="flex gap-2 items-end">
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
        <BaseListbox
          class="w-44"
          v-model="selectedMark"
          :items="markOptions"
          :properties="{ value: 'value', label: 'name', key: 'id' }"
          placeholder="Välj marktyp"
          shape="full"
          label="Marktyp"
          label-float
        />
        <BaseInput
          v-if="!props.isNormalView"
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
                    Inga naturvårdsarter att visa i denna miljön
                  </span>
                </div>
              </template>
              <template #RL2020kat-data="{ row }">
                <div class="flex items-center space-x-2">
                  <div
                    v-if="row.SIGNAL_art !== 'S'"
                    :class="getStatusColor(row.RL2020kat)"
                    class="h-8 w-8 rounded-full flex items-center justify-center text-white z-0 max-w-12"
                    data-nui-tooltip-position="right"
                    :data-nui-tooltip="
                      row['RL2020kat'] !== 'Saknas'
                        ? getStatusTooltip(row.RL2020kat)
                        : 'Ej bedömd'
                    "
                  >
                    {{ getStatusAbbreviation(row.RL2020kat) }}
                  </div>
                  <div v-if="row.SIGNAL_art === 'S'" class="relative">
                    <div
                      class="h-8 w-8 rounded-full bg-neutral-500 opacity-100 flex items-center justify-center text-white z-10"
                      data-nui-tooltip-position="right"
                      :data-nui-tooltip="'Signalart'"
                    >
                      S
                    </div>
                  </div>
                </div>
              </template>
              <template #Commonname-data="{ row }">
                <div class="truncate">
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
                <div class="italic font-thin">{{ row.Scientificname }}</div>
              </template>
              <template #Mark-data="{ row }">
                <div class="flex items-center space-x-1">
                  <div v-if="row.KALKmark">
                    <UBadge
                      :ui="{ rounded: 'rounded-full' }"
                      color="amber"
                      variant="outline"
                    >
                      Kalkmark
                    </UBadge>
                  </div>
                  <div v-if="row.ANNANmark">
                    <UBadge
                      :ui="{ rounded: 'rounded-full' }"
                      color="emerald"
                      variant="outline"
                    >
                      Vanlig skogsmark
                    </UBadge>
                  </div>
                </div>
              </template>
              <template #OVANLIGHET-data="{ row }">
                <div
                  v-if="row.OVANLIGHET == 2"
                  data-nui-tooltip-position="left"
                  :data-nui-tooltip="'Väldigt sällsynt'"
                  class="ml-2"
                >
                  <Icon
                    name="material-symbols:star-rounded"
                    class="w-8 h-8 text-teal-500"
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
              <template #RankRed-data="{ row }">
                <div class="px-2 w-32">
                  <UProgress
                    max="3"
                    :value="getInvertedRankValue(row.RankRed)"
                    :color="getColorForRank(row.RankRed)"
                    size="md"
                    data-nui-tooltip-position="right"
                    :data-nui-tooltip="getRankTooltip(row.RankRed)"
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
        </div>
      </div>

      <!-- GRID VIEW -->
      <div v-else>
        <div
          :class="[
            'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 pt-1  min-h-[399px] overflow-scroll',
            props.isNormalView ? 'md:grid-cols-6' : 'md:grid-cols-6',
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
                <div
                  v-if="row.SIGNAL_art !== 'S'"
                  :class="getStatusColor(row.RL2020kat)"
                  class="h-8 w-8 rounded-full flex items-center justify-center text-white z-0 max-w-12"
                  data-nui-tooltip-position="right"
                  :data-nui-tooltip="
                    row.RL2020kat !== 'Saknas'
                      ? getStatusTooltip(row.RL2020kat)
                      : 'Ej bedömd'
                  "
                >
                  {{ getStatusAbbreviation(row.RL2020kat) }}
                </div>
                <div v-if="row.SIGNAL_art === 'S'" class="relative">
                  <div
                    class="h-8 w-8 rounded-full bg-neutral-500 opacity-100 flex items-center justify-center text-white z-10"
                    data-nui-tooltip-position="right"
                    :data-nui-tooltip="'Signalart'"
                  >
                    S
                  </div>
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
      <!-- End of grid view -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useSpeciesStore } from "~/stores/speciesStore";

console.log("FullscreenRedlisted setup started");

// --- View Toggle ---
const activeView = ref("grid");
const isTableView = computed(() => activeView.value === "table");

// --- Props and UI Config ---
const props = defineProps({ isNormalView: Boolean });
console.log("isNormalView in FullscreenRedlisted:", props.isNormalView);

const computedUITable = computed(() => ({
  thead:
    "sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-50",
  td: {
    base: "",
    padding: "py-5 pl-6",
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

// --- Drag and Info Box ---
const selectedRows = ref([]);
const boxPosition = reactive({ top: 100, left: 100 });
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

// --- Species Store & Selection ---
const speciesStore = useSpeciesStore();
function selectRow(row) {
  speciesStore.selectSpecies(row, "redlisted");
}

// --- Utility Functions ---
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function getInvertedRankValue(rank) {
  return !rank ? 0 : 4 - rank;
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
    EN: "bg-[#C4004F]",
    VU: "bg-[#D7838E]",
    CR: "bg-[#C4004F]",
    RE: "bg-[#421A31]",
    DD: "bg-[#E8E9E7]",
  };
  return colors[status] || "bg-[#EAB61F]";
};
const getStatusTooltip = (status) => {
  const tooltips = {
    LC: "Nära hotad",
    NT: "Nära hotad",
    EN: "Starkt hotad",
    VU: "Sårbar",
    CR: "Akut hotad",
    RE: "Nationellt utdöd",
    DD: "Kunskapsbrist",
  };
  return tooltips[status] || "Ej bedömd";
};
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

// --- Data Fetching & Filtering ---
const route = useRoute();
const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");
const data = ref([]);
const isLoading = ref(true);
async function fetchData(geography, forestType, standAge, vegetationType) {
  const filename = `redlisted-${geography}-${forestType}-${standAge}-${vegetationType}.json`;
  try {
    const response = await fetch(`/redlisted/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    data.value = await response.json();
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
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
const markOptions = [
  { id: "all", name: "Alla marker", value: null },
  { id: "kalkmark", name: "Kalkmark", value: "KALKmark" },
  { id: "annanmark", name: "Vanlig skogsmark", value: "ANNANmark" },
];
const selectedMark = ref(markOptions[0]);
const filteredData = computed(() => {
  let result = data.value;
  if (selectedMark.value && selectedMark.value.value !== null) {
    result = result.filter((row) => row[selectedMark.value.value] != null);
  }
  if (searchQuery.value) {
    result = result.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }
  return result;
});
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
      const rankA = a.RankRed ?? 99999;
      const rankB = b.RankRed ?? 99999;
      if (rankA !== rankB) return rankA - rankB;
      const nameA = a.Commonname?.toString().toLowerCase() || "";
      const nameB = b.Commonname?.toString().toLowerCase() || "";
      return nameA.localeCompare(nameB, "sv", {
        numeric: true,
        sensitivity: "base",
      });
    });
  }
  return result;
});
const totalItems = computed(() => sortedData.value.length);
const startItem = computed(() => {
  if (rowsPerPage.value === "Alla") return totalItems.value > 0 ? 1 : 0;
  return (page.value - 1) * rowsPerPage.value + 1;
});
const endItem = computed(() => {
  if (rowsPerPage.value === "Alla") return totalItems.value;
  return Math.min(page.value * rowsPerPage.value, totalItems.value);
});

// --- Add Computed for Table Pagination ---
const paginatedData = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return sortedData.value;
  } else {
    const start = (page.value - 1) * rowsPerPage.value;
    const end = page.value * rowsPerPage.value;
    return sortedData.value.slice(start, end);
  }
});

// --- Grid View Pagination ---
const gridPageSize = computed(() => (props.isNormalView ? 12 : 24));
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

const sort = ref({ column: "", direction: "asc" });
const columns = [
  {
    key: "RL2020kat",
    label: "Status",
    sortable: props.isNormalView ? false : true,
  },
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
  { key: "Mark", label: "Mark", sortable: props.isNormalView ? false : true },
  {
    key: "OVANLIGHET",
    label: "Extra ovanlig",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "Svamp-grupp",
    label: "Grupp",
    sortable: props.isNormalView ? false : true,
  },
  { key: "RankRed", label: "Antal fynd", sortable: false },
];
const isRare = ref(false);
const toggleRare = () => {
  isRare.value = !isRare.value;
};
const selectedColumns = computed(() =>
  [
    columns[0],
    columns[1],
    !props.isNormalView ? columns[2] : null,
    columns[3],
    isRare.value ? columns[4] : null,
    columns[5],
    !props.isNormalView ? columns[6] : null,
  ].filter((col) => col !== null)
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
