<template>
  <div class="border-2 p-7 rounded-lg text-center">
    <div class="flex flex-col items-center">
      <div class="mb-3">
        <Icon :name="icon" class="size-9" :class="iconColor" />
      </div>
      <h3 class="text-lg font-medium mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  iconColor: String,
});
</script>
