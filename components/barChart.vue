<template>
    <div class="p-6 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
      <BaseHeading size="md" class="mb-4">Species Presence from e-DNA data</BaseHeading>
      <div v-if="data">
        <!-- Render the ApexChart -->
        <vue-apex-charts type="bar" :options="chartOptions" :series="chartSeries"></vue-apex-charts>
      </div>
      <div v-else>
        <p>No data available</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import VueApexCharts from 'vue3-apexcharts';
  
  const data = ref(null);
  const route = useRoute();
  
  const chartOptions = ref({
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: [],  // Will be populated with species names
    },
    dataLabels: {
    enabled: false // This line disables the data labels inside the bars
  },
  });
  
  const chartSeries = ref([
    {
      name: 'Presence',
      data: [],  // Will be populated with presence values
    },
  ]);
  
  onMounted(async () => {
    const { geography, forestType, vegetationType, standAge } = route.query;
    const response = await fetch(`/api/fetchData?geography=${geography}&forestType=${forestType}&vegetationType=${vegetationType}&standAge=${standAge}`);
    const result = await response.json();
    data.value = result.data;
  
    // Update chartSeries and chartOptions
    chartSeries.value[0].data = data.value.map(row => row.total_presence);
    chartOptions.value.xaxis.categories = data.value.map(row => row.taxon);
  });
  </script>
  
  <!-- Add your styles here -->
  <style scoped>
  /* Your styles */
  </style>
  