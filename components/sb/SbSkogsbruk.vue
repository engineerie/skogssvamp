<template>
    <!-- <BaseHeading weight="normal" size="lg"> Skogsbruk</BaseHeading> -->
    <div class="flex gap-10 mb-4">
        <BaseSwitchThin
        v-model="value"
        label="Träd"
        sublabel="Visa marken"
        color="primary"
      />
      <BaseSwitchThin
      v-model="value"
      label="Avverkning"
      sublabel="Avverka träd"
      color="info"
    />
    </div>
    <div class="z-10 grid pb-8 grid-cols-3 gap-4 gap-y-6 py-4 h-fit border-b-[1px] dark:border-neutral-800 border-neutral-300">
        <!-- Iterating over forestryOptions to create icons -->
        <div v-for="(option, index) in forestryOptions" :key="index" @click="selectedTab = option.id" class="cursor-pointer text-center hover:text-green-500">
            <div class="flex justify-center ">
            <div class="w-10 h-10 mb-2 rounded-lg flex justify-center items-center ">              
                <Icon :name="option.icon" class="h-5 w-5" :class="{ 'text-green-500': selectedTab === option.id }"/> 
            </div>
            </div>     
            <BaseHeading weight="normal" size="sm" :class="{ 'text-green-500': selectedTab === option.id }">{{ option.title }}</BaseHeading>
        </div>
    </div>
      
      <!-- Sub Navigation Bar with BaseRadio -->
    <div v-if="selectedTab" class="mt-6">
        <!-- Tab header and information paragraph -->
        <div v-if="selectedTab" class="border-b-[1px] dark:border-neutral-800 border-neutral-300 pb-8">
        <BaseHeading size="lg" weight="normal" class="mb-2">{{ findTabInfo(selectedTab).title }}</BaseHeading>
        <BaseParagraph size="md" weight="normal" class="mb-4 mr-2 text-neutral-500">{{ findTabInfo(selectedTab).description }}</BaseParagraph>
        </div>
        <div>
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

<timeLine/>
   
</template>

  <script setup>
  
  const forestryOptions = [
{ id: 'hyggesstorlek', title: 'Hyggesstorlek', icon: 'material-symbols:resize', radioOptions: ['1 ha', '5 ha', '20 ha'], description: 'Information om hyggesstorlek Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
{ id: 'hansynstrad', title: 'Hänsynsträd', icon: 'pepicons-pop:tree-circle', radioOptions: ['5% Enstaka', '10% Enstaka', '5% Gruppställda', '10% Gruppställda'], description: 'Information om hänsynsträd'  },
{ id: 'gallring', title: 'Gallring', icon: 'tabler:seeding-off', description: 'Information om gallring' },
{ id: 'bladning', title: 'Blädning', icon: 'tabler:christmas-tree-off', description: 'Information om blädning' },
{ id: 'skarmtrad', title: 'Skärmträd', icon: 'simple-icons:redwoodjs', description: 'Information om skärmträd' },
{ id: 'luckhuggning', title: 'Luckhuggning', icon: 'pixelarticons:chess', radioOptions: ['0.05 ha', '0.15 ha', '0.25 ha'], description: 'Information om luckhuggning'  }
];

const selectedTab = ref(null);
const radioValues = reactive({});

const findRadioOptions = (id) => {
const option = forestryOptions.find(option => option.id === id);
return option ? option.radioOptions : [];
};

const findTabInfo = (id) => {
  return forestryOptions.find(option => option.id === id) || {};
};
  </script>
  