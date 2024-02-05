<template>
  <div class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200">
    <div class="grid grid-cols-4 mb-8">
    <div class="col-span-3">
      <div>
        <BaseHeading size="md">Matsvampar</BaseHeading>
        <BaseParagraph size="sm" class="mb text-neutral-500">Ätbara arter som kan förekomma i denna miljö.</BaseParagraph>
      </div> 
    </div>
    <div class="col-span-1 flex justify-end"> 
      <!-- <div class="w-12 h-12 mb-4 rounded-lg text-yellow-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="fluent:food-16-filled" class="h-6 w-6" /> 
        </div>   -->
        <div class="w-12 h-12 mb-4 text-yellow-500 flex justify-center items-center  rounded-full border-yellow-500 ">              
          <Icon name="fluent:food-16-filled" class="h-8 w-8" /> 
        </div>  
    </div>
  </div>    
    <!-- List of mushrooms -->
    <div v-for="(mushroom, index) in paginatedMushrooms" :key="index" class="flex justify-between my-4">
      <div>
        <BaseProse class="text-neutral-500">{{ mushroom.name }}</BaseProse>
        <div class="flex">
          <span v-for="n in mushroom.edibilityRating" :key="n">
            <Icon name="material-symbols:star-rate-rounded" class="h-4 w-4 text-yellow-500" />
          </span>
        </div>
      </div>
      <BaseButtonIcon to="https://svampguiden.com/art/visa/leccinum_rufum" target="_blank" shape="full" size="sm">
      <Icon name="material-symbols:arrow-forward" class="size-4" />
    </BaseButtonIcon>
      <!-- <BaseIconBox size="xs" shape="full" class="border-muted-200 dark:border-muted-600 dark:bg-muted-700 border bg-white text-gray-500">
        <Icon name="" class="h-4 w-4" />
      </BaseIconBox> -->
    </div>

   
    <BasePagination
    class="mt-6"
    :item-per-page="itemsPerPage"
    :total-items="mushrooms.length"
    :current-page="currentPage"
    :max-links-displayed="1"
    @update:current-page="handlePageChange"
    :no-router="true"
    shape="full"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Hardcoded data for demonstration
const mushrooms = ref([
  { name: 'Aspsopp', edibilityRating: 3 },
  { name: 'Björksopp', edibilityRating: 3 },
  { name: 'Blek kantarell', edibilityRating: 5 },
  { name: 'Blek ostron­mussling', edibilityRating: 4 },
  { name: 'Blek taggsvamp', edibilityRating: 5 },
  { name: 'Blod­champinjon', edibilityRating: 3 },
  { name: 'Blomkålssvamp', edibilityRating: 5 },
  { name: 'Blå­musseron', edibilityRating: 3 },
  { name: 'Brok­kremla', edibilityRating: 3 },
  { name: 'Brunsopp', edibilityRating: 4 },
  { name: 'Brödticka', edibilityRating: 1 },

  // ... add more mushrooms with their edibility ratings
]);

const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedMushrooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return mushrooms.value.slice(start, start + itemsPerPage);
});

function handlePageChange(newPage) {
  currentPage.value = newPage;
}
</script>
