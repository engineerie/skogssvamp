<!-- Redlisted.vue -->
<template>
    <div class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200">
      <div class="grid grid-cols-4 mb-8">
        <div class="col-span-3">
          <div>
            <BaseHeading size="md">Rödlistade svampar</BaseHeading>
            <BaseParagraph size="sm" class="mb text-neutral-500">Rödlistade arter som kan förekomma i denna miljö. </BaseParagraph>
          </div> 
        </div>
        <div class="col-span-1 flex justify-end"> 
          <div class="w-12 h-12 mb-4 text-red-500 flex justify-center items-center  rounded-full border-red-500 ">              
            <Icon name="ph:warning-duotone" class="h-8 w-8" /> 
          </div>   
          <!-- <div class="dark:opacity-90 w-12 h-12 mb-4 rounded-lg text-red-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
            <Icon name="ph:warning-duotone" class="h-6 w-6" /> 
          </div>    -->
        </div>
      </div>      
      <!-- List of mushrooms -->
      <div v-for="(mushroom, index) in paginatedMushrooms" :key="index" class="flex justify-between items-center my-4">
       <div class="flex items-center">
        <div :class="getStatusColor(mushroom.status)" class="h-8 w-8 rounded-full flex items-center justify-center mr-4">
          <span class="text-white font-semibold">{{ getStatusAbbreviation(mushroom.status) }}</span>
      </div>
        <div>
            <BaseProse class="text-neutral-500">{{ mushroom.name }}</BaseProse>
            <BaseProse class="text-xs text-neutral-500">{{ mushroom.status }}</BaseProse>
        </div>
      </div>
        <div class="flex items-center">
            <!-- Status circle -->
            
            <BaseIconBox size="xs" shape="full" class="border-muted-200 dark:border-muted-600 dark:bg-muted-700 border bg-white text-gray-500">
                <Icon name="material-symbols:arrow-forward" class="h-4 w-4" />
            </BaseIconBox>
        </div>
    </div>
  
      <!-- Pagination -->
      <BasePagination
      class="mt-6"
        :item-per-page="itemsPerPage"
        :total-items="mushrooms.length"
        :current-page="currentPage"
        :max-links-displayed="5"
        @update:current-page="handlePageChange"
        :no-router="true"
        shape="full"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';


function getStatusAbbreviation(status) {
    const abbreviations = {
        'Nära hotad': 'NT',
        'Hotad': 'EN',
        'Sårbar': 'VU',
        'Akut hotad': 'CR',
        'Starkt hotad': 'EN',
        'Nationellt utdöd': 'RE',
        'Kunskapsbrist': 'DD'
    };
    return abbreviations[status] || '';
}

function getStatusColor(status) {
    const colors = {
        'Nära hotad': 'bg-rose-400', // Lighter shade for less severe status
        'Hotad': 'bg-rose-500',
        'Sårbar': 'bg-rose-600',
        'Akut hotad': 'bg-rose-700',
        'Starkt hotad': 'bg-rose-800',
        'Nationellt utdöd': 'bg-rose-900', // Darker shade for more severe status
        'Kunskapsbrist': 'bg-rose-300' // Different shade for DD
    };
    return colors[status] || 'bg-rose-50'; // Default color
}
  
  const mushrooms = ref([
  { name: 'Bombmurkla', status: 'Nära hotad' },
    { name: 'Blåtryffel', status: 'Hotad' },
    { name: 'Sienamusseron', status: 'Nära hotad' },
    { name: 'Strimsporig hjorttryffel', status: 'Nära hotad' },
    { name: 'Taggig hjorttryffel', status: 'Nära hotad' },
    { name: 'Grönticka', status: 'Nära hotad' },
    { name: 'Stäppfingersvamp', status: 'Nära hotad' },
    { name: 'Rökpipsvamp', status: 'Hotad' },
    { name: 'Slöjröksvamp', status: 'Hotad' },
    { name: 'Vit stjälkröksvamp', status: 'Nära hotad' }
  ]);
  
  const currentPage = ref(1); // Standalone current page state
  const itemsPerPage = 5;
  
  const paginatedMushrooms = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return mushrooms.value.slice(start, start + itemsPerPage);
  });
  
  function handlePageChange(newPage) {
    currentPage.value = newPage; // Update the current page
  }
  </script>
  