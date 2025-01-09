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
            capitalize(selectedRows[0].snamn)
          }}</BaseHeading>
          <BaseHeading weight="light" size="sm" class="pointer-events-none">{{
            selectedRows[0].taxon
          }}</BaseHeading>
        </div>
      </div>
    </transition>
    <div class="flex justify-between mb-2 items-end">
      <UPopover mode="hover" class="flex items-end cursor-default">
        <div class="items-end flex cursor-default">
          <div
            class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-teal-500 flex justify-center items-center"
          >
            <Icon
              name="material-symbols:award-star-outline"
              class="h-10 w-10"
            />
          </div>

          <div class="">
            <BaseHeading
              size="3xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-300 mr-4 -mb-1.5"
              >Naturvårdsarter</BaseHeading
            >
            <BaseHeading weight="medium" size="xs" class="text-neutral-400"
              >Bedömning baserad på samlad kunskap
            </BaseHeading>
          </div>
        </div>

        <template #panel>
          <div class="p-4 w-96 text-sm text-neutral-500">
            Visar signalarter och rödlistade arter som kan förekomma i miljön,
            baserat på observationer av fruktkroppar.
          </div>
        </template>
      </UPopover>

      <div class="flex gap-2 items-end">
        <!-- <div
          :data-nui-tooltip="'Visa extra sällsynta arter'"
          data-nui-tooltip-position="left"
        >
          <Icon
            @click="toggleRare"
            name="material-symbols:star-rounded"
            class="w-10 h-10 hover:text-teal-500 text-neutral-300 hover:cursor-pointer transition-all"
            :class="{
              'text-teal-500': isRare,
            }"
          />
        </div> -->

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
          :properties="{
            value: 'value',
            label: 'name',
            key: 'id',
          }"
          placeholder="Välj marktyp"
          shape="full"
          label="Marktyp"
          label-float
        />
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

    <div
      class="relative pt-3 backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <div class="grid grid-cols-2 mb-8"></div>

      <div v-if="filteredData" class="col-span-6 -mt-12">
        <div class="h-fit">
          <!-- v-model="selectedRows" -->

          <!-- UTable with Filtered Data -->
          <UTable
            :loading="isLoading"
            :loading-state="{
              icon: 'i-heroicons-arrow-path-20-solid',
              label: 'Laddar',
            }"
            class="max-h-[calc(100vh-400px)]"
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
              <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm"
                  >Inga naturvårdsarter att visa i denna miljön</span
                >
              </div>
            </template>
            <!-- <template #rating-data="{ row }">
              <div class="flex">
                <span v-for="n in getValidRating(row.rating)" :key="n">
                  <Icon
                    name="material-symbols:star-rate-rounded"
                    class="h-4 w-4 text-yellow-500"
                  />
                </span>
              </div>
            </template> -->
            <!-- <template #rating-data="{ row }">
              <div
                data-nui-tooltip-position="right"
                :data-nui-tooltip="
                  row['RL2020kat'] !== 'Saknas'
                    ? getStatusTooltip(row.RL2020kat)
                    : 'Ej bedömd'
                "
                class="ml-2"
              >
                <div
                  :class="getStatusColor(row.RL2020kat)"
                  class="h-8 w-8 rounded-full flex items-center justify-center text-white -m-1"
                >
                  {{ getStatusAbbreviation(row.RL2020kat) }}
                </div>
              </div>
            </template> -->
            <template #RL2020kat-data="{ row }">
              <div class="flex items-center space-x-2">
                <!-- Existing Status Circle -->

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

                <!-- Conditional Blue 'S' Circle -->
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
                <span class="italic" v-if="isNormalView"
                  >({{ capitalize(row.Scientificname) }})</span
                >
              </div>
            </template>
            <template #Scientificname-data="{ row }">
              <div class="italic font-thin">{{ row.Scientificname }}</div>
            </template>
            <template #Mark-data="{ row }">
              <div class="flex items-center space-x-1">
                <!-- 'K' for Kalkmark -->
                <div v-if="row.KALKmark">
                  <UBadge color="amber" variant="subtle">Kalkmark</UBadge>

                  <!-- <div
                    class="h-8 w-8 rounded-full flex items-center justify-center text-white bg-stone-700"
                    data-nui-tooltip-position="left"
                    :data-nui-tooltip="'Kalkmark'"
                  >
                    K
                  </div> -->
                </div>
                <!-- 'Ö' for Övrig mark -->
                <div v-if="row.ANNANmark">
                  <UBadge color="emerald" variant="subtle"
                    >Vanlig skogsmark</UBadge
                  >

                  <!-- <div
                    class="h-8 w-8 rounded-full flex items-center justify-center text-white bg-stone-400"
                    data-nui-tooltip-position="left"
                    :data-nui-tooltip="'Vanlig skogsmark'"
                  >
                    V
                  </div> -->
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
              <div v-else></div>
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
            <!-- ...other columns... -->
          </UTable>
          <div
            class="flex justify-between items-center p-5 border-t-[1px] border-neutral-200 dark:border-neutral-800"
          >
            <div>
              <!-- Display the current range and total items -->
              <BaseProse class="text-sm"
                >Visar {{ startItem }} till {{ endItem }} av
                {{ totalItems }} arter</BaseProse
              >
            </div>
            <div>
              <!-- Pagination component -->
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
                  <!-- Custom previous button -->
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

                  <!-- Custom next button -->
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
</style>

