<template>
  <div class="flex z-20 bottom-4 gap-10 p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border  dark:border-neutral-800 border-stone-200 ">
    <div class=" px-4 py-3 flex justify-between items-center w-full">
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="before" label="Innan avverkning" color="primary" />
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="1" label="1 år efter avverkning" color="primary" />
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="10" label="10 år efter avverkning" color="primary" />
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="20" label="20 år efter avverkning" color="primary" />
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="40" label="40 år efter avverkning" color="primary" />
<BaseRadio v-model="forestStore.time" name="checkbox_base" value="60" label="60 år efter avverkning" color="primary" />
</div>
<BaseSwitchThin
  v-model="stateOn"
  label="Träd"
  sublabel="Visa marken"
  color="primary"
/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useForestStore } from '~/stores/forestStore';
const forestStore = useForestStore();

const stateOn = computed({
  get: () => forestStore.stateOn,
  set: (value) => { forestStore.stateOn = value; }
});
</script>


