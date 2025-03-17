<template>
  <div class="">
    <div
      class="overflow-clip backdrop-blur-3xl rounded-xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-200"
    >
      <div class="flex gap-2 p-2 justify-end z-30" v-if="!isNormalView">
        <div>
          <USelectMenu
            :ui="{ rounded: 'rounded-full' }"
            v-model="rowsPerPage"
            :options="[10, 20, 30, 40, 50, 'Alla']"
            placeholder="Rader per sida"
          />
        </div>

        <UInput
          :ui="{ rounded: 'rounded-full' }"
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="searchQuery"
          placeholder="Sök i tabell"
        />
      </div>
      <div v-if="filteredData" :class="[isNormalView ? '' : 'border-t']">
        <div class="">
          <!-- v-model="selectedRows" -->

          <!-- UTable with Filtered Data -->
          <UTable
            :loading="isLoading"
            :loading-state="{
              icon: 'i-heroicons-arrow-path-20-solid',
              label: 'Laddar',
            }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :class="{
              'h-[442px]': isNormalView,
              '': !isNormalView,
            }"
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

              thead: !props.isNormalView
                ? 'sticky top-12 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-10'
                : 'sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-10',
              tbody: 'divide-y divide-neutral-200 dark:divide-neutral-700',
              wrapper: { base: '' },
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
            <template #sample_plot_count-data="{ row, index }">
              <!-- Show icons if `showIcons` is true -->
              <div v-if="showIcons" class="flex items-center justify-center">
                <div
                  data-nui-tooltip-position="right"
                  :data-nui-tooltip="`Förekommer i ${row.sample_plot_count} av ${sampleEnvCount} skogar`"
                >
                  <Icon
                    name="fluent:shape-organic-16-filled"
                    :class="'h-7 w-7 -my-2'"
                    :style="{ color: allColors[index] }"
                  />
                </div>
              </div>

              <!-- Otherwise show progress bars -->
              <div v-else class="px-2 w-32">
                <UProgress
                  :max="sampleEnvCount"
                  :value="row.sample_plot_count"
                  size="md"
                  :color="''"
                  :style="{ color: allColors[row.colorIndex] }"
                  data-nui-tooltip-position="right"
                  :data-nui-tooltip="`Förekommer i ${row.sample_plot_count} av ${sampleEnvCount} skogar`"
                />
              </div>
            </template>
            <template #Commonname-data="{ row }" v-if="isNormalView">
              <div class="truncate">
                {{ capitalize(row.Commonname) }}
                <span class="italic text-neutral-400"
                  >({{ capitalize(row.Scientificname) }})</span
                >
              </div>
            </template>
            <template #Commonname-data="{ row }" v-if="!isNormalView">
              <div>{{ capitalize(row.Commonname) }}</div>
            </template>
            <template #Scientificname-data="{ row }">
              <div class="italic font-thin max-w-52 truncate">
                {{ row.Scientificname }}
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
              <div v-else-if="row.Giftsvamp === 'x'">
                <Icon name="hugeicons:danger" class="text-lime-500 w-7 h-7" />
              </div>
              <div v-else></div>
            </template>
            <!-- ...other columns... -->
          </UTable>
          <div
            class="flex justify-between items-center p-5 border-t-[1px] border-neutral-200 dark:border-neutral-700"
          >
            <div class="flex h-fit shrink-0 gap-1 items-center">
              <!-- Left mini-legend -->
              <h1
                v-if="isNormalView"
                class="text-neutral-800 mr-2 bg-neutral-50 border-[0.5px] border-neutral-100 py-1 px-2 rounded-xl"
              >
                {{ data ? data.length : 0 }} Arter
              </h1>
              <h1
                v-else
                class="text-neutral-800 mr-2 bg-neutral-50 border-[0.5px] border-neutral-100 py-1 px-2 rounded-xl"
              >
                Visar {{ startItem }} till {{ endItem }} av
                {{ totalItems }} arter
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
            </div>

            <!-- Display the current range and total items -->

            <div>
              <!-- Pagination component -->
              <div v-if="!isNormalView && rowsPerPage !== 'Alla'">
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
      </div>
      <div v-else>
        <div class="max-w-sm space-y-2 mt-2">
          <USkeleton class="h-4 w-full rounded" />
          <USkeleton class="h-4 w-[85%] rounded" />
        </div>
      </div>

      <!-- Information section aligned to the bottom -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useSpeciesStore } from "~/stores/speciesStore";

