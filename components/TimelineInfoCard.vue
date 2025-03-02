<template>
  <div :class="['rounded-lg bg-neutral-50 shadow-sm p-4', containerClasses]">
    <div v-if="data">
      <!-- Header row -->
      <!-- <div class="flex justify-between">
          
        <div class="flex items-center gap-2 mb-2">
          
          <BaseHeading size="md" weight="thin" class="text-neutral-600">
            {{ framework.label }}
          </BaseHeading>
        </div>
        <BaseButtonIcon
          shape="full"
          size="xs"
          @click="$emit('open-info')"
          class="size-7"
        >
          <Icon name="i-material-symbols:info-i-rounded" class="w-4 h-4" />
        </BaseButtonIcon>
      </div> -->

      <!-- Badge row -->
      <div class="flex flex-wrap gap-2 mb-2">
        <UBadge color="white" variant="solid">
          <Icon
            class="mr-1"
            :name="framework.icon"
            :class="['icon size-4', framework.iconColor]"
          />
          {{ framework.label }}
        </UBadge>
        <UBadge v-if="currentStartskog.value === 'produktionsskog_'">
          I skog som har kalavverkats
        </UBadge>
        <UBadge v-else> I äldre skog som inte har kalavverkats </UBadge>
        <UBadge color="white" variant="solid">
          {{ timeLabel }}
        </UBadge>
      </div>

      <!-- Info rows -->
      <div class="gap-2 mb-2">
        <!-- <div class="size-5">
          <Icon name="lucide:trees" class="w-5 h-5 icon text-primary-500" />
        </div> -->
        <BaseHeading size="sm" weight="thin" class="text-neutral-700">
          Vad händer med skogen
        </BaseHeading>
        <BaseHeading size="sm" weight="thin" class="text-neutral-500">
          {{ data.skog }}
        </BaseHeading>
      </div>
      <div class="gap-2 mb-2">
        <div class="flex">
          <!-- <Icon
            name="fluent:shape-organic-24-filled"
            class="size-4 icon text-primary-500"
          /> -->
          <BaseHeading size="sm" weight="thin" class="text-neutral-700">
            Vad händer med svampen
          </BaseHeading>
        </div>
        <BaseHeading size="sm" weight="thin" class="text-neutral-500">
          {{ data.svamp }}
        </BaseHeading>
      </div>
    </div>
    <div v-else>
      <p>{{ emptyMessage || "Ingen data" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  framework: { type: Object, required: true },
  timeLabel: { type: String, default: "" },
  data: { type: Object, default: null },
  currentStartskog: { type: Object, required: true },
  emptyMessage: { type: String, default: "" },
  containerClasses: { type: String, default: "" },
});
</script>
