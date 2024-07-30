<template>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-3">
      <div class="zoomable-image relative">
        <NuxtImg
          width="1200"
          src="/images/Skogsbruksbilder/trakthygge_20_dölj_dölj_produktionsskog_.png"
          class="z-0 rounded-xl"
          format="webp"
          quality="70"
        />
        <div class="absolute bottom-0 w-full p-5">
          <URange
            :step="25"
            v-model="time"
            size="md"
            :ui="{
              track: {
                background:
                  '[&::-webkit-slider-runnable-track]:bg-gray-200/40 [&::-moz-range-track]:bg-gray-200/40 [&::-webkit-slider-runnable-track]:dark:bg-gray-700/40 [&::-moz-range-track]:dark:bg-gray-700/40',
              },
            }"
          />
        </div>
      </div>
    </div>
    <div
      class="relative p-3 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200 flex flex-col justify-between"
    >
      <div>
        <UTabs :items="items" class="w-full">
          <template #default="{ item, selected }">
            <span
              class="truncate"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            >
              {{ item.label }}
            </span>
          </template>
        </UTabs>
        <UTabs :items="frameworks" class="w-full" orientation="vertical">
          <template #default="{ item, selected }" class="justify-start">
            <Icon
              :name="item.icon"
              class="w-4 h-4 flex-shrink-0 mr-2"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            />
            <span
              class="truncate"
              :class="[selected && 'text-primary-500 dark:text-primary-400']"
            >
              {{ item.label }}
            </span>
          </template>
        </UTabs>
        <div class="grid grid-cols-1 gap-3 mx-2 my-3">
          <BaseSwitchThin label="Träd" color="primary" />
          <BaseSwitchThin label="Svamp" color="primary" />
        </div>
      </div>
      <div class="w-full mt-auto">
        <USelectMenu v-model="time_value" :options="times" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useTitleStore } from "~/stores/titleStore";

const progress = ref(0);

const Startskog = ref("value_1");

const time = ref(0);

const value = ref({
  id: 1,
  label: "Naturskydd",
  text: "Orörd skog",
  icon: "pepicons-pop:tree-circle",
});

const frameworks = [
  {
    id: 1,
    label: "Naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
  },
  {
    id: 4,
    label: "Trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
  },
  {
    id: 2,
    label: "Blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
  },
  {
    id: 5,
    label: "Luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
  },
  {
    id: 3,
    label: "Skärmställning",
    text: "Fröträd lämnas",
    icon: "simple-icons:redwoodjs",
  },
];

const times = [
  "Innan avverkning",
  "Efter avverkning",
  "20 år efter avverkning",
  "50 år efter avverkning",
  "80 år efter avverkning",
];

const items = [
  {
    label: "Naturskog",
    icon: "i-heroicons-information-circle",
  },
  {
    label: "Produktion",
    icon: "i-heroicons-arrow-down-tray",
  },
];

// Computed property to convert numeric time value to index
const timeIndex = computed({
  get: () => time.value / 25,
  set: (index) => {
    time.value = index * 25; // Ensure this triggers updates to both URange and USelectMenu
  },
});

// Sync timeIndex with a human-readable format for USelectMenu
const time_value = computed({
  get: () => times[timeIndex.value],
  set: (val) => {
    const index = times.indexOf(val);
    if (index !== -1) timeIndex.value = index; // Update the index which updates time
  },
});

const titleStore = useTitleStore();

onMounted(() => {
  titleStore.setTitle("Skogsbruk");
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
