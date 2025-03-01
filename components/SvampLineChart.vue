<template>
  <div>
    <!-- Wrap in client-only if using SSR -->
    <client-only>
      <component
        :is="VueApexCharts"
        type="line"
        height="200px"
        width="100%"
        :options="chartOptions"
        :series="finalSeries"
      />
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, shallowRef } from "vue";
import data from "~/assets/data/svampgrupper.json";

// Define props
const props = defineProps({
  currentFramework: { type: Object, required: true },
  currentStartskog: { type: Object, required: true },
  // Optional second framework for comparison mode:
  currentFramework2: { type: Object, default: null },
  // New prop: list of groups to display (if empty, show all)
  visibleGroups: { type: Array, default: () => [] },
  decimals: { type: Number, default: 2 },
});

// Colors for the lines (you might already have this defined)
const colors = {
  Skinnsvampar: "#334155",
  Spindelskivlingar: "#000000",
  "Kremlor och riskor": "#ffffff",
  Matsvamp: "#eab308",
  "Övriga svampar": "#94a3b8",
  "Rödlistade + signalarter": "#b91c1c",
};

// Fixed time categories for the x-axis
const timeOrder = ["innan", "efter", "20 år", "50 år", "80 år"];

// Helper mapping functions remain the same
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

// ------------------ Primary Framework Data ------------------

// Filter data for primary framework
const filteredData = computed(() => {
  return data.filter(
    (item) =>
      item.skogshistorik ===
        mapStartskogValueToDataValue(props.currentStartskog.value) &&
      item["skogsskötsel"] ===
        mapFrameworkLabelToDataValue(props.currentFramework.label)
  );
});

// Calculate totals per time category (for percentage calculations)
const totalsPerTime = computed(() => {
  const totals = {};
  timeOrder.forEach((time) => {
    totals[time] = filteredData.value
      .filter((item) => item.ålder === time)
      .reduce((sum, item) => sum + parseFloat(item.klassning), 0);
  });
  return totals;
});

// Group primary data by mushroom group
const groupedData = computed(() => {
  const groups = {};
  filteredData.value.forEach((item) => {
    const group = item.Artkategori;
    // If visibleGroups is provided and not empty, skip groups not included.
    if (props.visibleGroups.length && !props.visibleGroups.includes(group))
      return;
    if (!groups[group]) groups[group] = {};
    groups[group][item.ålder] = parseFloat(item.klassning);
  });
  return groups;
});

// ------------------ Secondary Framework Data ------------------

const groupedData2 = computed(() => {
  if (!props.currentFramework2) return {};
  const groups = {};
  data
    .filter(
      (item) =>
        item.skogshistorik ===
          mapStartskogValueToDataValue(props.currentStartskog.value) &&
        item["skogsskötsel"] ===
          mapFrameworkLabelToDataValue(props.currentFramework2.label)
    )
    .forEach((item) => {
      const group = item.Artkategori;
      if (props.visibleGroups.length && !props.visibleGroups.includes(group))
        return;
      if (!groups[group]) groups[group] = {};
      groups[group][item.ålder] = parseFloat(item.klassning);
    });
  return groups;
});

const secondarySeriesCount = computed(
  () => Object.keys(groupedData2.value).length
);

// ------------------ Final Series ------------------

const finalSeries = computed(() => {
  const seriesArray = [];
  const totals = totalsPerTime.value;

  // Primary series – one per group in primary framework:
  for (const group in groupedData.value) {
    const dataPoints = timeOrder.map((time) => {
      const groupValue = groupedData.value[group][time] || 0;
      const total = totals[time] || 0;
      return total > 0 ? (groupValue / total) * 100 : 0;
    });
    seriesArray.push({
      name: `${group} (${props.currentFramework.label})`,
      data: dataPoints,
      color: colors[group] || undefined,
      type: "line", // rendered as a line
    });
  }

  // Secondary series – if provided:
  if (props.currentFramework2) {
    const totals2 = {};
    timeOrder.forEach((time) => {
      totals2[time] = data
        .filter(
          (item) =>
            item.skogshistorik ===
              mapStartskogValueToDataValue(props.currentStartskog.value) &&
            item["skogsskötsel"] ===
              mapFrameworkLabelToDataValue(props.currentFramework2.label) &&
            item.ålder === time
        )
        .reduce((sum, item) => sum + parseFloat(item.klassning), 0);
    });
    for (const group in groupedData2.value) {
      const dataPoints = timeOrder.map((time) => {
        const groupValue = groupedData2.value[group][time] || 0;
        const total = totals2[time] || 0;
        return total > 0 ? (groupValue / total) * 100 : 0;
      });
      seriesArray.push({
        name: `${group} (${props.currentFramework2.label})`,
        data: dataPoints,
        color: colors[group] || undefined,
        type: "line",
      });
    }
  }
  return seriesArray;
});

// ------------------ Dash Array ------------------

// Compute a dash array for the stroke; in compare mode, primary series use solid lines (dash=0)
// and secondary series use dashed lines (dash=6, for example).
const computedDashArray = computed(() => {
  if (props.currentFramework2) {
    const primaryCount = Object.keys(groupedData.value).length;
    // Build an array with one dash value per series in finalSeries:
    return finalSeries.value.map((_, index) => (index < primaryCount ? 0 : 6));
  }
  return 0;
});

// ------------------ Fill Opacity ------------------

// (You might no longer need separate fill opacity in a pure line chart, but we leave this in case you want to adjust line opacity.)
const computedFillOpacity = computed(() => {
  if (!props.currentFramework2) {
    return 1; // If no second framework, use full opacity.
  }
  const primaryCount = Object.keys(groupedData.value).length;
  const secondaryCount = secondarySeriesCount.value;
  const opacities = [];
  for (let i = 0; i < primaryCount; i++) {
    opacities.push(1); // Framework 1: full opacity.
  }
  for (let i = 0; i < secondaryCount; i++) {
    opacities.push(1); // Framework 2: you can adjust this if needed.
  }
  return opacities;
});

// ------------------ Chart Options ------------------

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    id: "svamp-line-chart",
    type: "line",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 500,
      dynamicAnimation: {
        enabled: true,
        speed: 500,
      },
    },
    dropShadow: {
      enabled: true,
      top: 0,
      blur: 1,
      opacity: 0.3,
    },
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 3,
    // Apply per-series dash array if in framework comparison mode.
    dashArray: props.currentFramework2 ? computedDashArray.value : 0,
  },
  xaxis: {
    type: "category",
    categories: timeOrder,
    title: { show: false },
  },
  yaxis: {
    min: 0,
    tickAmount: 2,
    labels: { formatter: (value) => value.toFixed(props.decimals) + "%" },
    title: { show: false },
  },
  tooltip: {
    followCursor: true,
    shared: true,
    intersect: false,
    y: { formatter: (value) => value.toFixed(props.decimals) + "%" },
  },
  legend: { position: "top", show: false },
  fill: {
    type: "solid",
    opacity: props.currentFramework2 ? computedFillOpacity.value : 1,
  },
}));

// ------------------ VueApexCharts Dynamic Import ------------------
const VueApexCharts = shallowRef(null);
onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
  }
});

// (Optional) Watch props to trigger reactive updates (computed properties update automatically)
watch(
  () => [
    props.currentFramework,
    props.currentStartskog,
    props.currentFramework2,
  ],
  () => {
    // finalSeries and chartOptions update automatically.
  }
);
</script>

<style scoped>
/* Add any desired styling here */
</style>
