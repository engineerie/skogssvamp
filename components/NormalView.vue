<template>
  <div class="grid grid-cols-12 gap-5">
    <!-- Normal grid layout -->
    <!-- <div class="col-span-9 flex flex-col">
      <EnvironmentImage
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
        class="flex-grow"
      />
    </div>
    <div class="col-span-3 flex flex-col">
      <SpeciesCount
        class="flex-grow"
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
      />
    </div> -->
    <div class="col-span-12">
      <EdnaComponent @enlarge="emitEnlarge('FullScreenEdna')" />
    </div>
    <div class="col-span-6 flex flex-col">
      <FullScreenEdible
        class="flex-grow"
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
        :isNormalView="true"
        @enlarge="emitEnlarge('FullScreenEdible')"
        :key="route.fullPath"
      />
    </div>
    <div class="col-span-6 flex flex-col">
      <FullScreenRedlisted
        class="flex-grow"
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
        :isNormalView="true"
        @enlarge="emitEnlarge('FullScreenRedlisted')"
        :key="route.fullPath"
      />
    </div>
  </div>
</template>

<script setup>
import EnvironmentImage from "./EnvironmentImage.vue";
import SpeciesCount from "./SpeciesCount.vue";
import EdnaComponent from "./EdnaComponent.vue";
import Edible from "./Edible.vue";
import Redlisted from "./Redlisted.vue";
import { useRoute } from "vue-router";
const route = useRoute();

// Define props
const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String,
  isNormalView: Boolean,
});

console.log("isNormalView in parent:", props.isNormalView); // Log to check the prop value in the parent component

// Define emits
const emit = defineEmits(["enlarge"]);

const emitEnlarge = (componentName) => {
  emit("enlarge", componentName);
};
</script>
