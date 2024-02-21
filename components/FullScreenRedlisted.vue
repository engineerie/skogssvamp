<template>
  <div class="h-96 w-96 bg-red-400">
    <button @click="$emit('close')">Close</button>
    <!-- Full-screen content -->
  </div>
</template>
  
  <script setup>
  defineProps({
    geography: String,
    forestType: String,
    standAge: String,
    vegetationType: String
  });
  
  // Additional script logic
  </script>
  

  