<script setup>
console.log("FullScreenEdible setup started");

import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useSpeciesStore } from "~/stores/speciesStore";

function getInvertedRankValue(rank) {
  // Fallback to 0 if rank is missing or invalid
  if (!rank) return 0;
  return 4 - rank; // Invert so rank=1 -> 3, rank=2 -> 2, rank=3 -> 1
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
      // Rank = 1 (full bar) => color “blue”, for example
      return "yellow";
    case 2:
      // Rank = 2 (half bar) => color “amber”
      return "amber";
    case 3:
      // Rank = 3 (almost empty) => color “orange”
      return "orange";
    default:
      // Fallback color
      return "neutral";
  }
}

const speciesStore = useSpeciesStore();

function selectRow(row) {
  speciesStore.selectSpecies(row, "redlisted");
}

const markOptions = [
  { id: "all", name: "Alla marker", value: null }, // Use null to represent 'all'
  { id: "kalkmark", name: "Kalkmark", value: "KALKmark" },
  { id: "annanmark", name: "Vanlig skogsmark", value: "ANNANmark" },
];

const selectedMark = ref(markOptions[0]); // Default to 'Alla marker'

const searchMark = computed(() => {
  if (selectedMark.value.length === 0) {
    return "";
  }

  // Build the query string for multiple selections
  return selectedMark.value
    .map((mark) => `&mark=${encodeURIComponent(mark.value)}`)
    .join("");
});

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

const props = defineProps({
  isNormalView: Boolean,
});

console.log("isNormalView in FullScreenEdible:", props.isNormalView);

const computedUITable = computed(() => ({
  thead:
    "sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-50",

  td: {
    base: "",
    padding: "py-5 pl-6",
    size: "text-md",
    color: "text-neutral-500 dark:text-neutral-400",
  },
  th: {
    padding: "pt-4 pl-6",
  },
  // divide: props.isNormalView
  //   ? ""
  //   : "divide-y divide-neutral-200 dark:divide-neutral-800",
  tr: {
    padding: "pl-12",
    base: "overflow-hidden",
    selected: "bg-neutral-100 dark:bg-neutral-900",
    active:
      "hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-900 ",
  },
}));

const route = useRoute();

const isInfoBoxVisible = ref(false);

const selectedRows = ref([]);
const isDragging = ref(false);

// function getCenterPosition() {
//   const boxWidth = 200;
//   const boxHeight = 400;

//   const centerX = (window.innerWidth - boxWidth) / 2;
//   const centerY = (window.innerHeight - boxHeight) / 2;

