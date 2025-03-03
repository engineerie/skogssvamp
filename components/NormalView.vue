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
      <div class="flex justify-end">
        <div
          class="flex bg-white rounded-tab w-fit p-2 px-3 pb-0 z-10 -mb-[1.5px] mr-[1.5px]"
        >
          <UBadge
            size="lg"
            color="violet"
            variant="subtle"
            :ui="{ rounded: 'rounded-lg' }"
            ><Icon
              name="solar:dna-linear"
              class="size-6 text-violet-500 mr-1"
            />Enligt DNA från markinventeringens provytor
          </UBadge>

          <!-- <Icon name="solar:dna-linear" class="size-7 text-violet-500" />

          <span class="text-neutral-500 text-xl mx-2 font-medium">
            Enligt DNA från markinventeringens provytor
          </span> -->
        </div>
        <div class="flex items-center">
          <Icon
            name="heroicons:information-circle"
            class="size-6 text-neutral-400 hover:text-primary-500 cursor-pointer transition-all -ml-0 my-2 mr-3"
          />
        </div>
      </div>

      <!-- <div
        class="rounded-3xl p-[1.5px] bg-gradient-to-tr from-violet-500 to-95%"
      >
        <div
          class="bg-white overflow-hidden rounded-tr-none rounded-[calc(1.5rem-1px)]"
        > -->
      <!-- Tab header -->

      <!-- Main content -->
      <div
        class="p-4 bg-white rounded-2xl shadow-neutral-300 shadow-[-1px_1px_4px_0px]"
      >
        <EdnaComponent @enlarge="emitEnlarge('FullScreenEdna')" />
      </div>
      <!-- </div>
      </div> -->
    </div>
    <!-- <div class="col-span-12 flex flex-col">
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
    </div> -->
    <!-- folder tab here that connects to the div beneath -->

    <div class="col-span-12">
      <div class="flex justify-end">
        <div
          class="flex bg-white rounded-tab w-fit p-2 px-3 pb-0 z-10 -mb-[1.5px] mr-[1.5px]"
        >
          <UBadge
            size="lg"
            color="amber"
            variant="subtle"
            :ui="{ rounded: 'rounded-lg' }"
            ><Icon
              name="lineicons:mushroom-1"
              class="size-6 text-amber-500 mr-1"
            />Enligt samlad kunskap, främst var fruktkroppar förekommer
          </UBadge>
          <!-- <Icon
            name="lineicons:mushroom-1"
            class="size-7 text-amber-500"
          /><span class="text-neutral-500 text-xl mx-2"
            >Enligt samlad kunskap, framförallt var svamparnas fruktkroppar
            förekommer</span
          > -->
        </div>
        <div class="flex items-center">
          <Icon
            name="heroicons:information-circle"
            class="size-6 text-neutral-400 hover:text-primary-500 cursor-pointer transition-all -ml-0 my-2 mr-3"
          />
        </div>
      </div>

      <!-- <div
        class="rounded-3xl p-[1.5px] bg-gradient-to-tr from-amber-500 to-95%"
      >
        <div
          class="bg-white overflow-hidden rounded-tr-none rounded-[calc(1.5rem-1px)]"
        > -->
      <div
        class="col-span-12 grid grid-cols-12 rounded-2xl bg-white p-4 gap-y-10 gap-x-6 shadow-neutral-300 shadow-[-1px_1px_4px_0px]"
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
      <!-- </div>
      </div> -->
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

<style scoped>
.rounded-tab {
  --r: 0.8em;
  border-inline: var(--r) solid #0000;
  border-radius: calc(2 * var(--r)) calc(2 * var(--r)) 0 0 / var(--r);
  mask: radial-gradient(var(--r) at var(--r) 0, #0000 98%, #000 101%)
      calc(-1 * var(--r)) 100%/100% var(--r) repeat-x,
    conic-gradient(#000 0 0) padding-box;
}
.rounded-tab.left {
  border-left-width: 0;
  border-top-left-radius: var(--r);
}
.rounded-tab.right {
  border-right-width: 0;
  border-top-right-radius: var(--r);
}
</style>