// This new boolean controls how 'förekomst' will be shown
const showIcons = ref(false);

const speciesStore = useSpeciesStore();

function selectRow(row) {
  speciesStore.selectSpecies(row, "edna");
}

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
  return url.replace("/detaljer", "").replace("/artinformation", "");
};

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

const route = useRoute();
const activeTab = ref("spatialForest");

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

const sort = ref({ column: "", direction: "asc" });

const columns = [
  {
    key: "sample_plot_count",
    label: props.isNormalView ? "Mycel" : "Förekomst",
    sortable: props.isNormalView ? false : true,
    render: (row, index) => ({
      template: `<Icon name="fluent:shape-organic-16-filled" :style="{ color: allColors[${index}] }" class="h-8 w-8"/>`,
    }),
  },
  {
    key: "Commonname",
    label: "Namn",
    sortable: props.isNormalView ? false : true,
  },
  ...(props.isNormalView
    ? []
    : [
        {
          key: "Scientificname",
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
      return `<div class="flex items-center justify-center w-6 h-6  rounded-full ${statusColor} text-white" data-nui-tooltip-position="top" data-nui-tooltip="${tooltip}">${statusAbbr}</div>`;
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
const isLoading = ref(true);
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

    // Once data is fetched, turn off loading
    isLoading.value = false;

    // 1) Assign each row a stable colorIndex based on its original position
    data.value.forEach((row, i) => {
      row.colorIndex = i;
    });

    // 2) Figure out how many total species we have
    const totalSpecies = data.value.length;

    // 3) Use your existing logic for topCount (10% in your case)
    topCount.value = Math.floor(totalSpecies * 0.1);
    remainingCount.value = totalSpecies - topCount.value;

    // 4) Generate the color arrays
    const grayColors = generateColors(
      [82, 82, 82],
      [212, 212, 212],
      topCount.value
    );
    const rainbowColors = generateRainbowColors(remainingCount.value);

    // 5) Combine them into one big array
    allColors.value = [...grayColors, ...rainbowColors];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Helper function to generate rainbow colors
function generateRainbowColors(steps) {
  const colors = [];
  const saturation = 70; // Adjust for vibrancy
  const lightness = 50; // Adjust for brightness

  for (let i = 0; i < steps; i++) {
    // Calculate hue from 30° (orange) to 330° (red)
    const hue = 45 + (300 / (steps - 1 || 1)) * i;
    colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

// Watch for changes in route params and fetch data accordingly
watch(
  () => route.params,
  (params) => {
    isLoading.value = true;
    const { geography, forestType, standAge, vegetationType } = params;
    if (geography && forestType && standAge && vegetationType) {
      // Set loading to true before fetching new data

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
const totalItems = computed(() => filteredData.value.length);

const paginatedData = computed(() => {
  // If "All" is selected, show all rows
  if (rowsPerPage.value === "Alla") {
    return sortedData.value;
  } else {
    const start = (page.value - 1) * rowsPerPage.value;
    const end = page.value * rowsPerPage.value;
    return sortedData.value.slice(start, end);
  }
});

// Calculate totalPages only if rowsPerPage is a number
const totalPages = computed(() => {
  if (rowsPerPage.value === "Alla") {
    return 1;
  }
  return Math.ceil(totalItems.value / rowsPerPage.value);
});

// Start and end items
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
</style>
