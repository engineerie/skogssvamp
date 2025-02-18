<template>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12">
      <EnvImgInfo
        :geography="geography"
        :forestType="forestType"
        :standAge="standAge"
        :vegetationType="vegetationType"
      />
    </div>
    <div class="col-span-12">
      <EdnaComponent @enlarge="emitEnlarge('FullScreenEdna')" />
    </div>
    <div class="col-span-12 flex flex-col">
      <UDivider
        type="solid"
        size="xl"
        class="text-lg mt-4"
        :ui="{
          container: {
            base: ' flex rounded-xl',
          },
          border: {
            horizontal: 'border-0 rounded-xl',
          },
        }"
      >
        <BaseHeading
          size="md"
          weight="thin"
          class="text-neutral-500 dark:text-neutral-200"
          >Listorna för
          <span class="inline-block align-top"
            ><Icon
              name="material-symbols:award-star-outline"
              class="text-teal-500 mb-1"
          /></span>
          naturvårdsarter,
          <span class="inline-block align-top"
            ><Icon
              name="icon-park-solid:knife-fork"
              class="text-yellow-500 mb-1"
          /></span>
          mat- och
          <span class="inline-block align-top"
            ><Icon name="hugeicons:danger" class="text-lime-500 mb-1"
          /></span>
          giftsvampar bygger på samlad kunskap, framförallt var svamparnas
          fruktkroppar förekommer.
        </BaseHeading>
      </UDivider>
    </div>
    <div
      class="col-span-12 grid grid-cols-12 rounded-2xl bg-neutral-50 p-4 gap-6"
    >
      <div class="col-span-12 flex flex-col">
        <FullScreenRedlisted
          :geography="geography"
          :forestType="forestType"
          :standAge="standAge"
          :vegetationType="vegetationType"
          :isNormalView="true"
          @enlarge="emitEnlarge('FullScreenRedlisted')"
          :key="route.fullPath"
        />
      </div>
      <div class="col-span-6 flex flex-col h-full">
        <FullScreenEdible
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
        <FullScreenPoison
          :geography="geography"
          :forestType="forestType"
          :standAge="standAge"
          :vegetationType="vegetationType"
          :isNormalView="true"
          @enlarge="emitEnlarge('FullScreenPoison')"
          :key="route.fullPath"
        />
      </div>
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
import EnvImgInfo from "./EnvImgInfo.vue";
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
