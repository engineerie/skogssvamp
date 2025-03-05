<template>
  <div
    v-if="layoutMode === 'slider'"
    ref="container"
    class="relative w-full h-full overflow-hidden select-none"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <!-- "After" slot: full background -->
    <div class="absolute inset-0">
      <slot name="second" />
    </div>
    <!-- "Before" slot: rendered with a clip-path -->
    <div
      class="absolute inset-0 overflow-hidden"
      :style="{
        clipPath: 'inset(0 calc(100% - ' + sliderPercent * 100 + '%) 0 0)',
      }"
    >
      <slot name="first" />
    </div>
    <!-- Draggable slider handle -->
    <div
      class="absolute top-0 flex items-center justify-center h-full w-10 cursor-ew-resize"
      :style="{
        left: sliderPercent * 100 + '%',
        transform: 'translateX(-50%)',
      }"
    >
      <div
        class="h-full w-1 bg-white bg-opacity-50 border border-gray-300"
      ></div>
    </div>
  </div>
  <div
    v-else-if="layoutMode === 'side-by-side'"
    class="flex w-full h-full gap-1"
  >
    <!-- In side-by-side mode, the images are simply rendered in two equal containers -->
    <div class="w-1/2 h-full">
      <slot name="first" />
    </div>
    <div class="w-1/2 h-full">
      <slot name="second" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const container = ref(null);
const sliderPercent = ref(0.5); // Start at 50%
let dragging = false;

function updateSliderPercent(e) {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let percent = (clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(percent, 1)); // Clamp between 0 and 1.
  sliderPercent.value = percent;
}

function startDrag(e) {
  // Only allow dragging in slider mode
  if (layoutMode.value !== "slider") return;
  dragging = true;
  updateSliderPercent(e);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("touchend", stopDrag);
}

function onDrag(e) {
  if (!dragging) return;
  updateSliderPercent(e);
}

function stopDrag() {
  dragging = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
}

// New: Reactive layout mode and functions to set it.
const layoutMode = ref("slider"); // "slider" or "side-by-side"
function toggleLayoutMode() {
  layoutMode.value = layoutMode.value === "slider" ? "side-by-side" : "slider";
}
function setLayoutMode(newMode) {
  console.log("setLayoutMode called with:", newMode);
  if (newMode === "slider" || newMode === "side-by-side") {
    layoutMode.value = newMode;
  }
}

// Expose both toggle and set functions.
defineExpose({
  toggleLayoutMode,
  setLayoutMode,
});

onMounted(() => {
  sliderPercent.value = 0.5;
});
</script>
