<template>
  <div>
    <client-only>
      <component
        :is="VueApexCharts"
        :height="'200px'"
        :width="chartWidth"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      />
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, shallowRef } from "vue";
import data from "~/assets/data/svampgrupper.json";

// ***** Define Props *****
const props = defineProps({
  currentFramework: { type: Object, required: true },
  currentFramework2: { type: Object, default: null },
  currentStartskog: { type: Object, required: true }, // ideally passed as a ref
  timeLabel: { type: String, required: true },
  timeLabel2: { type: String, default: null },
  currentTimeLabel: { type: String, default: "" },
  chartWidth: { type: String, default: "100%" },
  isCompareMode: { type: Boolean, default: false },
  isFrameworkCompareMode: { type: Boolean, default: false },
  visibleGroups: { type: Array, default: () => [] },
  yaxisMax: { type: Number, default: 75 },
  decimals: { type: Number, default: 2 },
});

// ***** Categories & Colors *****
const defaultCategories = [
  "Skinnsvampar",
  "Spindelskivlingar",
  "Kremlor och riskor",
  "Övriga svampar",
  "Rödlistade + signalarter",
  "Matsvamp",
];

// Use passed visibleGroups if available; otherwise, use the default
const categories = computed(() =>
  props.visibleGroups.length ? props.visibleGroups : defaultCategories
);

// Define a color mapping for each group
const colorMap = {
  Skinnsvampar: "#334155",
  Spindelskivlingar: "#000000",
  "Kremlor och riskor": "#ffffff",
  "Övriga svampar": "#94a3b8",
  "Rödlistade + signalarter": "#b91c1c",
  Matsvamp: "#eab308",
};

const computedColors = computed(() =>
  categories.value.map((cat) => colorMap[cat] || "#000000")
);

// ***** Chart Options *****
const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 500,
      dynamicAnimation: { enabled: true, speed: 500 },
    },
    dropShadow: { enabled: true, top: 0, blur: 3, opacity: 0.1 },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
      columnWidth: "12px",
      dataLabels: {
        position: "top",
      },
    },
  },
  stroke: { width: [1, 1, 4] },
  dataLabels: {
    enabled: true,
    offsetY: -10, // moves the label above the bar; adjust this value as needed
    style: {
      fontSize: "7px",
      colors: ["#737373"],
    },
    formatter: (value) => value.toFixed(props.decimals),
  },
  xaxis: {
    categories: categories.value,
    type: "category",
    labels: {
      show: false,
      style: { fontSize: "12px", colors: "#6b7280" },
    },
  },
  yaxis: {
    show: true,
    min: 0,
    max: props.yaxisMax,
    tickAmount: 3,
    labels: {
      formatter: (value) => value.toFixed(props.decimals) + "%",
      style: { fontSize: "12px", colors: "#6b7280" },
    },
  },
  grid: { borderColor: "#e5e7eb", strokeDashArray: 3 },
  fill: { opacity: 1, type: "solid" },
  legend: {
    show: true,
    position: "bottom",
    customLegendItems: categories.value,
    markers: { fillColors: computedColors.value, radius: 12, strokeWidth: 1 },
  },
  tooltip: {
    marker: { show: true },
    shared: true,
    intersect: false,
    x: { show: true },
    y: { formatter: (value) => value.toFixed(props.decimals) + "%" },
  },
  colors: computedColors.value,
});
// (Ensure the colors option is updated)
chartOptions.value.colors = computedColors.value;

// ***** Chart Series *****
const chartSeries = ref([]);

// ***** Helper Functions *****
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

// ***** Update Chart Data *****
const updateChartData = () => {
  let seriesData = [];
  // If currentStartskog was passed as a ref, use its value; otherwise use directly.
  const startskogValue =
    props.currentStartskog.value !== undefined
      ? props.currentStartskog.value
      : props.currentStartskog;

  if (props.isFrameworkCompareMode && props.currentFramework2) {
    // Framework Comparison Mode
    const filteredData1 = data.filter(
      (item) =>
        item.skogshistorik === mapStartskogValueToDataValue(startskogValue) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );
    const seriesData1 = categories.value.map((category) => {
      const item = filteredData1.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    const filteredData2 = data.filter(
      (item) =>
        item.skogshistorik === mapStartskogValueToDataValue(startskogValue) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework2.label) &&
        item["ålder"] === props.timeLabel
    );
    const seriesData2 = categories.value.map((category) => {
      const item = filteredData2.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    seriesData = [
      { name: props.currentFramework.label, data: seriesData1 },
      { name: props.currentFramework2.label, data: seriesData2 },
    ];
  } else if (props.isCompareMode && props.timeLabel2) {
    // Before/After Compare Mode
    const filteredData1 = data.filter(
      (item) =>
        item.skogshistorik === mapStartskogValueToDataValue(startskogValue) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel2
    );
    const seriesData1 = categories.value.map((category) => {
      const item = filteredData1.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    const filteredData2 = data.filter(
      (item) =>
        item.skogshistorik === mapStartskogValueToDataValue(startskogValue) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );
    const seriesData2 = categories.value.map((category) => {
      const item = filteredData2.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });

    seriesData = [
      { name: "Innan avverkning", data: seriesData1 },
      { name: props.currentTimeLabel, data: seriesData2 },
    ];
  } else {
    // Normal Mode
    const filteredData = data.filter(
      (item) =>
        item.skogshistorik === mapStartskogValueToDataValue(startskogValue) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework.label) &&
        item["ålder"] === props.timeLabel
    );
    const seriesDataSingle = categories.value.map((category) => {
      const item = filteredData.find((d) => d["Artkategori"] === category);
      return item ? parseFloat(item.klassning) : 0;
    });
    seriesData = [{ name: "Svampar", data: seriesDataSingle }];

    // For normal mode, update options as needed:
    chartOptions.value.plotOptions.bar.distributed = true;
    chartOptions.value.fill = { type: "solid" };
    chartOptions.value.colors = computedColors.value;
  }
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
    props.visibleGroups,
    props.yaxisMax,
  ],
  updateChartData,
  { immediate: true }
);

const VueApexCharts = shallowRef(null);
onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
  }
  updateChartData();
});
</script>

<style scoped>
/* Add any desired styles here */
</style>
