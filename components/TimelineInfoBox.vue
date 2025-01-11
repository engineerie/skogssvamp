<template>
  <div
    class="relative backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-20 p-6 object-bottom"
  >
    <!-- CASE A: Single view -->
    <section v-if="!isCompare && !isFrameworkCompareMode">
      <div v-if="mainTimelineData">
        <!-- ICON + LABEL row -->
        <div class="flex items-center gap-2 mb-2">
          <Icon
            :name="currentFramework.icon"
            :class="[
              'icon size-5 transition-all duration-300',
              currentFramework.iconColor,
            ]"
          />
          <BaseHeading size="md" weight="thin" class="text-neutral-600">
            {{ currentFramework.label }}
          </BaseHeading>
        </div>

        <!-- Time Badge -->
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          color="primary"
          variant="outline"
          class="mb-2 mr-2"
        >
          {{ currentTimeLabel }}
        </UBadge>

        <UBadge
          v-if="currentStartskog.value === 'produktionsskog_'"
          :ui="{ rounded: 'rounded-full' }"
          color="violet"
          variant="outline"
          size="sm"
          class="opacity-80"
        >
          Tidigare kalavverkad
        </UBadge>

        <!-- Skog -->
        <div class="flex gap-2 mb-2">
          <div class="size-5">
            <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
          </div>
          <BaseHeading size="sm" weight="thin" class="text-neutral-600">
            {{ mainTimelineData.skog }}
          </BaseHeading>
        </div>

        <!-- Svamp -->
        <div class="flex gap-2 mb-2">
          <div class="size-5">
            <Icon
              name="fluent:shape-organic-24-filled"
              class="size-5 text-primary-500 icon"
            />
          </div>
          <BaseHeading size="sm" weight="thin" class="text-neutral-600">
            {{ mainTimelineData.svamp }}
          </BaseHeading>
        </div>
      </div>
      <div v-else>
        <p>Välj en tid och åtgärd för att se info</p>
      </div>
    </section>

    <!-- CASE B: Compare mode => Before/After -->
    <section v-else-if="isCompare">
      <!-- Before box -->
      <div class="mb-4 pb-4 border-b">
        <div v-if="beforeData">
          <!-- ICON + LABEL row -->
          <div class="flex items-center gap-2 mb-2">
            <Icon
              :name="currentFramework.icon"
              :class="[
                'icon size-5 transition-all duration-300',
                currentFramework.iconColor,
              ]"
            />
            <BaseHeading size="md" weight="thin" class="text-neutral-600">
              {{ currentFramework.label }}
            </BaseHeading>
          </div>

          <!-- “Före avverkning” badge -->
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="muted"
            variant="outline"
            class="mb-2 mr-2"
          >
            Före avverkning
          </UBadge>
          <UBadge
            v-if="currentStartskog.value === 'produktionsskog_'"
            :ui="{ rounded: 'rounded-full' }"
            color="violet"
            variant="outline"
            size="sm"
            class="opacity-80"
          >
            Tidigare kalavverkad
          </UBadge>

          <!-- Skog -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ beforeData.skog }}
            </BaseHeading>
          </div>

          <!-- Svamp -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon
                name="fluent:shape-organic-24-filled"
                class="size-5 text-primary-500 icon"
              />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ beforeData.svamp }}
            </BaseHeading>
          </div>
        </div>
        <div v-else>
          <p>Ingen data för 'innan'</p>
        </div>
      </div>

      <!-- After box -->
      <div>
        <div v-if="mainTimelineData">
          <div class="flex items-center gap-2 mb-2">
            <Icon
              :name="currentFramework.icon"
              :class="[
                'icon size-5 transition-all duration-300',
                currentFramework.iconColor,
              ]"
            />
            <BaseHeading size="md" weight="thin" class="text-neutral-600">
              {{ currentFramework.label }}
            </BaseHeading>
          </div>

          <!-- “Efter avverkning” or “20 år efter avverkning” etc. badge -->
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="primary"
            variant="outline"
            class="mb-2 mr-2"
          >
            {{ currentTimeLabel }}
          </UBadge>
          <UBadge
            v-if="currentStartskog.value === 'produktionsskog_'"
            :ui="{ rounded: 'rounded-full' }"
            color="violet"
            variant="outline"
            size="sm"
            class="opacity-80"
          >
            Tidigare kalavverkad
          </UBadge>

          <!-- Skog -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ mainTimelineData.skog }}
            </BaseHeading>
          </div>

          <!-- Svamp -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon
                name="fluent:shape-organic-24-filled"
                class="size-5 text-primary-500 icon"
              />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ mainTimelineData.svamp }}
            </BaseHeading>
          </div>
        </div>
        <div v-else>
          <p>Ingen data för {{ currentTime }}</p>
        </div>
      </div>
    </section>

    <!-- CASE C: Framework compare mode => two frameworks -->
    <section v-else-if="isFrameworkCompareMode">
      <!-- Box #1: currentFramework -->
      <div class="mb-4 pb-4 border-b">
        <div v-if="mainTimelineData">
          <div class="flex items-center gap-2 mb-2">
            <Icon
              :name="currentFramework.icon"
              :class="[
                'icon size-5 transition-all duration-300',
                currentFramework.iconColor,
              ]"
            />
            <BaseHeading size="md" weight="thin" class="text-neutral-600">
              {{ currentFramework.label }}
            </BaseHeading>
          </div>

          <!-- Time badge -->
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="primary"
            variant="outline"
            class="mb-2 mr-2"
          >
            {{ currentTimeLabel }}
          </UBadge>
          <UBadge
            v-if="currentStartskog.value === 'produktionsskog_'"
            :ui="{ rounded: 'rounded-full' }"
            color="violet"
            variant="outline"
            size="sm"
            class="opacity-80"
          >
            Tidigare kalavverkad
          </UBadge>

          <!-- Skog -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ mainTimelineData.skog }}
            </BaseHeading>
          </div>

          <!-- Svamp -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon
                name="fluent:shape-organic-24-filled"
                class="size-5 text-primary-500 icon"
              />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ mainTimelineData.svamp }}
            </BaseHeading>
          </div>
        </div>
        <div v-else>
          <p>Ingen data för {{ currentFramework.label }} / {{ currentTime }}</p>
        </div>
      </div>

      <!-- Box #2: compareFramework -->
      <div>
        <div v-if="compareTimelineData">
          <div class="flex items-center gap-2 mb-2">
            <Icon
              :name="compareFramework.icon"
              :class="[
                'icon size-5 transition-all duration-300',
                compareFramework.iconColor,
              ]"
            />
            <BaseHeading size="md" weight="thin" class="text-neutral-600">
              {{ compareFramework.label }}
            </BaseHeading>
          </div>

          <!-- Time badge (same time or compareTime if used) -->
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            color="primary"
            variant="outline"
            class="mb-2 mr-2"
          >
            {{ currentTimeLabel }}
          </UBadge>
          <UBadge
            v-if="currentStartskog.value === 'produktionsskog_'"
            :ui="{ rounded: 'rounded-full' }"
            color="violet"
            variant="outline"
            size="sm"
            class="opacity-80"
          >
            Tidigare kalavverkad
          </UBadge>

          <!-- Skog -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ compareTimelineData.skog }}
            </BaseHeading>
          </div>

          <!-- Svamp -->
          <div class="flex gap-2 mb-2">
            <div class="size-5">
              <Icon
                name="fluent:shape-organic-24-filled"
                class="size-5 text-primary-500 icon"
              />
            </div>
            <BaseHeading size="sm" weight="thin" class="text-neutral-600">
              {{ compareTimelineData.svamp }}
            </BaseHeading>
          </div>
        </div>
        <div v-else>
          <p>Ingen data för {{ compareFramework.label }} / {{ compareTime }}</p>
        </div>
      </div>
    </section>

    <!-- Otherwise -->
    <section v-else>
      <p>Okänt läge...</p>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import timelineData from "public/timeline.json";

