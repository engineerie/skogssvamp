<template>
  <div
    ref="container"
    class="relative w-full h-full overflow-hidden select-none"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <!-- "After" slot: full background -->
    <div class="absolute inset-0">
      <slot name="second" />
    </div>
    <!-- "Before" slot: fully rendered but masked with clip-path -->
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
        class="h-full w-[1px] bg-white bg-opacity-50 border border-gray-300"
      ></div>
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

onMounted(() => {
  sliderPercent.value = 0.5;
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
