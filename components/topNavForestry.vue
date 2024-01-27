<template>
    <div class="pl-28 fixed z-10 grid grid-cols-8 w-screen px-3 py-4 h-fit bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-100 border-b-[1px] dark:border-neutral-800 border-neutral-300">
        <!-- Iterating over forestryOptions to create icons -->
        <div v-for="(option, index) in forestryOptions" :key="index" class="text-center">
          <div class="flex justify-center">
            <div @click="selectedTab = option.id" class="cursor-pointer w-10 h-10 mb-2 rounded-lg flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
              <Icon :name="option.icon" class="h-5 w-5" :class="{ 'text-green-500': selectedTab === option.id }"/> 
            </div>
          </div>     
          <BaseHeading weight="normal" size="sm" :class="{ 'text-green-500': selectedTab === option.id }">{{ option.title }}</BaseHeading>
        </div>
      </div>
      
      <!-- Sub Navigation Bar with BaseRadio -->
      <div v-if="selectedTab" class="absolute z-10 top-28 w-fit left-20 ml-2 dark:bg-neutral-900 dark:bg-opacity-50 backdrop-blur-sm border-[1px] rounded-full dark:border-neutral-800 border-neutral-300">
        <div class="text-center flex">
          <div v-for="(option, index) in findRadioOptions(selectedTab)" :key="index" class="mt-1 mb-2 mx-4">
            <BaseRadio 
              v-model="radioValues[selectedTab]"
              :name="`radio-${selectedTab}`"
              :value="option"
              :label="option"
              color="primary" />
          </div>
        </div>
      </div>
</template>

  <script setup>
  
  const forestryOptions = [
{ id: 'hyggesstorlek', title: 'Hyggesstorlek', icon: 'material-symbols:resize', radioOptions: ['1 ha', '5 ha', '20 ha'] },
{ id: 'hansynstrad', title: 'Hänsynsträd', icon: 'pepicons-pop:tree-circle', radioOptions: ['5% Enstaka', '10% Enstaka', '5% Gruppställda', '10% Gruppställda'] },
{ id: 'gallring', title: 'Gallring', icon: 'tabler:seeding-off'},
{ id: 'bladning', title: 'Blädning', icon: 'tabler:christmas-tree-off'},
{ id: 'skarmtrad', title: 'Skärmträd', icon: 'simple-icons:redwoodjs'},
{ id: 'luckhuggning', title: 'Luckhuggning', icon: 'pixelarticons:chess', radioOptions: ['0.05 ha', '0.15 ha', '0.25 ha'] }
];

const selectedTab = ref(null);
const radioValues = reactive({});

const findRadioOptions = (id) => {
const option = forestryOptions.find(option => option.id === id);
return option ? option.radioOptions : [];
};
  </script>
  