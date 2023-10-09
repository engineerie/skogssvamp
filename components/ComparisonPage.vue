<!-- ComparisonPage.vue -->
<template>
    <div class="comparison-grid">
      <div v-for="env in environments" :key="env.query">
        <div>
        Query: {{ env.query }}
      </div>
      <div>
        Red Listed Message: {{ env.RedListedMessage }}
      </div>
      <div>
        Environment Message: {{ env.EnvironmentMessage }}
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useComparisonStore } from '~/stores/comparisonStore';

  

  const comparisonStore = useComparisonStore();
  const environments = comparisonStore.environments;

  console.log("Fetched environments: ", environments);  // Debugging line
  </script>
  
  <style>
  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  </style>
  