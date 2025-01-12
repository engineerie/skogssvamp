<template>
  <div class="relative px-6 py-6">
    <!-- Vertical line background -->
    <div
      class="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"
    ></div>

    <!-- Timeline Steps -->
    <div
      v-for="(step, index) in relevantSteps"
      :key="index"
      class="relative pl-4 mb-8 last:mb-0"
    >
      <!-- The Dot -->
      <div
        class="absolute left-0 w-3 h-3 rounded-full bg-primary-500 shadow -translate-x-1/2"
        :style="{ top: '6px' }"
      ></div>

      <!-- The Card/Content -->
      <div class="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          color="primary"
          variant="outline"
          class="mb-2 mr-2"
        >
          {{ step.timeDisplay }}
        </UBadge>
        <div class="flex gap-2 mb-2 items-baseline">
          <div class="size-5">
            <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
          </div>
          <BaseHeading size="sm" weight="thin" class="text-neutral-500">
            {{ step.skog }}
          </BaseHeading>
        </div>
        <div class="flex gap-2 mb-2 items-baseline">
          <div class="size-5">
            <Icon
              name="fluent:shape-organic-24-filled"
              class="w-5 h-5 icon text-primary-500"
            />
          </div>
          <BaseHeading size="sm" weight="thin" class="text-neutral-500">
            {{ step.svamp }}
          </BaseHeading>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import timelineData from "/public/timeline.json";
// or wherever timeline.json is located

const props = defineProps({
  frameworkValue: { type: String, required: true },
  startskogValue: { type: String, required: true },
});

// We'll filter timelineData for all times matching these props
const relevantSteps = computed(() => {
  return timelineData
    .filter(
      (item) =>
        item.atgard === props.frameworkValue &&
        item.startskog === props.startskogValue
    )
    .map((step) => {
      // If timeline.json uses fields like "tid" => "innan", "efter", etc.
      // We'll create a `timeDisplay` field for the heading in the timeline
      return {
        ...step,
        timeDisplay: mapTidToDisplay(step.tid),
        skog: step.skog,
        svamp: step.svamp,
      };
    });
});

// Example “tid” => “friendly label” mapping:
function mapTidToDisplay(tid) {
  switch (tid) {
    case "innan":
      return "Före avverkning";
    case "efter":
      return "Efter avverkning";
    case "20 år":
      return "20 år efter avverkning";
    case "50 år":
      return "50 år efter avverkning";
    case "80 år":
      return "80 år efter avverkning";
    default:
      return tid;
  }
}
</script>

<style scoped>
/* Example styling. Adjust as you like. */
</style>
