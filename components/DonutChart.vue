<template>
    <div class="p-6 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
      <BaseHeading size="md" class="mb-4">Species Count</BaseHeading>
      <div v-if="data">
        <vue-apex-charts type="donut" :options="chartOptions" :series="chartSeries" class="mb-4"></vue-apex-charts>
        <hr class=" border-stone-200 dark:border-stone-700"/>
        <div class="flex justify-between mt-2">
          <div>
            <BaseParagraph size="sm" class="text-neutral-500">{{ top4Count }} species</BaseParagraph>
            <div class="flex items-center"><div class="bg-neutral-500 rounded-full w-2 h-2 mr-1 "></div><BaseParagraph size="sm" class="text-neutral-500">{{ top4Percentage }}%</BaseParagraph></div>
          </div>
          <div>
            <BaseParagraph size="sm" class="text-neutral-500">{{ next10Count }} species</BaseParagraph>
            <div class="flex items-center"><div class="bg-green-500 rounded-full w-2 h-2 mr-1 "></div><BaseParagraph size="sm" class="text-neutral-500">{{ next10Percentage }}%</BaseParagraph></div>
          </div>
          <div>
            <BaseParagraph size="sm" class="text-neutral-500">{{ remainingCount }} species</BaseParagraph>
            <div class="flex items-center"><div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div><BaseParagraph size="sm" class="text-neutral-500">{{ remainingPercentage }}%</BaseParagraph></div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
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
    
    const top4Percentage = ref(0);
    const next10Percentage = ref(0);
    const remainingPercentage = ref(0);
    const top4Count = ref(0);
    const next10Count = ref(0);
    const remainingCount = ref(0);

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
        expandOnClick: false,
        donut: {
        size: '85%',  // Keep your existing size
        labels: {
          show: true,
          name: { show: false },
          value: {
          show: true,
          fontSize: '33px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          color: '#737373',
        },
          total: {
            showAlways: true,
            show: true,
            formatter: function() {
              return `${data.value.length}`;
            },
          },
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
    const otherColors = generateColors([46, 16, 101], [232, 121, 249], data.value.length - 14);
    
    // Concatenate all colors
    const allColors = [...top4Colors, ...next10Colors, ...otherColors];
    
    // Update chartSeries and chartOptions
    chartSeries.value = data.value.map(row => row.total_presence);
    chartOptions.value.labels = data.value.map(row => row.taxon);
    chartOptions.value.colors = allColors;

    const top4Sum = data.value.slice(0, 4).reduce((acc, row) => acc + row.total_presence, 0);
      const next10Sum = data.value.slice(4, 14).reduce((acc, row) => acc + row.total_presence, 0);
      const remainingSum = totalSum - top4Sum - next10Sum;
  
      top4Percentage.value = ((top4Sum / totalSum) * 100).toFixed(2);
      next10Percentage.value = ((next10Sum / totalSum) * 100).toFixed(2);
      remainingPercentage.value = ((remainingSum / totalSum) * 100).toFixed(2);
  
      top4Count.value = data.value.slice(0, 4).length;
      next10Count.value = data.value.slice(4, 14).length;
      remainingCount.value = data.value.length - top4Count.value - next10Count.value;
    
  }
  });
  </script>
  

 

  
  
  