<template>
    <BaseCard class="p-6">
    <BaseHeading size="md" class="mb-4">Species list from e-DNA data</BaseHeading>
    <!-- Check if data is available -->
    <div v-if="data">
      <!-- Display data in a table -->
      <table class="w-full text-sm text-left">
        <thead >
          <tr>
            <th>Taxon</th>
            <th>Swedish name</th>
          </tr>
          <!-- add some spacing here margin or padding with  -->
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.taxon">
            <td >{{ row.taxon }}</td>
            <td >{{ row.snamn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Display message if data is not available -->
    <div v-else>
      <p>No data available</p>
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