// 1) Define Props
const props = defineProps({
  currentFramework: {
    type: Object, // has .value, .label, icon, iconColor, etc.
    required: false,
    default: null,
  },
  currentTime: { type: String, default: "" },
  currentStartskog: {
    type: Object, // has .value, .label, etc.
    required: false,
    default: null,
  },
  currentTimeLabel: { type: String, default: "" }, // the "friendly" label (e.g. "20 år efter avverkning")

  // Compare modes
  isCompare: { type: Boolean, default: false },
  isFrameworkCompareMode: { type: Boolean, default: false },

  // Compare frameworks/time
  compareFramework: {
    type: Object, // also has .value, .label, icon, iconColor
    default: null,
  },
  compareTime: { type: String, default: "" },
  compareStartskog: {
    type: Object, // also .value, .label
    default: null,
  },
});

/** mainTimelineData: data for the primary selection (CASE A or first method in compare). */
const mainTimelineData = computed(() => {
  if (
    !props.currentFramework?.value ||
    !props.currentTime ||
    !props.currentStartskog?.value
  ) {
    return null;
  }
  return (
    timelineData.find(
      (item) =>
        item.atgard === props.currentFramework.value &&
        item.tid === props.currentTime &&
        item.startskog === props.currentStartskog.value
    ) || null
  );
});

/** beforeData: for "innan" in the before/after scenario. */
const beforeData = computed(() => {
  if (!props.currentFramework?.value || !props.currentStartskog?.value) {
    return null;
  }
  // Hard-coded to 'innan'
  return (
    timelineData.find(
      (item) =>
        item.atgard === props.currentFramework.value &&
        item.tid === "innan" &&
        item.startskog === props.currentStartskog.value
    ) || null
  );
});

/** compareTimelineData: for the “second method” in framework compare mode. */
const compareTimelineData = computed(() => {
  if (!props.compareFramework?.value || !props.compareStartskog?.value) {
    return null;
  }
  // Use compareTime or fallback to currentTime
  const theTime = props.compareTime || props.currentTime;

  return (
    timelineData.find(
      (item) =>
        item.atgard === props.compareFramework.value &&
        item.tid === theTime &&
        item.startskog === props.compareStartskog.value
    ) || null
  );
});
</script>

<style scoped></style>
