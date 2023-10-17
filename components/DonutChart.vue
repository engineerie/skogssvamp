<template>
      <div class="p-6  bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">

      <BaseHeading size="md" class="mb-4">Species Amount</BaseHeading>
      <div v-if="data">
        <vue-apex-charts type="donut" class="" :options="chartOptions" :series="chartSeries"></vue-apex-charts>
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

  let totalSum = 0;
  
  const data = ref(null);
  const route = useRoute();

  const generateColors = (start, end, steps) => {
  const stepR = (end[0] - start[0]) / (steps - 1);
  const stepG = (end[1] - start[1]) / (steps - 1);
  const stepB = (end[2] - start[2]) / (steps - 1);

  const colors = [];
  for (let i = 0; i < steps; i++) {
    const r = Math.round(start[0] + stepR * i);
    const g = Math.round(start[1] + stepG * i);
    const b = Math.round(start[2] + stepB * i);
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
};
  
  const chartOptions = ref({
    tooltip: {
    y: {
      formatter: function(val) {
        const percentage = ((val / totalSum) * 100).toFixed(2);
        return `${percentage}%`;
      }
    }
  },
    labels: [], // Will be populated with species names
    legend: {
      show: false,
    },
    plotOptions: {
    pie: {
        donut: {
        size: '85%',  // Keep your existing size
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
            label: 'species',
            formatter: function() {
              return `${data.value.length}`;
            },
          }
        }
      }
    },
  },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 0.3,
      colors: ['#737373'],
    },
    colors: [] // Initialize an empty array for colors
  });
  
  const chartSeries = ref([]);
  const segmentColors = ref([]);

  
  onMounted(async () => {
    const { geography, forestType, vegetationType, standAge } = route.query;
    const response = await fetch(`/api/fetchData?geography=${geography}&forestType=${forestType}&vegetationType=${vegetationType}&standAge=${standAge}`);
    const result = await response.json();
    data.value = result.data;
  
    if (data.value) {
    totalSum = data.value.reduce((acc, row) => acc + row.total_presence, 0);

    // Sort the data by presence
    data.value.sort((a, b) => b.total_presence - a.total_presence);
    
    // Generate colors
    const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
    const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
    const otherColors = generateColors([46, 16, 101], [237, 233, 254], data.value.length - 14);
    
    // Concatenate all colors
    const allColors = [...top4Colors, ...next10Colors, ...otherColors];
    
    // Update chartSeries and chartOptions
    chartSeries.value = data.value.map(row => row.total_presence);
    chartOptions.value.labels = data.value.map(row => row.taxon);
    chartOptions.value.colors = allColors;
  }
  });
  </script>
  
  
  