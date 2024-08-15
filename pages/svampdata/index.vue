<template>
  <div class="flex h-full w-full overflow-hidden">
    <div class="bg-gray-200 relative flex-1">
      <MapboxMap
        map-id="myMap"
        :options="{
          style: 'mapbox://styles/engineeriee/clrqylxgt00em01peeru3593y',
          center: [15.448, 61.255],
          zoom: 12,
        }"
        style="height: 100vh"
        @click="updateMarker"
      >
        <MapboxGeocoder
          class="rounded-xl"
          ref="geocoderRef"
          :options="{
            version: 'v6',
          }"
        />

        <MapboxDefaultPopup
          popup-id="myPopup"
          :lnglat="lnglat"
          :options="{ closeOnClick: false }"
        >
          <h1>{{ lnglat }}</h1>
        </MapboxDefaultPopup>
      </MapboxMap>
    </div>

    <!-- Half width for the list box -->
    <ListBoxRowMap
      :geographyFromMap="geographyOption"
      @update:geographyFromMap="handleGeographyChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const lnglat = ref({ lng: 15.448, lat: 61.255 });
const geographyOption = ref("");

function updateMarker(event) {
  geographyOption.value = null; // Reset before setting new value
  lnglat.value = {
    lng: event.lngLat.lng,
    lat: event.lngLat.lat,
  };
  // Use nextTick or setTimeout to ensure reactivity system updates
  nextTick(() => {
    geographyOption.value = event.lngLat.lat > 60 ? "Norr" : "Söder";
  });
}

function showAlert() {
  alert(
    `Current location: Longitude ${lnglat.value.lng}, Latitude ${lnglat.value.lat}`
  );
}

function handleGeographyChange(newGeography) {
  geographyOption.value = newGeography;
}
</script>

<style scoped>
/* Styles for your map container or other elements can go here */
</style>
