<template>

  <div class="bg-neutral-100 absolute top-20 right-4 z-10 left-1/2 rounded-xl">
    <BaseMessage type="info" icon >
      Kartfunktionen är ännu inte aktiv. Funktion som planeras: Information om Geografi och Skogstyp hämtas för punkt som markeras på karta. Värdena fylls i till vänster under "Sök på beståndstyp". Användare fyller själv i Beståndsålder och Vegetationstyp.     
    </BaseMessage>
  </div>
  
      <!-- <img src="/images/map.jpg" alt="placeholder-image" class="rounded-lg border-[1px] dark:border-neutral-800 border-neutral-300"/> -->
      <MapboxMap
      map-id="{ID}"
      class="fixed left-20 right-0 z-0 mt-16 w-screen"
      :options="{
        style: 'mapbox://styles/engineeriee/clrqylxgt00em01peeru3593y', // style URL
        center: [15.448, 61.255], // starting position
        zoom: 10 // starting zoom
      }"
    />
<div class="relative">
    <div class="absolute -left-4 -top-2 w-80">
      <BaseInput
      size="lg"
      v-model="fields.first"
      shape="full"
      type="search"
      placeholder="Sök plats..."
      icon="lucide:search"
      /></div>
    </div>



</template>



<!-- <template>
  <BasePlaceholderPage
    title="Välj en skog för att se svampdata"
    subtitle="I denna sektion kan du utforska svampdata från olika skogar i Sverige. Välj en skog i menyn till vänster för att komma igång."
  >
    <template #image>
      <img src="/images/north_sweden_spruce_tall_herbs_91_years.png" alt="placeholder-image" />
    </template>

  <div class="mt-2 flex justify-center gap-2">
      <BaseButton color="primary" shape="curved" class="h-11 w-40">Take some action</BaseButton>
    </div> 
  </BasePlaceholderPage>
</template> -->

<script setup>
import { useTitleStore } from '~/stores/titleStore';
import { onMounted } from 'vue';

const fields = reactive({
    first: '',
  })

const titleStore = useTitleStore();

onMounted(() => {
  titleStore.setTitle('Skogssvamp');
});
</script>

<script>
export default {
  layout: 'sidebarLayout'
};
</script>

