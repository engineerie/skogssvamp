<!-- ListBoxRow.vue -->

<template>
    <div class="p-6  bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl">
            <BaseHeading as="h2" size="md" class="mb-4">Select Location</BaseHeading>
        <div  class=" grid grid-cols-5 gap-4 items-end">        
        <BaseListbox v-model="selectedOptions.geography" label="Geography" :items="geographyOptions" placeholder="Select" />
        <BaseListbox v-model="selectedOptions.forestType" label="Forest Type" :items="forestTypeOptions" placeholder="Select" />
        <BaseListbox v-model="selectedOptions.vegetationType" label="Vegetation Type" :items="vegetationTypeOptions" placeholder="Select" />
        <BaseListbox v-model="selectedOptions.standAge" label="Stand Age" :items="standAgeOptions" placeholder="Select"/>
            <div class="self-end ml-2">
              <div v-if="!isButtonDisabled">
                <NuxtLink :to="`/svampdata/dashboard?${generateParams()}`">
                  <BaseButton flavor="solid" color="primary">
                    <span>View Data</span>
                    <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
                  </BaseButton>
                </NuxtLink>
              </div>
              <div v-else>
                <BaseButton disabled flavor="solid" color="primary">
                  <span>View Data</span>
                  <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
                </BaseButton>
              </div>
            </div>
          </div>
          </div>
</template>

  
<script>
  import { useDashboardStore } from '~/stores/dashboardStore';

  export default {
    data() {
      return {
        selectedOptions: {
          geography: null,
          forestType: null,
          vegetationType: null,
          standAge: null
        },
        geographyOptions: ['North Sweden','South Sweden'],
        forestTypeOptions: ['Spruce', 'Pine', 'Mixed Coniferous', 'Mixed Deciduous'],
        vegetationTypeOptions: ['Tall herbs','Low herbs','No field layer','Broad grasses','Narrow grasses','Blueberry','Lingonberry','Crowberry/heather'],
        standAgeOptions: ['1-40 years','41-90 years','91< years'],
      };
    },
    computed: {
    isButtonDisabled() {
      // Check if any of the selected options are null or undefined
      return Object.values(this.selectedOptions).some(option => option === null || option === undefined);
    }
  },
    methods: {
    generateParams() {
      const params = new URLSearchParams(this.selectedOptions).toString();
      const dashboardStore = useDashboardStore();
      return params;
    }
  }
  };
</script>
  
