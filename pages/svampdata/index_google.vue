<template>
  <div class="w-full h-screen overflow-x-hidden pl-10 pr-6 pt-16 flex flex-col">
    <!-- Modal -->
    <UModal v-model="isModalOpen" v-if="isModalOpen">
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
    </UModal>

    <!-- Map Container with iframe for Google Earth Engine App -->
    <div
      class="rounded-xl overflow-hidden shadow-lg grow min-h-[200px] max-h-[600px] relative"
    >
      <iframe
        src="https://ee-jacobbertilsson.projects.earthengine.app/view/skogstest"
        @load="setupIframeClickListener"
        style="
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          border: none;
        "
        title="Google Earth Engine Map"
      ></iframe>
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

// Function to fetch pixel value
async function fetchPixelValue(lat, lng) {
  try {
    const response = await $fetch(`/api/getPixelValue`, {
      params: { lat, lng },
    });
    console.log("Pixel Value:", response.pixelValue);
  } catch (error) {
    console.error("Failed to fetch pixel value:", error);
  }
}

// Function to setup click listener within the iframe
function setupIframeClickListener() {
  const iframe = document.querySelector("iframe");
  iframe.contentWindow.addEventListener("click", (event) => {
    // Assuming coordinates are available from a click event inside the iframe
    const { lat, lng } = event; // Adjust as needed based on iframe's event data

    console.log(`Clicked coordinates: Latitude ${lat}, Longitude ${lng}`);

    // Fetch and log pixel value for the clicked coordinates
    fetchPixelValue(lat, lng);
  });
}

// Computed property for displaying the geography
const geographyDisplay = computed(() => {
  return lnglat.value.lat >= 60 ? "Norra Sverige" : "Södra Sverige";
});

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
