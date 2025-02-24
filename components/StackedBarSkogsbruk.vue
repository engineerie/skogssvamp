<template>
  <!-- Main container is relative so we can overlay elements -->
  <div class="w-3 rounded-full overflow-hidden h-[650px] relative">
    <!-- Main stacked bar -->
    <div class="h-full flex flex-col">
      <div
        v-for="(height, index) in segmentHeights"
        :key="index"
        class="w-full segment"
        :style="{ backgroundColor: colors[index], height: height + '%' }"
        :title="categories[index] + ': ' + segmentValues[index]"
      ></div>
    </div>

    <!-- Overlay bar for edible and redlisted -->
    <div class="absolute inset-0 flex flex-col justify-end pointer-events-none">
      <!-- Redlisted overlay (red) -->
      <div
        class="w-full segment-overlay transition-all duration-1000"
        :style="overlayRedlistedStyle"
        :title="
          'Redlisted + signalarter: ' + overlayRedlistedValue.toFixed(2) + '%'
        "
      ></div>
      <!-- Edible overlay (yellow) -->
      <div
        class="w-full segment-overlay transition-all duration-1000"
        :style="overlayEdibleStyle"
        :title="'Edible (Matsvamp): ' + overlayEdibleValue.toFixed(2) + '%'"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import data from "~/assets/data/svampgrupper.json";

// Props as before…
const props = defineProps({
  currentFramework: { type: Object, required: true },
  currentStartskog: { type: Object, required: true },
  timeLabel: { type: String, required: true },
  isCompareMode: { type: Boolean, default: false },
  isFrameworkCompareMode: { type: Boolean, default: false },
  overrideFramework: { type: Object, default: null },
  overrideTimeLabel: { type: String, default: null },
});

// Main categories and colors for the main bar
const categories = [
  "Skinnsvampar",
  "Spindelskivlingar",
  "Kremlor och riskor",
  "Övriga svampar",
];
const colors = ["#334155", "#000000", "#ffffff", "#94a3b8"];

// Overlay colors
const edibleColor = "#FCD34D"; // yellow for edible (Matsvamp)
const redlistedColor = "#EF4444"; // red for redlisted ("Rödlistade + signalarter")

// Effective values (using override if provided)
const effectiveFramework = computed(
  () => props.overrideFramework || props.currentFramework
);
const effectiveTimeLabel = computed(
  () => props.overrideTimeLabel || props.timeLabel
);

// Mapping functions…
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

// Filter data (used for both main bar and overlay)
const filteredData = computed(() => {
  return data.filter(
    (item) =>
      item.skogshistorik ===
        mapStartskogValueToDataValue(props.currentStartskog.value) &&
      item["skogsskötsel"] ===
        mapFrameworkLabelToDataValue(effectiveFramework.value.label) &&
      item["ålder"] === effectiveTimeLabel.value
  );
});

// Main bar calculations
const segmentValues = computed(() =>
  categories.map((category) => {
    const item = filteredData.value.find((d) => d["Artkategori"] === category);
    return item ? parseFloat(item.klassning) : 0;
  })
);
const totalValue = computed(() =>
  segmentValues.value.reduce((sum, val) => sum + val, 0)
);
const segmentHeights = computed(() => {
  if (totalValue.value > 0) {
    return segmentValues.value.map((val) => (val / totalValue.value) * 100);
  } else {
    return [25, 25, 25, 25];
  }
});

// --- Overlay Calculations ---
// Instead of using keys "mat" or "röd", we now use the Artkategori
const overlayEdibleValue = computed(() =>
  filteredData.value
    .filter((item) => item.Artkategori === "Matsvamp")
    .reduce((acc, item) => acc + (parseFloat(item.klassning) || 0), 0)
);
const overlayRedlistedValue = computed(() =>
  filteredData.value
    .filter((item) => item.Artkategori === "Rödlistade + signalarter")
    .reduce((acc, item) => acc + (parseFloat(item.klassning) || 0), 0)
);
const overlayTotal = computed(
  () => overlayEdibleValue.value + overlayRedlistedValue.value
);

const overlayEdibleHeight = computed(() => overlayEdibleValue.value);
const overlayRedlistedHeight = computed(() => overlayRedlistedValue.value);

const overlayEdibleStyle = computed(() => ({
  backgroundColor: edibleColor,
  height: overlayEdibleHeight.value + "%",
  minHeight: overlayEdibleHeight.value > 0 ? "1px" : "0",
}));

const overlayRedlistedStyle = computed(() => ({
  backgroundColor: redlistedColor,
  height: overlayRedlistedHeight.value + "%",
  minHeight: overlayRedlistedHeight.value > 0 ? "1px" : "0",
}));
</script>

<style scoped>
.segment {
  transition: height 0.5s ease;
}
.segment-overlay {
  transition: all 0.5s ease;
}
</style>
