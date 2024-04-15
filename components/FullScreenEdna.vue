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
    <div
      class="flex justify-between mb-2 items-end"
      :class="{ 'mt-3': isNormalView }"
    >
      <div class="flex items-end" v-if="props.isNormalView == false">
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
      </div>
      <div v-else></div>

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

    <div
      :class="{ 'rounded-xl': !isNormalView }"
      class="relative backdrop-blur-3xl overflow-clip rounded-r-xl bg-white bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
    >
      <div v-if="filteredData" class="col-span-6">
        <div class="">
          <!-- v-model="selectedRows" -->

          <!-- UTable with Filtered Data -->
          <UTable
            id="scrollbar"
            :class="{ 'h-[420px]': isNormalView }"
            :sort-button="{
              color: 'text-neutral-700 dark:text-neutral-300',
              size: 'xl',
            }"
            :ui="{
              td: {
                size: 'text-md',
                color: 'text-neutral-500 dark:text-neutral-400',
              },
              thead: 'sticky top-0 bg-white shadow-sm shadow-neutral-300 z-20',
              tbody: 'divide-y divide-neutral-200 dark:divide-neutral-800',
              tr: {
                base: '',
                selected: 'bg-neutral-100 dark:bg-neutral-900',
                active:
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-900',
              },
            }"
            :columns="columns"
            :rows="paginatedData"
            @select="selectRow"
          >
            <template v-if="isNormalView" #total_presence-data="{ row, index }">
              <div class="flex items-center justify-center">
                <div
                  data-nui-tooltip-position="right"
                  :data-nui-tooltip="`Förekomst: ${row['total_presence']}`"
                >
                  <Icon
                    name="fluent:shape-organic-16-filled"
                    :class="'h-8 w-8'"
                    :style="{ color: allColors[index] }"
                  />
                </div>
              </div>
            </template>
            <template #snamn-data="{ row }">
              <div>{{ capitalize(row.snamn) }}</div>
            </template>
            <template #taxon-data="{ row }">
              <div class="italic font-thin">{{ row.taxon }}</div>
            </template>
            <template #Svamp-grupp-data="{ row }">
              <div
                data-nui-tooltip-position="left"
                :data-nui-tooltip="
                  row['Svamp-grupp'] !== '0'
                    ? capitalize(row['Svamp-grupp'])
                    : 'Okänd'
                "
                class="ml-2"
              >
                <NuxtImg
                  v-if="row['Svamp-grupp'] !== '0'"
                  :src="getIconPath(row['Svamp-grupp'])"
                  class="w-5"
                  alt="Svamp Icon"
                />

                <Icon
                  v-else
                  name="material-symbols:question-mark-rounded"
                  class="size-5"
                />
              </div>
            </template>
            <!-- Inside your UTable where you define templates for data rows -->
            <template #RL2020kat-data="{ row }">
              <div
                :class="getStatusColor(row.RL2020kat)"
                class="h-8 w-8 rounded-full flex items-center justify-center text-white"
              >
                {{ getStatusAbbreviation(row.RL2020kat) }}
              </div>
            </template>

            <!-- Custom rendering for matsvamp column -->
            <template #matsvamp-data="{ row }">
              <div v-if="row.matsvamp === 1">
                <Icon
                  name="fluent:food-16-filled"
                  class="h-8 w-8 text-yellow-500 -my-2"
                />
              </div>
              <div v-if="row.matsvamp === 0"></div>
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
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const getIconPath = (svampGrupp) => {
  const iconMapping = {
    hattsvamp: "hattsvamp.webp",
    kantarell: "kantarell.webp",
    sopp: "sopp.webp",
    taggsvamp: "taggsvamp.webp",
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

const selectedRows = ref([]);
const isDragging = ref(false);

function getCenterPosition() {
  const boxWidth = 200;
  const boxHeight = 400;

  const centerX = (window.innerWidth - boxWidth) / 2;
  const centerY = (window.innerHeight - boxHeight) / 2;

  return { top: centerY, left: centerX };
}

const boxPosition = reactive(getCenterPosition());
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

function selectRow(row) {
  selectedRows.value = [row];
}

function closeInfoBox() {
  selectedRows.value = [];
}

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
  return abbreviations[status] || "??"; // Default case
};

const getStatusColor = (status) => {
  const colors = {
    LC: "bg-green-400",
    NT: "bg-rose-400", // Lighter shade for less severe status
    EN: "bg-rose-600", // Endangered
    VU: "bg-rose-500", // Vulnerable
    CR: "bg-rose-800", // Critically Endangered
    RE: "bg-black", // Darker shade for more severe status
    DD: "bg-gray-500", // Data Deficient
  };
  return colors[status] || "bg-gray-200"; // Default color for unknown status
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
  return tooltips[status] || "Okänd status";
};

// Define columns for your table
const columns = [
  {
    key: "total_presence",
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
  {
    key: "taxon",
    label: "Latinskt namn",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "Svamp-grupp",
    label: props.isNormalView ? "Grupp" : "Grupp",
    sortable: props.isNormalView ? false : true,
  },
  {
    key: "matsvamp",
    label: "Matsvamp",
    sortable: props.isNormalView ? false : true,

    render: (row) => (row.matsvamp ? "Yes" : "No"),
  },
  {
    key: "RL2020kat",
    label: "Naturvård",
    sortable: props.isNormalView ? false : true,
    render: (row) => {
      const statusAbbr = getStatusAbbreviation(row.RL2020kat);
      const statusColor = getStatusColor(row.RL2020kat);
      const tooltip = getStatusTooltip(row.RL2020kat);
      return `<div class="flex items-center justify-center w-6 h-6 rounded-full ${statusColor} text-white" data-nui-tooltip-position="top" data-nui-tooltip="${tooltip}">${statusAbbr}</div>`;
    },
  },
];

const sortedData = computed(() => {
  // Sort data based on your sorting logic
  return data.value.sort(/* your sorting logic here */);
});

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

const searchQuery = ref("");
const page = ref(1);
const rowsPerPageOptions = [5, 10, 20, 30, 40, 50]; // Options for rows per page
const rowsPerPage = ref(props.isNormalView ? 500 : 10);
const selectedRow = ref(null);

// Computed property for filtered data
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data.value;
  }
  return data.value.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = page.value * rowsPerPage.value;
  return filteredData.value.slice(start, end);
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
