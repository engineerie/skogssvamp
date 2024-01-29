<template>
    <div>
      <h1>My Data</h1>
      <ul>
        <li v-for="item in myData" :key="item.taxon">
          {{ item.snamn }} ({{ item.taxon }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const myData = ref([]);
  
  onMounted(async () => {
    try {
      // Fetch from the root URL, not the file system path
      const response = await fetch('/data.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      myData.value = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  </script>
  