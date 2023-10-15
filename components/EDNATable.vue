<template>
  <BaseCard shape="curved" class="p-6">
    <BaseHeading size="md" class=" mb-4">Species list from e-DNA data</BaseHeading>
    <div id="scrollbar" class="overscroll-contain overflow-y-scroll h-96">  <!-- Remove padding here -->
      <!-- Check if data is available -->
      <div v-if="data">
        <!-- Display data in a table -->
        <table class="w-full text-sm text-left table-auto ">  <!-- Added table-auto and w-full -->
          <thead class="bg-white dark:bg-neutral-800 sticky top-0 dark:text-neutral-500 text-neutral-500">
            <tr>
              <th class="px-6 py-3">Taxon</th>  <!-- Added padding here -->
              <th class="px-6 py-3">Swedish name</th>  <!-- Added padding here -->
            </tr>
          </thead>
          <tbody >
            <tr v-for="row in data" :key="row.taxon" class="border-b border-stone-200 dark:border-stone-700">
              <td class="py-2 px-6">{{ row.taxon }}</td>  <!-- Added padding here -->
              <td class="px-6">{{ row.snamn }}</td>  <!-- Added padding here -->
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Display message if data is not available -->
      <div v-else>
        <p>No data available</p>
      </div>
    </div>
  </BaseCard>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const data = ref(null);
const route = useRoute();

onMounted(async () => {
  const { geography, forestType, vegetationType, standAge } = route.query;
  const response = await fetch(`/api/fetchData?geography=${geography}&forestType=${forestType}&vegetationType=${vegetationType}&standAge=${standAge}`);
  const result = await response.json();
  data.value = result.data;
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
  
