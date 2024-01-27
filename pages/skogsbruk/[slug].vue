<template>
    <div>
      <h1>{{ scenario.title }}</h1>
      <p>{{ scenario.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { forestScenarios } from '~/assets/data/forestScenarios';
  
  const route = useRoute();
  const scenario = ref({});
  
  const slug = route.params.slug;
  scenario.value = forestScenarios.find(s => s.slug === slug) || { title: 'Not Found', description: 'Scenario not found' };
  </script>
  