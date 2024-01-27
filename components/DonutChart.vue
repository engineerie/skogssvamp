<template>
  <!-- <div class="p-6 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl h-full flex flex-col justify-between"> -->
    <div>
      <!-- Title and heading section -->
      <!-- <div class="flex justify-between items-center mb-10">
        <BaseHeading size="md" class="mb-4">Markinventeringsdata</BaseHeading>
        <BaseIconBox size="sm" shape="curved" flavor="pastel" color="warning">
          <Icon name="solar:dna-bold-duotone" class="h-6 w-6" />
        </BaseIconBox>
      </div> -->

      <!-- Chart Section -->
      <div v-if="VueApexCharts && data">
        <VueApexCharts type="donut" :options="chartOptions" :series="chartSeries" class="mb-4"/>
      </div>

      <div v-else>
        <BasePlaceload class="h-32 w-32 mb-12 rounded-full" />
      </div>
    </div>

    <!-- Information section aligned to the bottom -->
    <!-- <div class="mt-2 mb-1">
      <hr class="border-stone-200 dark:border-stone-700 mb-4"/>
      <div class="flex justify-between">
        <div>
          <BaseParagraph size="md" class="text-neutral-500">{{ top4Count }} arter</BaseParagraph>
          <div class="flex items-center"><div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div><BaseParagraph size="md" class="text-neutral-500">{{ top4Percentage }}%</BaseParagraph></div>
        </div>
        <div>
          <BaseParagraph size="md" class="text-neutral-500">{{ next10Count }} arter</BaseParagraph>
          <div class="flex items-center"><div class="bg-green-500 rounded-full w-2 h-2 mr-1"></div><BaseParagraph size="md" class="text-neutral-500">{{ next10Percentage }}%</BaseParagraph></div>
        </div>
        <div>
          <BaseParagraph size="md" class="text-neutral-500">{{ remainingCount }} arter</BaseParagraph>
          <div class="flex items-center"><div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div><BaseParagraph size="md" class="text-neutral-500">{{ remainingPercentage }}%</BaseParagraph></div>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String
});

const VueApexCharts = shallowRef(null);
const data = ref(null);
const top4Percentage = ref(0);
const next10Percentage = ref(0);
const remainingPercentage = ref(0);
const top4Count = ref(0);
const next10Count = ref(0);
const remainingCount = ref(0);
const chartSeries = ref([]);
let totalSum = 0;

const chartOptions = ref({
  // Define your chart options here
  tooltip: {
    y: {
      formatter: function(val) {
        const percentage = ((val / totalSum) * 100).toFixed(2);
        return `${percentage}%`;
      }
    }
  },
  labels: [],
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: '85%',
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
  colors: []
});

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
  

const fetchChartData = async () => {
  const encodedURL = `/api/fetchData?geography=${encodeURIComponent(props.geography)}&forestType=${encodeURIComponent(props.forestType)}&vegetationType=${encodeURIComponent(props.vegetationType)}&standAge=${encodeURIComponent(props.standAge)}`;
  const response = await fetch(encodedURL);
  const result = await response.json();
  data.value = result.data;

  // Existing logic to process and display the data
  if (data.value) {
    totalSum = data.value.reduce((acc, row) => acc + row.total_presence, 0);
    data.value.sort((a, b) => b.total_presence - a.total_presence);
    const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
    const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
    const otherColors = generateColors([46, 16, 101], [232, 121, 249], data.value.length - 13);// 13 not 14 to ensure the value is not 1.
    
    chartSeries.value = data.value.map(row => row.total_presence);
    chartOptions.value.labels = data.value.map(row => row.taxon);
    chartOptions.value.colors = [...top4Colors, ...next10Colors, ...otherColors];

    // Calculations for percentages and counts
    const top4Sum = data.value.slice(0, 4).reduce((acc, row) => acc + row.total_presence, 0);
    const next10Sum = data.value.slice(4, 14).reduce((acc, row) => acc + row.total_presence, 0);
    const remainingSum = totalSum - top4Sum - next10Sum;

    top4Percentage.value = ((top4Sum / totalSum) * 100).toFixed(0);
    next10Percentage.value = ((next10Sum / totalSum) * 100).toFixed(0);
    remainingPercentage.value = ((remainingSum / totalSum) * 100).toFixed(0);

    top4Count.value = data.value.slice(0, 4).length;
    next10Count.value = data.value.slice(4, 14).length;
    remainingCount.value = data.value.length - top4Count.value - next10Count.value;
  }
};

const emits = defineEmits(['updateInfo']);

const updateParentWithInfo = () => {
  emits('updateInfo', {
    top4Count: top4Count.value,
    next10Count: next10Count.value,
    remainingCount: remainingCount.value,
    top4Percentage: top4Percentage.value,
    next10Percentage: next10Percentage.value,
    remainingPercentage: remainingPercentage.value
  });
};

onMounted(async () => {
  await fetchChartData();
  if (process.client) {
    const module = await import('vue3-apexcharts');
    VueApexCharts.value = module.default;
  }
  updateParentWithInfo();
});

</script>


 