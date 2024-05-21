<template>
  <!-- Chart Section -->
  <div class="overflow-x-scroll" id="scrollbar">
    <div v-if="VueApexCharts && data" class="text-neutral-500">
      <VueApexCharts
        height="365px"
        width="100%"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
    <div v-else class="flex justify-center">
      <!-- Placeholder, styled with Tailwind CSS -->
      <BasePlaceload class="h-[300px] w-full m-2" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef } from "vue";

const isDarkMode = computed(() => {
  return document.documentElement.classList.contains("dark");
});

const getIconPath = (svampGrupp) => {
  const iconMapping = {
    hattsvamp: "/images/svampgrupp/hattsvamp.webp",
    kantarell: "/images/svampgrupp/kantarell.webp",
    sopp: "/images/svampgrupp/sopp.webp",
    taggsvamp: "/images/svampgrupp/taggsvamp.webp",
    fingersvamp: "/images/svampgrupp/fingersvamp.webp",
    tryffel: "/images/svampgrupp/tryffel.webp",
    skinnsvamp: "/images/svampgrupp/skinnsvamp.webp",
    skålsvamp: "/images/svampgrupp/skalsvamp.webp",
  };
  return iconMapping[svampGrupp] || "/images/svampgrupp/default-icon.png"; // Fallback to a default icon
};

const getStatusColor = (status) => {
  const colors = {
    NT: "#fdae6b", // Corresponding to bg-rose-400
    EN: "#fd8d3c", // bg-rose-600
    VU: "#f16913", // bg-rose-500
    CR: "#d94801", // bg-rose-800
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

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String,
});

console.log("Received props:", props);

const VueApexCharts = shallowRef(null);
const data = ref(null);
const totalSum = ref(0);

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false, // This line hides the toolbar
    },
    // offsetY: 10,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "80%",
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
    // reversed: true,
    title: {
      show: false,
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    show: false,
    // Other grid configurations
  },
});

const top4Percentage = ref(0);
const next10Percentage = ref(0);
const remainingPercentage = ref(0);
const top4Count = ref(0);
const next10Count = ref(0);
const remainingCount = ref(0);
const emits = defineEmits(["updateInfo"]);

const chartSeries = ref([]);

const generateColors = (start, end, steps) => {
  const stepR = (end[0] - start[0]) / (steps - 1);
  const stepG = (end[1] - start[1]) / (steps - 1);
  const stepB = (end[2] - start[2]) / (steps - 1);
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
    // Fetch data from the local JSON file
    const response = await fetch(`/edna/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch data from ${filename}`);
    const newData = await response.json();

    // Check if data is available
    if (newData && newData.length > 0) {
      data.value = newData;
      totalSum.value = data.value.reduce(
        (acc, row) => acc + row.total_presence,
        0
      );
      data.value.sort((a, b) => b.total_presence - a.total_presence);

      const newCategories = data.value.map((row) => row.taxon);

      const currentAnnotationsPoints = data.value.map((row) => ({
        x: row.taxon,
        y: row.total_presence,
        marker: {
          size: 10,
          fillColor: "transparent",
          strokeWidth: 0,
          shape: "circle",
        },
        image: {
          path: getIconPath(row["Svamp-grupp-släkte"]), // Use the correct property key
          offsetY: -15,
          width: 18,
          height: 18,
        },
      }));

      const newAnnotationsPoints = data.value
        .filter((row) => row.matsvamp === 1)
        .map((row) => ({
          x: row.taxon,
          y: row.total_presence,
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

      const redAnnotationsPoints = data.value
        .filter((row) => ["NT", "EN", "VU", "CR"].includes(row.RL2020kat))
        .map((row) => ({
          x: row.taxon,
          y: row.total_presence,
          marker: {
            size: 10,
            fillColor: "transparent",
            strokeWidth: 0,
            shape: "circle",
          },
          image: {
            path: generateStatusMarkerSVG(row.RL2020kat),
            offsetY: -40, // Adjust this as needed
            width: 24,
            height: 24,
          },
        }));

      const annotationsPoints = [
        ...redAnnotationsPoints,
        ...currentAnnotationsPoints,
        ...newAnnotationsPoints,
      ];

      // Map for taxon to snamn
      const taxonToSnamnMap = new Map();
      data.value.forEach((row) => {
        taxonToSnamnMap.set(
          row.taxon,
          row.snamn ? capitalizeFirstLetter(row.snamn) : "Svenskt namn saknas"
        );
      });

      // Update chart options
      chartOptions.value = {
        ...chartOptions.value,
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

      // Generate colors and update series data
      const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
      const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
      const otherColors = generateColors(
        [46, 16, 101],
        [232, 121, 249],
        Math.max(data.value.length - 14, 1)
      );
      const individualBarColors = [
        ...top4Colors,
        ...next10Colors,
        ...otherColors.slice(0, data.value.length - 14),
      ];

      chartSeries.value = [
        {
          name: "Förekomst",
          data: data.value.map((row, index) => ({
            x: row.taxon,
            y: row.total_presence,
            fillColor: individualBarColors[index],
            color: individualBarColors[index],
            snamn: row.snamn,
          })),
        },
      ];

      // Update percentages and counts
      updateCountsAndPercentages();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function updateCountsAndPercentages() {
  const top4Sum = data.value
    .slice(0, 4)
    .reduce((acc, row) => acc + row.total_presence, 0);
  const next10Sum = data.value
    .slice(4, 14)
    .reduce((acc, row) => acc + row.total_presence, 0);
  const remainingSum = totalSum.value - top4Sum - next10Sum;

  top4Percentage.value = ((top4Sum / totalSum.value) * 100).toFixed(0);
  next10Percentage.value = ((next10Sum / totalSum.value) * 100).toFixed(0);
  remainingPercentage.value = ((remainingSum / totalSum.value) * 100).toFixed(
    0
  );
  top4Count.value = 4;
  next10Count.value = 10;
  remainingCount.value = data.value.length - 14;

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
    top4Count: top4Count.value,
    next10Count: next10Count.value,
    remainingCount: remainingCount.value,
    top4Percentage: top4Percentage.value,
    next10Percentage: next10Percentage.value,
    remainingPercentage: remainingPercentage.value,
  });
};

onMounted(async () => {
  await fetchChartData();
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
    chartOptions.value = { ...chartOptions.value };
  }
  updateParentWithInfo();
});
</script>

<style scoped>
/* For Webkit browsers like Chrome, Safari */
#scrollbar::-webkit-scrollbar {
  height: 8px; /* width of the entire scrollbar */
}

#scrollbar::-webkit-scrollbar-track {
  display: none; /* color of the tracking area */
}

#scrollbar::-webkit-scrollbar-thumb {
  display: block;
  background-color: #88888833; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

#scrollbar:hover::-webkit-scrollbar-thumb {
  display: block;
}

/* For Firefox */
#scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f2f3f500;
  transition: scrollbar-color 1s ease-in-out; /* transition effect for Firefox */
}
/* 
#scrollbar:hover {
  scrollbar-color: #888 #f2f3f5;
} */
</style>
