<template>
  <div class="w-full h-screen overflow-x-hidden pl-10 pr-6 pt-14 flex flex-col">
    <!-- Modal -->
    <!-- <UModal v-model="isModalOpen" v-if="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="flex items-end">
              <Icon
                name="material-symbols:info-rounded"
                class="h-9 w-9 text-green-500 mr-4"
              />
              <BaseHeading
                size="2xl"
                weight="thin"
                class="text-neutral-800 dark:text-neutral-200"
                >Välj miljö</BaseHeading
              >
            </div>
            <BaseButtonIcon
              shape="full"
              size="sm"
              @click="isModalOpen = false"
              class=""
            >
              <Icon name="material-symbols:close" class="size-4" />
            </BaseButtonIcon>
          </div>
        </template>

        <UCard class="relative">
          <BaseProse class="ml-2 my-4">
            Sök och klicka på kartan för att hämta information om geografi och
            skogstyp från nationell marktäckedata. Du kan även välja manuellt i
            kategorierna nedanför. Observera att beståndsålder och
            markvegetation alltid måste anges manuellt.
          </BaseProse>
        </UCard>

        <template #footer>
          <BaseProse class="text-neutral-500">
            Se
            <NuxtLink to="/guide" class="underline" @click="isModalOpen = false"
              >dokumentationen</NuxtLink
            >
            för mer information.
          </BaseProse>
        </template>
      </UCard>
    </UModal> -->
    <div class="mt-8">
      <div class="flex">
        <!-- <NuxtImg src="/images/SvamparSverige4.svg" class="w-56" /> -->
        <div
          class="ring-1 ring-neutral-200 rounded-xl flex justify-between overflow-hidden"
        >
          <div class="grid grid-cols-4 bg-neutral-100">
            <div class="p-6 col-span-3">
              <BaseHeading size="xl" weight="light">
                Se vilka arter som kan finnas olika i skogsmiljöer.
              </BaseHeading>
              <BaseHeading size="lg" weight="light" class="text-neutral-500">
                Sök och klicka på kartan för att hämta information om var i
                Sverige samt skogstyp från nationell marktäckedata. Du kan även
                välja manuellt i kategorierna nedanför. Observera att
                beståndsålder och fältskikt alltid måste anges manuellt.
              </BaseHeading>
            </div>
          </div>
          <NuxtImg
            src="/images/SvamparSverige4.svg"
            class="w-80 pt-2 border-l-[1px] border-neutral-200"
          />
        </div>
      </div>

      <!-- <div class="ring-1 ring-neutral-200 rounded-xl px-6 py-4"> -->

      <!-- </div> -->
    </div>
    <!-- Map Container with rounded corners and margin -->
    <div
      class="rounded-xl overflow-hidden shadow-lg grow min-h-[200px] max-h-[600px] relative mt-6"
    >
      <MapboxMap
        map-id="myMap"
        :options="{
          style: 'mapbox://styles/mapbox/standard-satellite',
          center: [15.448, 60.255],
          zoom: 6,
        }"
        style="position: absolute; top: 0; bottom: 0; width: 100%"
        @click="updateMarker"
        @onLoad="onMapLoad"
      >
        <MapboxNavigationControl />
        <MapboxGeolocateControl />
        <MapboxScaleControl />
        <MapboxGeocoder
          position="top-left"
          class="rounded-xl"
          ref="geocoderRef"
          :options="{
            placeholder: 'Sök',
            version: 'v6',
            countries: 'se',
            bbox: [10.592684, 55.361737, 24.177681, 69.10769],
          }"
        />

        <!-- Conditionally render the popup -->
        <MapboxDefaultPopup
          v-if="popupVisible"
          popup-id="myPopup"
          :lnglat="lnglat"
          :options="{ closeOnClick: false }"
        >
          <h1 class="text-neutral-500 text-sm mb-1 dark:text-neutral-300">
            Geografi: {{ geographyDisplay }}
          </h1>
          <h1 class="text-neutral-500 text-sm dark:text-neutral-300">
            Skogstyp:
          </h1>
        </MapboxDefaultPopup>
      </MapboxMap>
    </div>
    <div class="h-96 mb-6">
      <!-- ListBoxRowMap below the map -->
      <ListBoxRowMap
        :geographyFromMap="geographyOption"
        @update:geographyFromMap="handleGeographyChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";

// State to control modal visibility
const isModalOpen = ref(false);

// Store the longitude and latitude
const lnglat = ref({ lng: 15.448, lat: 61.255 });
// The geographyOption value used in ListBoxRowMap
const geographyOption = ref("");
// State for controlling popup visibility
const popupVisible = ref(false);

// Computed property for displaying the geography
const geographyDisplay = computed(() => {
  return lnglat.value.lat >= 60 ? "Norra Sverige" : "Södra Sverige";
});

// Function to update the marker position and geographyOption when map is clicked
function updateMarker(event) {
  geographyOption.value = null; // Reset before setting new value
  lnglat.value = {
    lng: event.lngLat.lng,
    lat: event.lngLat.lat,
  };

  popupVisible.value = true; // Show the popup when the map is clicked

  // Ensure reactivity system updates
  nextTick(() => {
    geographyOption.value = event.lngLat.lat >= 60 ? "Norr" : "Söder";
  });
}

// Function to handle geography changes triggered by ListBoxRowMap
function handleGeographyChange(newGeography) {
  geographyOption.value = newGeography;
}

// Automatically open modal when the component is mounted
onMounted(() => {
  isModalOpen.value = true; // Show modal on load
});
</script>

<style>
/* Styles for your map container or other elements can go here */
.mapboxgl-popup-close-button {
  display: none;
}

.mapboxgl-popup-content {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 200px;
  border-radius: 10px 10px 10px 10px;
  background-color: white;
}

.dark .mapboxgl-popup-content {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 200px;
  border-radius: 10px 10px 10px 10px;
  background-color: #262626;
}

.mapboxgl-canvas {
  cursor: pointer;
}

.dark .mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.dark .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.dark .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
  border-bottom-color: #262626;
}
.dark .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.dark .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.dark .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: #262626;
}
.dark .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: #262626;
}
.dark .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: #262626;
}
</style>
