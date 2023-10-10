<!-- DashboardInfo.vue -->
<template>
  <BaseCard shape="curved" class="p-6">
      <BaseHeading
      as="h4"
      size="sm"
      weight="medium"
      lead="tight"
      class="mb-2 text-muted-400"
    >
    Environment Info: 
    </BaseHeading>
    <BaseParagraph size="md" lead="tight" color="primary">
      {{ EnvironmentMessage }}
    </BaseParagraph>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore'

const route = useRoute();

// Define a computed property for a unique message based on the environment
const EnvironmentMessage = computed(() => {
const { geography, forestType, vegetationType, standAge } = route.query;
const key = `${geography}-${forestType}-${vegetationType}-${standAge}`;

const messages = {
'North Sweden-Spruce-Tall herbs-1-40 years': 'Morel mushrooms.',
'North Sweden-Spruce-Tall herbs-41-90 years': 'Possibly Truffles.',
'North Sweden-Spruce-Tall herbs-91< years': 'Chanterelles.',
'North Sweden-Spruce-Low herbs-1-40 years': 'Great for Penny Bun.',
'North Sweden-Spruce-Low herbs-41-90 years': 'Mostly Fly Agaric.',
'North Sweden-Spruce-Low herbs-91< years': 'Good for Chanterelles.',
// ... (and so on for all combinations)
'South Sweden-Pine-Low herbs-41-90 years': 'Great for Chanterelles.',
'South Sweden-Pine-Low herbs-91< years': 'Excellent for Funnel Chanterelles.',
// ... (and so on for all combinations)
};

return messages[key] || 'No specific information available for this environment.';
});

const dashboardInfoStore = useDashboardInfoStore();
dashboardInfoStore.updateEnvironmentMessage(EnvironmentMessage.value);
</script>
