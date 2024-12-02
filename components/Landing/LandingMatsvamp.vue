<template>
  <div>
    <!-- Top Section -->
    <div>
      <div class="items-end flex cursor-default">
        <div
          class="dark:opacity-90 w-12 h-12 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
        >
          <Icon name="icon-park-solid:knife-fork" class="h-12 w-12" />
        </div>
        <div>
          <BaseHeading
            size="3xl"
            weight="medium"
            class="text-neutral-800 dark:text-neutral-200 -mb-1.5"
          >
            Matsvamp
          </BaseHeading>
          <BaseHeading weight="medium" size="xs" class="text-neutral-400">
            Bedömning baserad på fruktkroppar
          </BaseHeading>
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div
      class="relative backdrop-blur-3xl overflow-clip rounded-2xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-primary-500 mt-3.5"
    >
      <!-- Data Table -->
      <div v-if="filteredData.length" class="col-span-6">
        <div>
          <!-- UTable with Filtered Data -->
          <UTable
            id="scrollbar"
            class="h-[440px] -mt-1"
            :sort-button="{
              color: 'text-neutral-700 dark:text-neutral-200',
              size: 'xl',
            }"
            :ui="{
              td: {
                base: 'max-w-80',
                padding: 'py-5',
                size: 'text-lg',
                color: 'text-neutral-500 dark:text-neutral-300',
              },
              thead:
                'hidden pl-2 sticky top-0 bg-white dark:bg-neutral-800 dark:bg-opacity-100 shadow-sm shadow-neutral-300 dark:shadow-neutral-700 z-20',
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
            :key="uniqueKey"
          >
            <!-- Custom Templates for Table Columns -->

            <!-- Grupp Data -->
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

            <!-- Namn Data -->
            <template #snamn-data="{ row }">
              <div class="truncate">
                {{ capitalize(row.Commonname) }}
                <span class="italic"
                  >({{ capitalize(row.Scientificname) }})</span
                >
              </div>
            </template>
          </UTable>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else>
        <div class="max-w-sm space-y-2 mt-2">
          <BasePlaceload class="h-4 w-full rounded" />
          <BasePlaceload class="h-4 w-[85%] rounded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSpeciesStore } from "~/stores/speciesStore";

// Initialize Species Store
const speciesStore = useSpeciesStore();

// Function to handle row selection
function selectRow(row) {
  speciesStore.selectSpecies(row, "edible");
}

// Capitalize function for displaying the species name
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Function to get the icon path based on Grupp
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

// Status Abbreviation based on RL2020kat
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

// Status Color based on RL2020kat
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
  return colors[status] || "bg-yellow-500";
};

// Status Tooltip based on RL2020kat
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

// Sorting State
const sort = ref({ column: "", direction: "asc" });

// Define Columns for UTable (Matsvamp)
const columns = [
  {
    key: "Svamp-grupp",
    label: "Grupp",
    sortable: false,
  },
  {
    key: "snamn",
    label: "Namn",
    sortable: false,
  },
];

// Hardcoded Selections
const fixedSelections = {
  geography: "Norr",
  forestType: "Granskog",
  standAge: "91",
  vegetationType: "Blåbär_grupp",
};

// Unique Key for UTable to Force Re-render if Needed
const uniqueKey = computed(
  () =>
    `table-${fixedSelections.geography}-${fixedSelections.forestType}-${fixedSelections.standAge}-${fixedSelections.vegetationType}`
);

// Data and Colors
const data = ref([]);
const allColors = ref([]);

// Sample Environment Count
const sampleEnvCount = computed(() => {
  return data.value.length > 0 ? data.value[0].sample_env_count : 0;
});

// Top and Remaining Counts
const topCount = ref(0);
const remainingCount = ref(0);

// Pagination States (Removed Search and Buttons)
const page = ref(1);
const rowsPerPage = ref(10); // Default to 10 rows per page

// Function to Generate Colors for Bars
const generateColors = (start, end, steps) => {
  const stepR = (end[0] - start[0]) / (steps - 1 || 1);
  const stepG = (end[1] - start[1]) / (steps - 1 || 1);
  const stepB = (end[2] - start[2]) / (steps - 1 || 1);
  const colors = [];

  for (let i = 0; i < steps; i++) {
    const r = Math.round(start[0] + stepR * i);
    const g = Math.round(start[1] + stepG * i);
    const b = Math.round(start[2] + stepB * i);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
};

// Helper function to generate rainbow colors
function generateRainbowColors(steps) {
  const colors = [];
  const saturation = 70; // Adjust for vibrancy
  const lightness = 50; // Adjust for brightness

  for (let i = 0; i < steps; i++) {
    // Calculate hue from 45° to 345° (a 300° range)
    const hue = 45 + (300 / (steps - 1 || 1)) * i;
    colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

// Function to Fetch Data Based on Hardcoded Selections
const fetchData = async (geography, forestType, standAge, vegetationType) => {
  const filename = `edibledata-${geography}-${forestType}-${standAge}-${vegetationType}.json`;
  try {
    const response = await fetch(`/edible/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    data.value = await response.json();

    // Calculate Counts
    const totalSpecies = data.value.length;
    topCount.value = Math.floor(totalSpecies * 0.1); // 10% of total species
    remainingCount.value = totalSpecies - topCount.value;

    // Generate gray colors for the first 10%
    const grayColors = generateColors(
      [82, 82, 82],
      [212, 212, 212],
      topCount.value
    );

    // Generate rainbow colors for the remaining 90%
    const rainbowColors = generateRainbowColors(remainingCount.value);

    // Combine the colors
    allColors.value = [...grayColors, ...rainbowColors];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch Data on Component Mount with Hardcoded Selections
onMounted(() => {
  fetchData(
    fixedSelections.geography,
    fixedSelections.forestType,
    fixedSelections.standAge,
    fixedSelections.vegetationType
  );
});

// Computed Properties for Filtering and Sorting
const filteredData = computed(() => {
  let result = data.value;

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

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = page.value * rowsPerPage.value;
  return sortedData.value.slice(start, end);
});

// Computed property for total number of items
const totalItems = computed(() => sortedData.value.length);

// Computed property for the starting item number
const startItem = computed(() => (page.value - 1) * rowsPerPage.value + 1);

// Computed property for the ending item number
const endItem = computed(() =>
  Math.min(page.value * rowsPerPage.value, totalItems.value)
);
</script>

<style scoped>
/* Hide scrollbar for IE, Edge and Firefox */
#scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
#scrollbar::-webkit-scrollbar {
  display: none;
}

/* Optional: Styling for hovered scrollbar thumb (Not Visible as Scrollbar is Hidden) */
#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
  background-color: #6f202033; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
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
