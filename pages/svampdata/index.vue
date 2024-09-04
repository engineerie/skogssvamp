<template>
  <div class="w-full h-full overflow-auto p-4 pr-2">
    <!-- Map Container with rounded corners and margin -->
    <div class="rounded-xl overflow-hidden shadow-lg">
      <MapboxMap
        map-id="myMap"
        :options="{
          style: 'mapbox://styles/mapbox/standard-satellite',
          center: [15.448, 60.255],
          zoom: 6,
        }"
        style="position: relative; top: 0; bottom: 0; height: 400px"
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

    <!-- ListBoxRowMap below the map -->
    <ListBoxRowMap
      :geographyFromMap="geographyOption"
      @update:geographyFromMap="handleGeographyChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";

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
