<!-- DashboardInfo2.vue -->
<template>
    <div class="p-6  bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
    <BaseHeading
      as="h4"
      size="sm"
      weight="medium"
      lead="tight"
      class="mb-2 text-muted-400"
    >
      Redlisted Species Info: 
    </BaseHeading>
    <BaseParagraph v-if="dataLoaded" size="md" lead="tight" color="primary">
      {{ RedlistedSpecies }}
    </BaseParagraph>
    <BaseParagraph v-else size="md" lead="tight" color="primary">
      Loading...
    </BaseParagraph>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Papa from 'papaparse';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore'

const environmentData = ref([]);
const dataLoaded = ref(false);
const route = useRoute();
const dashboardInfoStore = useDashboardInfoStore();


// Fetch and parse the CSV file
onMounted(() => {
  Papa.parse('/csv/environmentInfo.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      environmentData.value = results.data;
      dataLoaded.value = true;
    }
  });
});

// Define a computed property for a unique redlisted species message based on the environment
const RedlistedSpecies = computed(() => {
  if (dataLoaded.value) {
    const { geography, forestType, vegetationType, standAge } = route.query;
    const key = `${geography}-${forestType}-${vegetationType}-${standAge}`;

    const matchingEnvironment = environmentData.value.find(
      env => env.environment_id === key
    );

    return matchingEnvironment ? matchingEnvironment.redlisted_species : 'No specific information available for this environment.';
  }
});
</script>