//   return { top: centerY, left: centerX };
// }

// const boxPosition = reactive(getCenterPosition());
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

// function selectRow(row) {
//   selectedRows.value = [row];
// }

function closeInfoBox() {
  selectedRows.value = [];
}

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
  {
    key: "Mark",
    label: "Mark",
    sortable: props.isNormalView ? false : true,
  },
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
  {
    key: "RankRed",
    label: "Antal fynd",
    // Make it sortable as well:
    sortable: false,
  },
];

// Reactive state for toggling rarity
const isRare = ref(false); // Initially set to false

// Function to toggle the isRare state
const toggleRare = () => {
  isRare.value = !isRare.value;
};

const sort = ref({ column: "", direction: "asc" });

const selectedColumns = computed(() =>
  [
    columns[0], // RL2020kat
    columns[1], // Commonname
    !props.isNormalView ? columns[2] : null, // Scientificname (conditional)
    columns[3], // Mark
    isRare.value ? columns[4] : null, // OVANLIGHET (only if isRare is true)
    columns[5], // Svamp-grupp

    // ADD the new column here
    !props.isNormalView ? columns[6] : null, // "Rank rödlist o signal"
  ].filter((column) => column !== null)
);

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
  const filename = `redlisted-${geography}-${forestType}-${standAge}-${vegetationType}.json`;
  try {
    const response = await fetch(`/redlisted/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    data.value = await response.json();
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// const getValidRating = (rating) => {
//   const parsedRating = parseInt(rating);
//   return Number.isNaN(parsedRating) ? 0 : parsedRating;
// };

// Watch for changes in route params and fetch data accordingly
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
const rowsPerPageOptions = [5, 10, 20, 30, 40, 50]; // Options for rows per page
const rowsPerPage = ref(props.isNormalView ? 5 : 10);
const selectedRow = ref(null);

const filteredData = computed(() => {
  let result = data.value;

  // Apply 'Mark' filter only if selectedMark is not null and has a value
  if (selectedMark.value && selectedMark.value.value !== null) {
    result = result.filter((row) => row[selectedMark.value.value] != null);
  }

  // **Apply 'isRare' filter**
  if (!isRare.value) {
    // When isRare is false, exclude rows where OVANLIGHET is 2
    result = result.filter((row) => row.OVANLIGHET !== 2);
  }
  // When isRare is true, include all rows (no additional filtering needed)

  // Apply search query filter
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
  let result = filteredData.value.slice(); // shallow copy

  // If the user has clicked on a column to sort, do that
  if (sort.value?.column) {
    const { column, direction } = sort.value;
    result.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle null or undefined
      if (valueA == null && valueB != null) return 1;
      if (valueA != null && valueB == null) return -1;
      if (valueA == null && valueB == null) return 0;

      // Compare as strings (or numbers)
      const comparison = String(valueA).localeCompare(String(valueB), "sv", {
        numeric: true,
        sensitivity: "base",
      });

      return direction === "asc" ? comparison : -comparison;
    });
  } else {
    // >>> DEFAULT TWO-LEVEL SORT <<<
    // 1) By "Rank rödlist o signal" ascending
    // 2) If same rank, sort by Commonname ascending
    result.sort((a, b) => {
      const rankA = a.RankRed ?? 99999; // if null
      const rankB = b.RankRed ?? 99999;

      // Compare rank first
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      // If ranks are equal, compare alphabetical by Commonname
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

// Computed property for paginated data
const paginatedData = computed(() => {
  if (rowsPerPage.value === "Alla") {
    // Show all rows
    return sortedData.value;
  } else {
    const start = (page.value - 1) * rowsPerPage.value;
    const end = page.value * rowsPerPage.value;
    return sortedData.value.slice(start, end);
  }
});

const totalPages = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return 1; // Only one "page" when showing all
  }
  return Math.ceil(filteredData.value.length / rowsPerPage.value);
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
</script>
