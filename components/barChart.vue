<template>
  <!-- Chart Section -->
  <div class="overflow-x-scroll" id="scrollbar">
    <div
      v-if="VueApexCharts && localData && localData.length"
      class="text-neutral-500"
    >
      <VueApexCharts
        :key="`${chartWidth}-${localRouteKey}`"
        height="365px"
        :width="chartWidth"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
    <div v-else class="flex justify-center">
      <!-- Placeholder if data is empty or not loaded -->
      <div class="h-[300px] w-full m-2"></div>
    </div>
  </div>
</template>

<script setup>
/* ------------------------------------------------------------------
 * In this final version, we do NOT fetch inside BarChart.
 * Instead, we watch props.chartData and rebuild the apex chart
 * whenever new data arrives from the parent (EdnaComponent).
 * This merges your original color logic, icons, tooltips, etc.
 * -----------------------------------------------------------------*/

import { computed, ref, shallowRef, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

// PROPS
const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String,
  chartWidth: {
    type: String,
    default: "100%",
  },
});

// Use route just for building a unique key if needed
const route = useRoute();
const localRouteKey = computed(() => {
  return `${route.path}-${props.geography}-${props.forestType}-${props.standAge}-${props.vegetationType}`;
});

// We no longer defineEmits for topCount, etc. because the parent handles that

// We'll keep a local reactive copy of data, purely for internal usage
const localData = ref([]);

// Keep references for apex, chartOptions, chartSeries
const VueApexCharts = shallowRef(null);

// store sums or other intermediate calculations
const totalSum = ref(0);

// Whether the user is in dark mode (for tooltip styling)
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains("dark");
});

/* ------------------------------------------------------------------
 * Original "styling logic" helpers: icons, color gradients, etc.
 * -----------------------------------------------------------------*/

function getIconPath(svampGrupp) {
  // Path mapping from your original code
  const iconMapping = {
    hattsvamp: "/images/svampgrupp/hattsvamp.png",
    kantarell: "/images/svampgrupp/kantarell.webp",
    sopp: "/images/svampgrupp/sopp.png",
    taggsvamp: "/images/svampgrupp/taggsvamp.png",
    fingersvamp: "/images/svampgrupp/fingersvamp.webp",
    tryffel: "/images/svampgrupp/tryffel.webp",
    skinnsvamp: "/images/svampgrupp/skinnsvamp.webp",
    skålsvamp: "/images/svampgrupp/skalsvamp.webp",
  };
  return iconMapping[svampGrupp] || "/images/svampgrupp/BasilOther1Solid.png";
}

function getStatusColor(status) {
  // From your original code
  const colors = {
    NT: "#fdae6b",
    EN: "#fd8d3c",
    VU: "#f16913",
    CR: "#d94801",
    // Duplicate "NT" key removed or handle differently if needed
  };
  return colors[status] || "#cccccc";
}

