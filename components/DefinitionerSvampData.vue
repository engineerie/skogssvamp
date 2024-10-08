<template>
  <label class="text-neutral-400 text-sm"
    >DNA och fruktkroppsobservationer</label
  >

  <UCard class="relative rounded-b-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
        >
          <Icon name="game-icons:plant-roots" class="h-10 w-10" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-200"
          >Mykorrhizasvampar</BaseHeading
        >
      </div>
      <BaseButtonIcon shape="full" size="sm" @click="toggleCard('mykorrhiza')">
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.mykorrhiza ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>
    <transition name="fade">
      <BaseProse class="ml-2 my-4 text-sm" v-if="expandedCards.mykorrhiza">
        Denna del visar vilka mykorrhizasvampar som finns i svensk skogsmark,
        baserat på DNA-analyser av svampmycel från jordprover. Resultaten är
        baserade på prover från 2500 skogar som samlades in mellan 2015 och
        2022.
      </BaseProse>
    </transition>
  </UCard>

  <UCard class="relative rounded-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
        >
          <Icon name="icon-park-solid:knife-fork" class="h-10 w-10" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
          >Matsvampar</BaseHeading
        >
      </div>
      <BaseButtonIcon shape="full" size="sm" @click="toggleCard('matsvampar')">
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.matsvampar ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>
    <transition name="fade">
      <BaseProse class="ml-2 my-4 text-sm" v-if="expandedCards.matsvampar">
        Denna del visar ätbara svampar som kan förekomma i miljön, baserat på
        observationer av fruktkroppar som rapporterats till Artdatabanken.
        Informationen har sammanställts för hand av sakkunniga vid SLU och
        kompletterar DNA-undersökningen som missar många arter.
      </BaseProse>
    </transition>
  </UCard>

  <UCard class="relative rounded-t-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-teal-500 flex justify-center items-center"
        >
          <Icon name="material-symbols:award-star-outline" class="h-10 w-10" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
          >Naturvårdsarter</BaseHeading
        >
      </div>
      <BaseButtonIcon
        shape="full"
        size="sm"
        @click="toggleCard('naturvardsarter')"
      >
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.naturvardsarter ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>
    <transition name="fade">
      <BaseProse class="ml-2 my-4 text-sm" v-if="expandedCards.naturvardsarter">
        Denna del visar signalarter och rödlistade arter som kan förekomma i
        miljön, baserat på observationer av fruktkroppar. Information har
        sammanställts för hand av sakkunniga vid SLU och kompletterar
        DNA-undersökningen som missar ovanliga arter.
      </BaseProse>
    </transition>
  </UCard>
</template>

<script setup>
import { ref } from "vue";

// State to track which cards are expanded
const expandedCards = ref({
  mykorrhiza: false,
  matsvampar: false,
  naturvardsarter: false,
});

// Function to toggle card visibility
const toggleCard = (card) => {
  expandedCards.value[card] = !expandedCards.value[card];
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
