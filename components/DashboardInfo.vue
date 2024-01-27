<!-- DashboardInfo.vue -->
<template>
    <div class="p-4">
      <BaseHeading
      as="h4"
      size="sm"
      weight="medium"
      lead="tight"
      class="mb-2 text-muted-400"
    >
    Om den här miljön:
    </BaseHeading>
    <BaseParagraph v-if="dataLoaded" size="xl" lead="tight" color="primary">
      {{ EnvironmentMessage }}
    </BaseParagraph>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Papa from 'papaparse';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore'

const environmentData = ref([]);
const dataLoaded = ref(false);  // New variable to track data load status
const route = useRoute();

// Fetch and parse the CSV file
onMounted(() => {
  Papa.parse('/csv/environmentInfo.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      environmentData.value = results.data;
      dataLoaded.value = true;  // Set to true once data is loaded
    }
  });
});

// Define a computed property for a unique message based on the environment
const EnvironmentMessage = computed(() => {
  if (dataLoaded.value) {  // Only proceed if data is loaded
    const { geography, forestType, vegetationType, standAge } = route.query;
    const key = `${geography}-${forestType}-${vegetationType}-${standAge}`;

    const matchingEnvironment = environmentData.value.find(
      env => env.environment_id === key
    );

    return matchingEnvironment ? matchingEnvironment.environment_message : 'Genererad text med information om miljön';
  }
});
</script>
