<!-- DashboardC.vue -->
<template>
  <ListBoxRow class="mb-4"/>
  <BaseMessage v-if="maxEnvironmentsReached" type="primary">
    You can compare max five environments at the time.
  </BaseMessage>
  <BaseMessage v-if="duplicateEnvironment" type="warning">
    This environment has already been added to your comparison view.
  </BaseMessage>
 <!-- <div class="flex justify-end mt-4">
  <BaseButtonIcon @click="addToComparison" size="xs" shape="full" flavor="solid" color="primary" class="p-0.5" data-nui-tooltip-position="left"
  data-nui-tooltip="Add to Compare">
    <Icon name="heroicons:plus-solid" class="h-5 w-5"/>
  </BaseButtonIcon></div>  -->


<div class="grid grid-cols-4 grid-rows-5 gap-4">
  <div class="col-span-2"><EDNATable /> </div>
  <div class=""><DonutChart /></div>
  <div class=" row-span-2 col-start-4"><EnvironmentImage/></div>
  
  
  <!-- <div class="col-span-2"><barChart /></div> -->
  <!-- <div class="col-span-2"><DashboardInfo2 /></div> -->
</div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTitleStore } from '~/stores/titleStore';
import { useComparisonStore } from '~/stores/comparisonStore';
import { useDashboardInfoStore } from '~/stores/dashboardInfoStore';
import EnvironmentImage from './EnvironmentImage.vue';  // Add this line

const props = defineProps();
const id = props.id;

const comparisonStore = useComparisonStore();
const route = useRoute();
const query = ref(route.query);
const titleStore = useTitleStore();
const dashboardInfoStore = useDashboardInfoStore();

const duplicateEnvironment = computed(() => comparisonStore.duplicateEnvironment);
const maxEnvironmentsReached = ref(false);  // This will hold our condition

const addToComparison = () => {
  if (comparisonStore.environments.length >= 5) {
      maxEnvironmentsReached.value = true;
      return;
    }
    maxEnvironmentsReached.value = false; // Reset in case it was true before
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

const queryAsJson = computed(() => JSON.stringify(route.query));

watch(queryAsJson, (newQuery, oldQuery) => {
  if (newQuery !== oldQuery) {
    comparisonStore.clearDuplicateFlag();
  }
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
});
watch(EnvironmentMessage, (newVal) => {
});
</script>
