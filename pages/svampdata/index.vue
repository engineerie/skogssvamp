<template>
  <MapboxMap
    map-id="myMap"
    :options="{
      style: 'mapbox://styles/engineeriee/clrqylxgt00em01peeru3593y', // your custom style
      center: [15.448, 61.255], // your specified center
      zoom: 10, // zoom level
    }"
    style="height: 100vh"
    @styleload="() => console.log('style loaded')"
    @click="updateMarker"
  >
    <MapboxDefaultMarker
      marker-id="customHTMLMarker"
      v-model:lnglat="lnglat"
      :options="{ draggable: true }"
      @dragend="() => console.log('dragend')"
    >
      <!-- Popup displaying dynamic lnglat data -->
      <MapboxDefaultPopup
        popup-id="myPopup"
        :lnglat="lnglat"
        :options="{ closeOnClick: false }"
      >
        <h1>Hello World! {{ lnglat }}</h1>
        <button @click="showAlert">Click Me!</button>
      </MapboxDefaultPopup>
    </MapboxDefaultMarker>
  </MapboxMap>
</template>

<script setup>
import { ref } from "vue";

const lnglat = ref({ lng: 15.448, lat: 61.255 }); // Initial marker position

function updateMarker(event) {
  // Updates marker to the coordinates of the map click
  lnglat.value = {
    lng: event.lngLat.lng,
    lat: event.lngLat.lat,
  };
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