function generateStatusMarkerSVG(status) {
  const fillColor = getStatusColor(status);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <circle cx="9" cy="9" r="8" fill="${fillColor}" />
    <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="white" font-size="8" font-family="Arial" dy=".1em">${status}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Color-generation logic for bar gradients
function generateColors(start, end, steps) {
  if (steps <= 0) return [];
  const stepR = (end[0] - start[0]) / (steps - 1 || 1);
  const stepG = (end[1] - start[1]) / (steps - 1 || 1);
  const stepB = (end[2] - start[2]) / (steps - 1 || 1);
  const colors = [];
  for (let i = 0; i < steps; i++) {
    const r = Math.round(start[0] + stepR * i);
    const g = Math.round(start[1] + stepG * i);
    const b = Math.round(start[2] + stepB * i);
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
}

// “Rainbow” fill for the rest of bars
function generateRainbowColors(steps) {
  const colors = [];
  const saturation = 70; // tweak for vibrancy
  const lightness = 50; // tweak for brightness
  for (let i = 0; i < steps; i++) {
    // e.g. hue from 45° to 345°
    const hue = 45 + (300 / (steps - 1 || 1)) * i;
    colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

/* ------------------------------------------------------------------
 * Chart config
 * -----------------------------------------------------------------*/

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    show: true,
    width: 1,
    colors: ["transparent"],
  },
  xaxis: {
    axisTicks: { show: false },
    labels: {
      show: true,
      rotate: -45,
    },
  },
  yaxis: {
    title: {
      text: "Antal skogar där arten påträffats",
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    show: true,
    padding: {
      left: 30,
      right: 30,
    },
  },
  tooltip: {
    marker: { show: false },
    intersect: false,
    shared: true,
    followCursor: true,
    theme: isDarkMode.value ? "dark" : "light",
  },
});

const chartSeries = ref([]);

/* ------------------------------------------------------------------
 * Our main setupChartData() merges the old fetchChartData logic,
 * skipping the actual fetch. We do that after the parent passes us
 * chartData. That way, we preserve icons, bar colors, tooltips, etc.
 * -----------------------------------------------------------------*/

function setupChartData(incomingData) {
  // 1) Copy into localData
  localData.value = [...incomingData];
  if (!localData.value.length) {
    chartSeries.value = [];
    return;
  }

  // 2) Optionally, do any sorting here
  //    (If the parent already sorted, you can skip.)
  // localData.value.sort((a, b) => b.sample_plot_count - a.sample_plot_count);

  // 3) Calculate total sum if needed
  totalSum.value = localData.value.reduce(
    (acc, row) => acc + row.sample_plot_count,
    0
  );

  // 4) Build annotation points
  //    (Icons for each taxon, plus food icons, danger icons, etc.)
  const iconAnnotations = localData.value.map((row) => ({
    x: row.taxon,
    y: row.sample_plot_count,
    marker: {
      size: 10,
      fillColor: "transparent",
      strokeWidth: 0,
      shape: "circle",
    },
    image: {
      // For the main "svamp-grupp-släkte" icon
      path: getIconPath(row["Svamp-grupp-släkte"]),
      offsetY: -15,
      width: 18,
      height: 18,
    },
  }));

  const foodAnnotations = localData.value
    .filter((row) => row.matsvamp === 1)
    .map((row) => ({
      x: row.taxon,
      y: row.sample_plot_count,
      marker: {
        size: 10,
        fillColor: "transparent",
        strokeWidth: 0,
        shape: "circle",
      },
      image: {
        path: "/images/food_yellow.png",
        offsetY: -40,
        width: 18,
        height: 18,
      },
    }));

  const giftAnnotations = localData.value
    .filter((row) => row.Giftsvamp === "x")
    .map((row) => ({
      x: row.taxon,
      y: row.sample_plot_count,
      marker: {
        size: 10,
        fillColor: "transparent",
        strokeWidth: 0,
        shape: "circle",
      },
      image: {
        path: "/images/danger_lime.png",
        offsetY: -40,
        width: 18,
        height: 18,
      },
    }));

  const redlistAnnotations = localData.value
    .filter((row) => ["NT", "EN", "VU", "CR"].includes(row.RL2020kat))
    .map((row) => ({
      x: row.taxon,
      y: row.sample_plot_count,
      marker: {
        size: 10,
        fillColor: "transparent",
        strokeWidth: 0,
        shape: "circle",
      },
      image: {
        path: generateStatusMarkerSVG(row.RL2020kat),
        offsetY: -40,
        width: 24,
        height: 24,
      },
    }));

  const annotationsPoints = [
    ...redlistAnnotations,
    ...iconAnnotations,
    ...foodAnnotations,
    ...giftAnnotations,
  ];

  // 5) Build a map from taxon => snamn
  const taxonToSnamnMap = new Map();
  localData.value.forEach((row) => {
    const sNam = row.snamn
      ? capitalizeFirstLetter(row.snamn)
      : "Svenskt namn saknas";
    taxonToSnamnMap.set(row.taxon, sNam);
  });

  // 6) If you want your "top 10% are gray" or "rainbow" logic for coloring:
  const totalSpecies = localData.value.length;
  const numberOfGrayBars = Math.floor(totalSpecies * 0.1);
  const numberOfColorBars = totalSpecies - numberOfGrayBars;

  const grayColors = generateColors(
    [82, 82, 82], // darker gray
    [212, 212, 212], // lighter gray
    numberOfGrayBars
  );
  const rainbowColors = generateRainbowColors(numberOfColorBars);

  const individualBarColors = [...grayColors, ...rainbowColors];

  // 7) Build the final chartSeries, setting fillColor for each bar
  chartSeries.value = [
    {
      name: "",
      data: localData.value.map((row, index) => ({
        x: row.taxon,
        y: row.sample_plot_count,
        fillColor: individualBarColors[index],
        color: individualBarColors[index],
        snamn: row.snamn,
      })),
    },
  ];

  // 8) Update chartOptions with the final categories, tooltip, annotations
  const newCategories = localData.value.map((row) => row.taxon);

  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      ...chartOptions.value.xaxis,
      categories: newCategories,
      // Show Swedish name in the label if you want
      labels: {
        formatter(val) {
          return taxonToSnamnMap.get(val) || val;
        },
        rotate: -45,
      },
    },
    yaxis: {
      ...chartOptions.value.yaxis,
      title: {
        text: "Antal skogar där arten påträffats",
      },
    },
    annotations: {
      points: annotationsPoints,
    },
    tooltip: {
      ...chartOptions.value.tooltip,
      y: {
        formatter(val) {
          // If you have a "sample_env_count" on the data's first row
          const sampleEnvCount = localData.value[0]?.sample_env_count || "?";
          return `Påträffad i ${val} av ${sampleEnvCount} skogar`;
        },
      },
      x: {
        formatter(val, { seriesIndex, dataPointIndex, w }) {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          let snamn = dataPoint.snamn
            ? capitalizeFirstLetter(dataPoint.snamn)
            : "Saknar svenskt namn";
          return `${snamn} (${val})`;
        },
      },
      theme: isDarkMode.value ? "dark" : "light",
    },
  };
}

/* ------------------------------------------------------------------
 * WATCH for chartData changes from the parent
 * ----------------------------------------------------------------*/
watch(
  () => props.chartData,
  (newVal) => {
    if (newVal && newVal.length) {
      setupChartData(newVal);
    } else {
      // If empty, reset everything
      localData.value = [];
      chartSeries.value = [];
    }
  },
  { immediate: true }
);

/* ------------------------------------------------------------------
 * On mounted, dynamically import apexcharts in client mode
 * ----------------------------------------------------------------*/
onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
    // Re-assign chartOptions to refresh
    chartOptions.value = { ...chartOptions.value };
  }
});
</script>

<style scoped>
/* Scrollbar styling */
#scrollbar::-webkit-scrollbar {
  height: 8px; /* width of scrollbar track */
}
#scrollbar::-webkit-scrollbar-track {
  display: none; /* Hide track if desired */
}
#scrollbar::-webkit-scrollbar-thumb {
  display: block;
  background-color: #88888833;
  border-radius: 20px;
}
#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f2f3f500;
}
</style>
