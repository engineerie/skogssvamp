<template>
  <div class="p-6 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
    <BaseHeading size="md" class="mb-4">Species list from e-DNA data</BaseHeading>
    <div id="scrollbar" class="overscroll-contain overflow-y-scroll h-96">
      <div v-if="data">
        <table class="w-full text-sm text-left table-auto">
          <thead class="bg-neutral-100 dark:bg-neutral-800 sticky top-0 dark:text-neutral-500 text-neutral-500">
            <tr>
              <th class=" py-3"></th>
              <th class=" py-3">Taxon</th>
              <th class="px-6 py-3">Swedish name</th>
              <th class="px-6 py-3">Edible</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in data" :key="row.taxon" class="border-b border-stone-200 dark:border-stone-700">
              <td class="py-2 px-2">
                <div :style="{ backgroundColor: allColors[index] }" class="rounded-full w-4 h-4"></div>
              </td>
              <td class="py-2 text-neutral-500">{{ row.taxon }}</td>
              <td class="px-6 text-neutral-500">{{ row.snamn }}</td>
              <td class="px-6">
                <div v-if="row.matsvamp === 1" class="bg-yellow-500 rounded-full w-4 h-4"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No data available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const data = ref(null);
const allColors = ref([]);
const route = useRoute();



onMounted(async () => {
  const { geography, forestType, vegetationType, standAge } = route.query;
  const response = await fetch(`/api/fetchData?geography=${geography}&forestType=${forestType}&vegetationType=${vegetationType}&standAge=${standAge}`);
  const result = await response.json();
  data.value = result.data;

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

  const top4Colors = generateColors([82, 82, 82], [212, 212, 212], 4);
  const next10Colors = generateColors([22, 101, 52], [134, 239, 172], 10);
  const otherColors = generateColors([46, 16, 101], [237, 233, 254], data.value.length - 14);

  allColors.value = [...top4Colors, ...next10Colors, ...otherColors];
});

</script>





<style scoped>
  /* For Webkit browsers like Chrome, Safari */
  #scrollbar::-webkit-scrollbar {
    width: 8px; /* width of the entire scrollbar */
  }
  
  #scrollbar::-webkit-scrollbar-track {
    display: none; /* color of the tracking area */
  }
  
  #scrollbar::-webkit-scrollbar-thumb {
    display: none;
    background-color: #88888833;  /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
  
  /* Hover effect for scroll thumb */
  #scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* For Firefox */
  #scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 #f2f3f500;
  }

  </style>
  
