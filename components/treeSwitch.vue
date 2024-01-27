<template> 
    <div class="absolute bottom-4 right-2 px-4 py-2 ml-20 mr-80 z-10">
    <BaseSwitchThin v-model="values.primary" label="Visa Träd" color="primary" />
    </div>
</template>

<script setup lang="ts">
const values = reactive({
  primary: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
})
</script>
