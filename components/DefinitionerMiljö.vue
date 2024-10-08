<template>
  <!-- Geografi Card -->
  <label class="text-neutral-400 text-sm">Definitioner miljö</label>
  <UCard class="relative rounded-b-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-fuchsia-500 flex justify-center items-center"
        >
          <Icon name="material-symbols:location-on-outline" class="h-9 w-9" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-200"
        >
          Geografi
        </BaseHeading>
      </div>
      <BaseButtonIcon shape="full" size="sm" @click="toggleCard('geografi')">
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.geografi ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>

    <!-- Smooth Transition for the content -->
    <transition name="fade">
      <div class="ml-2 my-4 text-sm" v-if="expandedCards.geografi">
        <b>Norra Sverige</b>
        <p class="mb-2 text-sm">Norr om latitude 60°</p>
        <b>Södra Sverige</b>
        <p class="text-sm">Söder om latitude 60°</p>
      </div>
    </transition>
  </UCard>

  <!-- Skogstyp Card -->
  <UCard class="relative rounded-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-green-500 flex justify-center items-center"
        >
          <Icon name="lucide:trees" class="h-7 w-7" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
        >
          Skogstyp
        </BaseHeading>
      </div>
      <BaseButtonIcon shape="full" size="sm" @click="toggleCard('skogstyp')">
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.skogstyp ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>

    <transition name="fade">
      <div class="ml-2 my-4 text-sm" v-if="expandedCards.skogstyp">
        <b>Granskog</b>
        <p class="mb-2 text-sm">
          Minst 70% barrträd och varav minst 70% av barrträden är gran
        </p>
        <b>Tallskog</b>
        <p class="mb-2 text-sm">
          Minst 70% barrträd och varav minst 70% av barrträden är tall
        </p>
        <b>Barrblandskog</b>
        <p class="mb-2 text-sm">
          Minst 70% barrträd varav varken tall eller gran utgör 70% av
          barrträden
        </p>
        <b>Lövblandskog</b>
        <p class="mb-2 text-sm">
          31-69% lövträd respektive barrträd, samt hygge med jordslag mull
        </p>
        <b>Lövskog</b>
        <p class="mb-2 text-sm">Minst 70% lövträd</p>
        <b>Ek och Bokskog</b>
        <p class="mb-2 text-sm">
          Minst 70% lövträd varav minst 70% av lövträden är ek eller bok
        </p>
        <b>Naturbete</b>
        <p class="text-sm">Trädbevuxna gräsmarker för bestesdjur</p>
      </div>
    </transition>
  </UCard>

  <!-- Beståndsålder Card -->
  <UCard class="relative rounded-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
        >
          <Icon name="carbon:crop-growth" class="h-10 w-10" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
        >
          Beståndsålder
        </BaseHeading>
      </div>
      <BaseButtonIcon
        shape="full"
        size="sm"
        @click="toggleCard('beståndsålder')"
      >
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.beståndsålder ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>

    <transition name="fade">
      <div class="ml-2 my-4 text-sm" v-if="expandedCards.beståndsålder">
        <b>1-40 år</b>
        <p class="mb-2 text-sm">
          Skogsbestånd 1-40 år efter kallavverkning/etablering
        </p>
        <b>41-90 år</b>
        <p class="mb-2 text-sm">
          Skogsbestånd 41-90 år efter kallavverkning/etablering
        </p>
        <b>91 år och äldre</b>
        <p class="mb-2 text-sm">
          Skogsbestånd mer än 91 år efter kallavverkning/etablering
        </p>
        <b>Alla åldrar</b>
        <p class="text-sm">
          Skogsbestånd oberoende av ålder (speciellt hjälpsamt då dataunderlag
          är svagt)
        </p>
      </div>
    </transition>
  </UCard>

  <!-- Markvegetation Card -->
  <UCard class="relative rounded-t-none">
    <div class="flex items-end justify-between">
      <div class="flex items-end">
        <div
          class="dark:opacity-90 w-7 h-7 ml-2 mr-3 rounded-lg text-teal-500 flex justify-center items-center"
        >
          <Icon name="fluent-emoji-high-contrast:herb" class="h-10 w-10" />
        </div>
        <BaseHeading
          size="xl"
          weight="medium"
          class="text-neutral-800 dark:text-neutral-300 mr-4"
        >
          Markvegetation
        </BaseHeading>
      </div>
      <BaseButtonIcon
        shape="full"
        size="sm"
        @click="toggleCard('markvegetation')"
      >
        <Icon
          name="mdi:chevron-down"
          :class="[
            'h-6 w-6 transition-transform duration-300 ease-in-out',
            expandedCards.markvegetation ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </BaseButtonIcon>
    </div>

    <transition name="fade">
      <div class="ml-2 my-4 text-sm" v-if="expandedCards.markvegetation">
        <b>Högört</b>
        <p class="mb-2 text-sm">
          Torvmark som karakteriseras av högörter. Typarterna är brudborste,
          högvuxna ormbunkar, kärrfibbla, kärrtistel, ormbär, stormhatt,
          strätta, älgört och ängssyra.
        </p>
        <b>Lågört</b>
        <p class="mb-2 text-sm">
          Torvmark som karakteriseras av lågörter och bredbladiga gräs.
          Typarterna är blodrot, bredbladiga gräs, ekbräken, ekorrbär, harsyra,
          humleblomster, kärrfräken, orkidéer och violarter.
        </p>
        <b>Utan fältskikt</b>
        <p class="mb-2 text-sm"></p>
        <b>Bredblad gräs</b>
        <p class="mb-2 text-sm">
          Fastmark där mer än 1/4 av befintligt fältskikt huvudsakligen består
          av gräsarter med breda och ofta saftrika blad, t.ex. hässlebrodd och
          tuvtåtel.
        </p>
        <b>Smalblad gräs</b>
        <p class="mb-2 text-sm">
          Fastmark där gräs, örnbräken och örter täcker mer än 1/4 av BF och där
          gräsarter med trådsmala blad, t.ex. kruståtel och fårsvingel
          dominerar.
        </p>
        <b>Blåbär</b>
        <p class="mb-2 text-sm">
          Vegetationstyp på fastmark som kännetecknas av att mer än 1/2 av
          befintligt fältskikt täcks av blåbär, ormbunkar och lummer.
        </p>
        <b>Lingon</b>
        <p class="mb-2 text-sm">
          Vegetationstyp där mer än 1/2 av befintligt fältskikt täcks av lingon
          och mjölon samt örter, gräs, ormbunkar, lummer och blåbär.
        </p>
        <b>Kråkbär och Ljung</b>
        <p class="text-sm">
          Vegetationstyp där mer än 1/2 av befintligt fältskikt täcks av
          kråkbär, ljung och klockljung samt lingon, ormbunkar, lummer och
          blåbär.
        </p>
      </div>
    </transition>
  </UCard>
</template>

<script setup>
import { ref } from "vue";

// State to track which cards are expanded
const expandedCards = ref({
  geografi: false,
  skogstyp: false,
  beståndsålder: false,
  markvegetation: false,
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
