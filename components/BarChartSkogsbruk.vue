<template>
  <div>
    <client-only>
      <component
        :is="VueApexCharts"
        height="250px"
        width="100%"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      />
    </client-only>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, shallowRef } from "vue";
import data from "~/assets/data/svampgrupper.json";

// **Define Props:**
const props = defineProps({
  currentFramework: {
    type: Object,
    required: true,
  },
  currentFramework2: {
    type: Object,
    required: false,
    default: null,
  },
  currentStartskog: {
    type: Object,
    required: true,
  },
  timeLabel: {
    type: String,
    required: true,
  },
  timeLabel2: {
    type: String,
    required: false,
    default: null,
  },
  currentTimeLabel: {
    type: String,
    required: false,
    default: "",
  },
  chartWidth: {
    type: String,
    default: "100%",
  },
  isCompareMode: {
    type: Boolean,
    default: false,
  },
  isFrameworkCompareMode: {
    type: Boolean,
    default: false,
  },
});

// **Categories and Colors:**
const categories = [
  "Skinnsvampar",
  "Spindelskivlingar",
  "Kremlor och riskor",

  "Övriga svampar",
];

const colors = [
  "#334155", // Skinnsvampar
  "#000000", // Spindelskivlingar
  "#ffffff", // Kremlor och riskor

  "#94a3b8", // Övriga svampar
];

const chartSeries = ref([]);

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 500,
    },
    dropShadow: {
      enabled: true,
      top: -0,
      blur: 3,
      opacity: 0.1,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
      // borderRadius: 4,
    },
  },
  stroke: {
    width: [1, 1, 4],
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: categories,
    type: "category",
    labels: {
      show: false,
      style: {
        fontSize: "12px",
        colors: "#6b7280",
      },
    },
  },
  yaxis: {
    show: true,
    min: 0,
    max: 75,
    tickAmount: 3,
    labels: {
      formatter: function (value) {
        return value.toFixed(0) + "%";
      },
      style: {
        fontSize: "12px",
        colors: "#6b7280",
      },
    },
  },
  grid: {
    borderColor: "#e5e7eb",
    strokeDashArray: 3,
  },
  fill: {
    opacity: 1,
    type: "solid", // Default fill type
  },
  legend: {
    show: true,
    position: "bottom",
    customLegendItems: categories, // the 4 category labels
    markers: {
      fillColors: colors, // matching 4 colors
      radius: 12,
      strokeWidth: 1,
    },
  },
  tooltip: {
    marker: { show: false },
    shared: true,
    intersect: false,
    x: {
      show: true,
    },
    y: {
      formatter: function (value) {
        return value.toFixed(1) + "%";
      },
    },
  },
});

const VueApexCharts = shallowRef(null);

// **Update Chart Data Function:**
const updateChartData = () => {
  let seriesData = [];

  if (props.isFrameworkCompareMode && props.currentFramework2) {
    // **Framework Comparison Mode**

    // Data for Framework 1
    const filteredData1 = data.filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );

    const seriesData1 = categories.map((category) => {
      const item = filteredData1.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    // Data for Framework 2
    const filteredData2 = data.filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework2.label) &&
        item["ålder"] === props.timeLabel
    );

    const seriesData2 = categories.map((category) => {
      const item = filteredData2.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    seriesData = [
      {
        name: props.currentFramework.label,
        data: seriesData1,
      },
      {
        name: props.currentFramework2.label,
        data: seriesData2,
      },
    ];
  } else if (props.isCompareMode && props.timeLabel2) {
    // **Before and After Comparison Mode**

    // Data for Time 1 (Before)
    const filteredData1 = data.filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel2
    );

    const seriesData1 = categories.map((category) => {
      const item = filteredData1.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    // Data for Time 2 (After)
    const filteredData2 = data.filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );

    const seriesData2 = categories.map((category) => {
      const item = filteredData2.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    seriesData = [
      {
        name: "Innan avverkning",
        data: seriesData1,
      },
      {
        name: props.currentTimeLabel,
        data: seriesData2,
      },
    ];
  } else {
    // **Normal Mode**

    const filteredData = data.filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );

    const seriesDataSingle = categories.map((category, index) => {
      const item = filteredData.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    seriesData = [
      {
        name: "Svampar",
        data: seriesDataSingle,
      },
    ];

    // Update chart options for normal mode
    chartOptions.value.plotOptions.bar.distributed = true;
    chartOptions.value.fill = {
      type: "solid",
    };
    chartOptions.value.colors = colors;
  }

  // **Update chart series data:**
  chartSeries.value = seriesData;
};

watch(
  () => [
    props.currentFramework,
    props.currentFramework2,
    props.currentStartskog,
    props.timeLabel,
    props.timeLabel2,
    props.currentTimeLabel,
    props.isCompareMode,
    props.isFrameworkCompareMode,
  ],
  () => {
    updateChartData();
  },
  { immediate: true }
);

onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
  }
  updateChartData();
});

// **Helper functions:**
function mapFrameworkLabelToDataValue(label) {
  const mapping = {
    Trakthygge: "trakthygge",
    "Ingen åtgärd": "inga åtgärder",
    Blädning: "blädning",
    Luckhuggning: "luckhuggning",
    "Överhållen skärm": "skärmträd",
  };
  return mapping[label] || label.toLowerCase();
}

function mapStartskogValueToDataValue(value) {
  const mapping = {
    naturskog: "inte kalavverkad",
    produktionsskog_: "kalavverkad",
  };
  return mapping[value] || value;
}
</script>

<style scoped>
/* Your styles here */
</style>
