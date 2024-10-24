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
      <UPopover mode="hover" class="flex items-end cursor-default" :ui="{}">
        <div class="items-end flex cursor-default">
          <div
            class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
          >
            <Icon name="icon-park-solid:knife-fork" class="h-10 w-10" />
          </div>

          <div class="">
            <BaseHeading
              size="3xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-300 mr-4 -mb-1.5"
              >Matsvampar</BaseHeading
            >
            <BaseHeading weight="medium" size="xs" class="text-neutral-400"
              >Bedömning baserad på fruktkroppar
            </BaseHeading>
          </div>
        </div>

        <template #panel>
          <div class="p-4 w-96 text-sm text-neutral-500">
            Visar matsvampar som kan förekomma i miljön, baserat på
            observationer av fruktkroppar.
          </div>
        </template>
      </UPopover>

      <div class="flex gap-2 items-end">
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
      class="relative pt-3 backdrop-blur-3xl rounded-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <div class="grid grid-cols-2 mb-8"></div>

      <div v-if="filteredData" class="col-span-6 -mt-12">
        <div class="h-fit">
          <!-- v-model="selectedRows" -->

          <!-- UTable with Filtered Data -->
          <UTable
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
                  >Inga vanligt förekommande matsvampar i denna miljön</span
                >
              </div>
            </template>
            <!-- <template v-slot:förekomst-data="{ row }">
              <div>
                {{
                  parseInt(row.förekomst_skog) + parseInt(row.förekomst_ålder)
                }}
              </div>
            </template> -->
            <!-- <template #rating-data="{ row }">
              <div class="flex">
                <span v-for="n in getValidRating(row.rating)" :key="n">
                  <Icon
                    name="material-symbols:star-rate-rounded"
                    class="h-4 w-4 text-yellow-500"
                  />
                </span>
              </div>
            </template>
            <template #förekomst_ung-data="{ row }">
              <div>
                <div v-if="row.förekomst_ung === 1">
                  <Icon name="tabler:mushroom" class="h-4 w-4" />
                </div>
                <div v-else-if="row.förekomst_ung === 0">
                  <Icon name="heroicons:x-mark-16-solid" class="h-4 w-4" />
                </div>
              </div>
            </template> -->

            <!-- <template #förekomst_skog_ålder-data="{ row }">
              <div class="flex">
                <span
                  v-for="n in getValidFörekomst(row.förekomst_skog_ålder)"
                  :key="n"
                >
                  <Icon name="tabler:mushroom" class="h-4 w-4" />
                </span>
              </div>
            </template> -->
            <!-- <template #förekomst_ung-data="{ row }">
              <div class="text-ellipsis overflow-hidden">
                {{ capitalize(row.förekomst_ung) }}
              </div>
            </template> -->
            <template #Commonname-data="{ row }">
              <div class="truncate max-w-96">
                {{ capitalize(row.Commonname) }}
                <span class="italic" v-if="isNormalView"
                  >({{ capitalize(row.Scientificname) }})</span
                >
              </div>
            </template>
            <template #Scientificname-data="{ row }">
              <div class="italic font-thin overflow-hidden text-ellipsis">
                {{ row.Scientificname }}
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

const props = defineProps({
  isNormalView: Boolean,
});

console.log("isNormalView in FullScreenEdible:", props.isNormalView);

const computedUITable = computed(() => ({
  thead: props.isNormalView ? "" : "",
  td: {
    base: "",
    padding: "py-6 pl-6",
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
];

const sort = ref({ column: "", direction: "asc" });

const selectedColumns = computed(() =>
  [
    columns[0], // "Commonname"
    !props.isNormalView ? columns[1] : null, // "Scientificname"
    columns[2], // "Svamp-grupp"
  ].filter((column) => column !== null)
);

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

const geography = ref("");
const forestType = ref("");
const standAge = ref("");
const vegetationType = ref("");

const data = ref([]);

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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// const getValidRating = (rating) => {
//   const parsedRating = parseInt(rating);
//   return Number.isNaN(parsedRating) ? 0 : parsedRating;
// };

// const getValidFörekomst = (förekomst_skog_ålder) => {
//   const parsedFörekomst = parseInt(förekomst_skog_ålder);
//   // Subtract 1 from the parsed value but ensure it doesn't go below 0
//   return Math.max(0, Number.isNaN(parsedFörekomst) ? 0 : parsedFörekomst - 1);
// };

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
const rowsPerPage = ref(props.isNormalView ? 5 : 10);
const selectedRow = ref(null);

// Computed property for filtered data
const filteredData = computed(() => {
  let result = data.value;

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

const paginatedData = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = page.value * rowsPerPage.value;
  return sortedData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / rowsPerPage.value);
});

const totalItems = computed(() => sortedData.value.length);

const startItem = computed(() => (page.value - 1) * rowsPerPage.value + 1);
const endItem = computed(() =>
  Math.min(page.value * rowsPerPage.value, totalItems.value)
);
</script>
