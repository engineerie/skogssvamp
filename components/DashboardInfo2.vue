<!-- DashboardInfo2.vue -->
<template>
    <BaseCard shape="curved" class="p-6" color="primary">
      <BaseHeading
        as="h4"
        size="sm"
        weight="medium"
        lead="tight"
        class="mb-2 "
      >
      Redlisted Species 
      </BaseHeading>

      <BaseHeading weight="semibold" size="4xl" lead="tight">
        {{ RedListedMessage }}
      </BaseHeading>
    </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Define a computed property for a unique message based on the environment
const RedListedMessage = computed(() => {
  const { geography, forestType, vegetationType, standAge } = route.query;
  const key = `${geography}-${forestType}-${vegetationType}-${standAge}`;

  const messages = {
  'North Sweden-Spruce-Tall herbs-1-40 years': '2',
  'North Sweden-Spruce-Tall herbs-41-90 years': '3',
  'North Sweden-Spruce-Tall herbs-91< years': '5',
  'North Sweden-Spruce-Low herbs-1-40 years': '6',
  'North Sweden-Spruce-Low herbs-41-90 years': '1',
  'North Sweden-Spruce-Low herbs-91< years': '0',
  // ... (and so on for all combinations)
  'South Sweden-Pine-Low herbs-41-90 years': '1',
  'South Sweden-Pine-Low herbs-91< years': '4',
  // ... (and so on for all combinations)
};

  return messages[key] || 'No data';
});
</script>