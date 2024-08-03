<template>
  <div class="h-window mr-[32px]">
    <MapboxMap
      map-id="myMap"
      :options="{
        style: 'mapbox://styles/engineeriee/clrqylxgt00em01peeru3593y',
        center: [15.448, 61.255],
        zoom: 10,
      }"
      style="height: 100vh"
      @click="updateMarker"
    >
      <MapboxGeocoder
        class="rounded-xl"
        ref="geocoderRef"
        position="top-left"
        :options="{
          version: 'v6',
        }"
      />
      <MapboxGeolocateControl position="top-right" />

      <MapboxDefaultPopup
        popup-id="myPopup"
        :lnglat="lnglat"
        :options="{ closeOnClick: false }"
      >
        <h1>{{ lnglat }}</h1>
      </MapboxDefaultPopup>
    </MapboxMap>

    <div class="h-fit w-full absolute bottom-0">
      <div class="relative mr-[32px]">
        <ListBoxRowMap :geography="geographyOption" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const lnglat = ref({ lng: 15.448, lat: 61.255 });
const geographyOption = ref("");

function updateMarker(event) {
  lnglat.value = {
    lng: event.lngLat.lng,
    lat: event.lngLat.lat,
  };
  // Determine the geography option based on latitude
  geographyOption.value =
    event.lngLat.lat > 60 ? "North Sweden" : "South Sweden";
}

function showAlert() {
  alert(
    `Current location: Longitude ${lnglat.value.lng}, Latitude ${lnglat.value.lat}`
  );
}
</script>

<style scoped>
/* Styles for your map container or other elements can go here */
</style>
