<template>
  <div
    class="flex z-20 bottom-4 gap-10 p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200"
  >
    <!-- <div class=" px-4 py-3 flex justify-between items-center w-full">
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="before" label="Innan avverkning" color="primary" />
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="1" label="1 år efter avverkning" color="primary" />
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="10" label="10 år efter avverkning" color="primary" />
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="20" label="20 år efter avverkning" color="primary" />
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="40" label="40 år efter avverkning" color="primary" />
<URadioGroup v-model="forestStore.time" name="checkbox_base" value="60" label="60 år efter avverkning" color="primary" />
</div> -->

    <div class="max-w-full space-y-4">
      <UProgress
        title="Default progress bar"
        size="sm"
        :value="progress"
        color="primary"
      />

      <div class="flex justify-between gap-2">
        <UButton
          :class="progress === 0 && '!border-primary-500 !text-primary-500'"
          @click="progress = 0"
        >
          Före
        </UButton>

        <UButton
          :class="progress === 10 && '!border-primary-500 !text-primary-500'"
          @click="progress = 10"
        >
          Efter
        </UButton>

        <UButton
          :class="progress === 40 && '!border-primary-500 !text-primary-500'"
          @click="progress = 40"
        >
          20 år
        </UButton>

        <UButton
          :class="progress === 70 && '!border-primary-500 !text-primary-500'"
          @click="progress = 70"
        >
          50 år
        </UButton>
        <UButton
          :class="progress === 100 && '!border-primary-500 !text-primary-500'"
          @click="progress = 100"
        >
          80 år
        </UButton>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-2">
      <UToggle label="Träd" color="primary" />
      <UToggle label="Svamp" color="primary" />
    </div>
    <div class="max-w-60">
      <USelectMenu
        size="md"
        v-model="value"
        label="Skogsskötsel"
        :items="frameworks"
        rounded="lg"
        :properties="{
          value: 'id',
          label: 'name',
          sublabel: 'text',
          icon: 'icon',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useForestStore } from "~/stores/forestStore";
const forestStore = useForestStore();

const progress = ref(0);

const value = ref({
  id: 1,
  name: "Naturskydd",
  text: "Orörd skog",
  icon: "pepicons-pop:tree-circle",
});

const frameworks = [
  {
    id: 1,
    name: "Naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
  },
  {
    id: 4,
    name: "Trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
  },
  {
    id: 2,
    name: "Blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
  },
  {
    id: 5,
    name: "Luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
  },
  {
    id: 3,
    name: "Skärmställning",
    text: "Fröträd lämnas",
    icon: "simple-icons:redwoodjs",
  },
];
</script>
