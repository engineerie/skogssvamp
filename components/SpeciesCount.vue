<template>
  <div class="relative h-fit backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60  border-[1px] dark:border-neutral-800 border-stone-200">
    <div class="p-6">
    <div class="grid grid-cols-4">
      <div class="col-span-3">
        <BaseHeading size="md">Artrikedom</BaseHeading>
        <BaseParagraph size="sm" class="mb text-neutral-500">Antalet svamparter som beräknas finnas i miljön.</BaseParagraph>
      </div>
      <div class="col-span-1 flex justify-end">
        <Icon name="game-icons:mushrooms" class="dark:opacity-90 w-8 h-8 mb-4 rounded-lg text-green-500 flex justify-center items-center" />
      </div>
    </div>
  </div>
 
      <div id="chart"></div>

    <!-- <div class="flex gap-4 -mt-16 justify-center">
      <BaseHeading v-if="dataLoaded" size="3xl" width="medium" color="primary" class="inline-flex justify-center">
        {{ RedlistedSpecies }}
      </BaseHeading>
      <BaseParagraph v-else size="md" color="primary">
        Loading...
      </BaseParagraph>
    </div>
    <div class="flex justify-center -mt-16 mb-8">
    <BaseHeading size="lg" weight="medium" color="primary" class="inline-flex justify-center">
      arter
    </BaseHeading>
  </div> -->
</div>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import Papa from 'papaparse';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore';

const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String
});

const environmentData = ref([]);
const dataLoaded = ref(false);
const dashboardInfoStore = useDashboardInfoStore();
let chart;

// Fetch and parse the CSV file
onMounted(async () => {
  if (typeof window !== 'undefined') {
    const ApexCharts = (await import('apexcharts')).default;
    
    Papa.parse('/csv/environmentInfo.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        environmentData.value = results.data;
        dataLoaded.value = true;
        
        // Initialize the chart after data is loaded
        initChart(ApexCharts, RedlistedSpecies.value);
      }
    });
  }
  
  watch(RedlistedSpecies, (newValue) => {
    if (!isNaN(newValue) && chart) {
      updateChart(newValue);
    }
  }, { immediate: true });
});

// Define a computed property for the unique redlisted species count
const RedlistedSpecies = computed(() => {
  if (dataLoaded.value) {
    const key = `${props.geography}-${props.forestType}-${props.vegetationType}-${props.standAge}`;
    const matchingEnvironment = environmentData.value.find(env => env.environment_id === key);
    return matchingEnvironment ? matchingEnvironment.species_count : 0;
  } else {
    return 0;
  }
});

// Initialize the chart
const initChart = (ApexCharts, value) => {
  const percentage = (value / 300) * 100;
  const options = {
    series: [percentage],
    colors: ["#22c55e"],
    chart: {
      type: 'radialBar',
      offsetY: -10,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '50%', // Adjust this value to control the thickness
        },
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: '97%',
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '30px',
          },
          value: {
            show: false,
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    labels: [RedlistedSpecies.value], // Set the label to RedlistedSpecies value
  };

  const chartElement = document.querySelector("#chart");
  if (chartElement) {
    chartElement.innerHTML = ''; // Clear the container
    chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

// Update the chart
const updateChart = (value) => {
  const percentage = (value / 300) * 100;
  chart.updateSeries([percentage]);
};
</script>
