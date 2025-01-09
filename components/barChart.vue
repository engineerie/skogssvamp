<template>
  <!-- Chart Section -->
  <div class="overflow-x-scroll" id="scrollbar">
    <div v-if="VueApexCharts && data" class="text-neutral-500">
      <VueApexCharts
        :key="`${chartWidth}-${routeKey}`"
        height="365px"
        :width="chartWidth"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
    <div v-else class="flex justify-center">
      <div class="h-[300px] w-full m-2"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// Define props to receive data from the parent component
const props = defineProps({
  chartWidth: String,
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String,
});

const route = useRoute();

const routeKey = computed(
  () =>
    `${route.path}-${props.geography}-${props.forestType}-${props.standAge}-${props.vegetationType}`
);

const emits = defineEmits(["updateInfo"]);

const isDarkMode = computed(() => {
  return document.documentElement.classList.contains("dark");
});

const getIconPath = (svampGrupp) => {
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
  return iconMapping[svampGrupp] || "/images/svampgrupp/BasilOther1Solid.png"; // Fallback to a default icon
};

const getStatusColor = (status) => {
  const colors = {
    NT: "#fdae6b", // Corresponding to bg-rose-400
    EN: "#fd8d3c", // bg-rose-600
    VU: "#f16913", // bg-rose-500
    CR: "#d94801", // bg-rose-800
    NT: "#D7838E",
  };
  return colors[status] || "#cccccc"; // Default color for unknown status
};

const generateStatusMarkerSVG = (status) => {
  const fillColor = getStatusColor(status);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <circle cx="9" cy="9" r="8" fill="${fillColor}" />
    <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="white" font-size="8" font-family="Arial" dy=".1em">${status}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
};

// Reactive variables for counts and percentages
const topPercentage = ref(0);
const remainingPercentage = ref(0);
const topCount = ref(0);
const remainingCount = ref(0);

const VueApexCharts = shallowRef(null);
const data = ref(null);
const totalSum = ref(0);

// Define `sampleEnvCount` computed property
const sampleEnvCount = computed(() => {
  return data.value && data.value.length > 0
    ? data.value[0].sample_env_count
    : 0;
});

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false, // This line hides the toolbar
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["transparent"],
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    style: {
      colors: ["transparent"],
    },
    labels: {
      show: true,
      rotate: -45,
    },
  },
  yaxis: {
    title: {
      text: `Antal skogar där arten påträffats av ${sampleEnvCount.value}`,
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
    marker: {
      show: false,
    },
    intersect: false,
    shared: true,
    followCursor: true,
    y: {
      formatter: function (val) {
        return val;
      },
    },
    theme: isDarkMode.value ? "dark" : "light",
    style: {
      backgroundColor: isDarkMode.value ? "#333" : "#fff",
    },
    x: {
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
        let snamn = dataPoint.snamn;
        if (!snamn) {
          snamn = "Saknar svenskt namn";
        } else {
          snamn = capitalizeFirstLetter(snamn);
        }
        const taxon = dataPoint.x;
        return `${snamn} (${taxon})`;
      },
    },
  },
});

const chartSeries = ref([]);

// Variables to hold the number of bars in each group
let numberOfGrayBars = 0;
let numberOfPurpleBars = 0;

const generateColors = (start, end, steps) => {
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
};

