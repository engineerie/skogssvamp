<!-- AnnotationMarker.vue -->
<template>
  <div class="flex items-center gap-2">
    <div
      class="size-5 rounded-full bg-green-500 ring ring-white/90 transition-all hover:size-7 cursor-pointer"
      @click="handleClick"
    >
      <!-- For debugging we display the annotation title.
         You can later remove or change this as needed -->
    </div>
    <div
      class="text-sm p-1 rounded-md border border-neutral-200 bg-white pointer-events-none cursor-default text-neutral-700"
    >
      {{ annotation.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnotationMarker",
  props: {
    annotation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick(e) {
      // We emit a click event so that the parent (or our MouseTracker) can react.
      this.$emit("marker-click", this.annotation);
    },
  },
};
</script>

<style scoped>
.annotation-marker {
  width: 20px;
  height: 20px;
  background: green;
  border: 2px solid darkgreen;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
  cursor: pointer;
  /* Adjust additional styling as needed */
}
</style>
