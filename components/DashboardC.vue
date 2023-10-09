<!-- DashboardC.vue -->
<template>
  <ListBoxRow class="mb-4"/>
  <BaseButtonIcon @click="addToComparison" size="xs" shape="full" flavor="solid" color="primary" class="p-0.5 m-2 bg-amber-500 hover:bg-amber-400 float-right" data-nui-tooltip-position="left"
  data-nui-tooltip="Compare this environment">
    <Icon name="heroicons:plus-solid" class="h-5 w-5 text-white hover:text-amber-500"/>
  </BaseButtonIcon>
  <div class="grid grid-cols-5 gap-4">  
      <DashboardInfo class="col-span-2"/>
      <DashboardInfo2 />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTitleStore } from '~/stores/titleStore';
import { useComparisonStore } from '~/stores/comparisonStore';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore';

const comparisonStore = useComparisonStore();
const route = useRoute();
const query = ref(route.query);
const titleStore = useTitleStore();
const dashboardInfoStore = useDashboardInfoStore();

const addToComparison = () => {
  // Fetch the most current state directly from DashboardInfoStore
  const currentRedListedMessage = dashboardInfoStore.RedListedMessage;
  const currentEnvironmentMessage = dashboardInfoStore.EnvironmentMessage;

  const currentEnvironment = {
    query: route.query,
    RedListedMessage: currentRedListedMessage,
    EnvironmentMessage: currentEnvironmentMessage,
  };

  comparisonStore.addEnvironment(currentEnvironment);
};

const RedListedMessage = ref(dashboardInfoStore.RedListedMessage);
const EnvironmentMessage = ref(dashboardInfoStore.EnvironmentMessage);

const formattedQuery = computed(() => {
  const mapping = {
    // ... your mapping
  };
  const parts = [];
  for (const [key, value] of Object.entries(query.value)) {
    parts.push(mapping[value] || value);
  }
  return parts.join(', ');
});


// Watch for changes in formattedQuery and update the title
watch(formattedQuery, (newVal) => {
  titleStore.setTitle(newVal);
});

// Also set the title when the component is mounted
onMounted(() => {
  titleStore.setTitle(formattedQuery.value);
});

watch(RedListedMessage, (newVal) => {
  console.log("Red Listed Message changed:", newVal);
});
watch(EnvironmentMessage, (newVal) => {
  console.log("Environment Message changed:", newVal);
});
</script>