const fetchChartData = async () => {
  // Construct the filename based on props
  const filename = `data-${props.geography}-${props.forestType}-${props.standAge}-${props.vegetationType}.json`;

  try {
    // Fetch data från den lokala JSON-filen
    const response = await fetch(`/edna/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    const newData = await response.json();

    // Kontrollera om data finns
    if (newData && newData.length > 0) {
      data.value = newData;
      totalSum.value = data.value.reduce(
        (acc, row) => acc + row.sample_plot_count,
        0
      );
      data.value.sort((a, b) => b.sample_plot_count - a.sample_plot_count);

      const newCategories = data.value.map((row) => row.taxon);

      const currentAnnotationsPoints = data.value.map((row) => ({
        x: row.taxon,
        y: row.sample_plot_count,
        marker: {
          size: 10,
          fillColor: "transparent",
          strokeWidth: 0,
          shape: "circle",
        },
        image: {
          path: getIconPath(row["Svamp-grupp-släkte"]), // Använd rätt egenskapsnyckel
          offsetY: -15,
          width: 18,
          height: 18,
        },
      }));

      const newAnnotationsPoints = data.value
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

      const giftAnnotationsPoints = data.value
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

      const redAnnotationsPoints = data.value
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
            offsetY: -40, // Justera vid behov
            width: 24,
            height: 24,
          },
        }));

      const annotationsPoints = [
        ...redAnnotationsPoints,
        ...currentAnnotationsPoints,
        ...newAnnotationsPoints,
        ...giftAnnotationsPoints,
      ];

      // Kartlägg taxon till svenska namn
      const taxonToSnamnMap = new Map();
      data.value.forEach((row) => {
        taxonToSnamnMap.set(
          row.taxon,
          row.snamn ? capitalizeFirstLetter(row.snamn) : "Svenskt namn saknas"
        );
      });

      // **Ny Logik Börjar Här**
      // Beräkna antalet grå staplar baserat på 20% av det totala antalet arter
      const totalSpecies = data.value.length;
      numberOfGrayBars = Math.floor(totalSpecies * 0.1); // Använd Math.ceil(totalSpecies * 0.2) om du föredrar avrundning uppåt
      numberOfPurpleBars = totalSpecies - numberOfGrayBars;

      // Generera färger för varje grupp
      const grayColors = generateColors(
        [82, 82, 82], // Startfärg (mörkgrå)
        [212, 212, 212], // Slutfärg (ljusgrå)
        numberOfGrayBars
      );

      const rainbowColors = generateRainbowColors(numberOfPurpleBars);

      const individualBarColors = [...grayColors, ...rainbowColors];

      // Tilldela färger till diagramdata
      chartSeries.value = [
        {
          name: "",
          data: data.value.map((row, index) => ({
            x: row.taxon,
            y: row.sample_plot_count,
            fillColor: individualBarColors[index],
            color: individualBarColors[index],
            snamn: row.snamn,
          })),
        },
      ];

      // Uppdatera chartOptions med y-axelns titel och x-axelns etiketter
      chartOptions.value = {
        ...chartOptions.value,
        yaxis: {
          title: {
            text: `Antal skogar där arten påträffats`,
          },
        },
        xaxis: {
          ...chartOptions.value.xaxis,
          categories: newCategories,
          labels: {
            formatter: function (val) {
              return taxonToSnamnMap.get(val) || val;
            },
          },
        },
        annotations: { points: annotationsPoints },
      };

      // **Uppdatera Tooltipens Y-Formatteringsfunktion**
      chartOptions.value.tooltip.y.formatter = function (val) {
        return `Påträffad i ${val} av ${sampleEnvCount.value} skogar`;
      };

      // Uppdatera procentsatser och antal
      updateCountsAndPercentages();
      // **Ny Logik Slutar Här**
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function updateCountsAndPercentages() {
  // Baserat på antalet arter, inte den kumulativa summan
  topPercentage.value = ((numberOfGrayBars / data.value.length) * 100).toFixed(
    0
  );
  remainingPercentage.value = (
    (numberOfPurpleBars / data.value.length) *
    100
  ).toFixed(0);
  topCount.value = numberOfGrayBars;
  remainingCount.value = numberOfPurpleBars;

  updateParentWithInfo();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

chartOptions.value.tooltip = {
  marker: {
    show: false,
  },
  intersect: false,
  shared: true,
  followCursor: true,
  y: {
    formatter: function (val) {
      return val;
    },
  },
  theme: isDarkMode.value ? "dark" : "light",
  style: {
    backgroundColor: isDarkMode.value ? "#333" : "#fff",
  },
  x: {
    formatter: function (val, { seriesIndex, dataPointIndex, w }) {
      const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
      let snamn = dataPoint.snamn;
      if (!snamn) {
        snamn = "Saknar svenskt namn";
      } else {
        snamn = capitalizeFirstLetter(snamn);
      }
      const taxon = dataPoint.x;
      return `${snamn} (${taxon})`;
    },
  },
};

const updateParentWithInfo = () => {
  emits("updateInfo", {
    topCount: topCount.value,
    remainingCount: remainingCount.value,
    topPercentage: topPercentage.value,
    remainingPercentage: remainingPercentage.value,
  });
};

// Watch for changes in props and fetch data
watch(
  () => [
    props.geography,
    props.forestType,
    props.standAge,
    props.vegetationType,
    route.path,
  ],
  async () => {
    await fetchChartData();
    updateParentWithInfo();
  },
  { immediate: true }
);

onMounted(async () => {
  await fetchChartData();
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
    chartOptions.value = { ...chartOptions.value };
  }
  updateParentWithInfo();
});

// Helper function to generate rainbow colors
function generateRainbowColors(steps) {
  const colors = [];
  const saturation = 70; // Justera för livlighet
  const lightness = 50; // Justera för ljusstyrka

  for (let i = 0; i < steps; i++) {
    // Beräkna hue från 30° (orange) till 330° (röd)
    const hue = 45 + (300 / (steps - 1 || 1)) * i;
    colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}
</script>

<style scoped>
/* För Webkit-baserade webbläsare som Chrome, Safari */
#scrollbar::-webkit-scrollbar {
  height: 8px; /* Bredd på hela scrollbar */
}

#scrollbar::-webkit-scrollbar-track {
  display: none; /* Färg på spårområdet */
}

#scrollbar::-webkit-scrollbar-thumb {
  display: block;
  background-color: #88888833; /* Färg på scrollthumb */
  border-radius: 20px; /* Rundning på scrollthumb */
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* För Firefox */
#scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out; /* Övergångseffekt för Firefox */
}
/* 
#scrollbar:hover {
  scrollbar-color: #888 #f2f3f5;
} */
</style>
