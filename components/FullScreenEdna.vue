<template>
  <div>
    <NuxtImg
      height="270"
      src="/images/filtskinn.jpg"
      class="rounded-xl mb-2 hidden"
    />
    <NuxtImg
      src="/images/svampgrupp/BasilOther1Solid.png"
      class="w-6 mr-2 hidden"
    />

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
              <Icon name="solar:dna-linear" class="h-11 w-11" />
            </div>
            <div>
              <BaseHeading
                size="3xl"
                weight="medium"
                class="text-neutral-800 dark:text-neutral-200 -mb-1.5"
                >Alla mykorrhizasvampar</BaseHeading
              >
              <BaseHeading weight="medium" size="xs" class="text-neutral-400"
                >Enligt DNA från markinventeringens provytor
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
              :items="[10, 20, 30, 40, 50, 'Alla']"
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
            :data-nui-tooltip="'Mycel från få arter dominerar i marken'"
          >
            <div class="flex items-end">
              <!-- <div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div> -->

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
            :loading="isLoading"
            :loading-state="{
              icon: 'i-heroicons-arrow-path-20-solid',
              label: 'Laddar',
            }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :class="{
              'h-[442px]': isNormalView,
              'max-h-[calc(100vh-400px)]': !isNormalView,
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
            <template #sample_plot_count-data="{ row }" v-else>
              <div class="px-2 w-32">
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
            <div>
              <!-- Display the current range and total items -->
              <BaseProse class="text-sm"
                >Visar {{ startItem }} till {{ endItem }} av
                {{ totalItems }} arter
              </BaseProse>
            </div>
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
          <BasePlaceload class="h-4 w-full rounded" />
          <BasePlaceload class="h-4 w-[85%] rounded" />
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
  return url.replace("/detaljer", "");
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
