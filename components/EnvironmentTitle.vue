<template>
    <div class="relative">
    <div class="grid grid-cols-4 gap-5">
        <div class="flex items-center justify-center">
          <div class=" my-4 w-14 h-14 rounded-lg text-fuchsia-500 flex justify-center items-center ">              
          <Icon name="material-symbols:location-on-outline" class="h-8 w-8" /> 
        </div>  
        <div>
        <BaseHeading size="md" weight="light" class="text-neutral-500">Plats</BaseHeading>
        <BaseHeading size="2xl" weight="light">{{ geographyLabel }}</BaseHeading>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="my-4 w-14 h-14 rounded-lg text-green-500 flex justify-center items-center">              
        <Icon name="lucide:trees" class="h-8 w-8" /> 
      </div> 
      <div>
        <BaseHeading size="md" weight="light" class="text-neutral-500">Skogstyp</BaseHeading>
        <BaseHeading size="2xl" weight="light" >{{ forestTypeLabel }}</BaseHeading>
        </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="my-4 w-14 h-14 rounded-lg text-violet-500 flex justify-center items-center">              
        <Icon name="carbon:crop-growth" class="h-8 w-8" /> 
      </div> 
      <div>
        <BaseHeading size="md" weight="light" class="text-neutral-500">Beståndsålder</BaseHeading>
        <BaseHeading size="2xl" weight="light" >{{ standAgeLabel }}</BaseHeading>
        </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="my-4 w-14 h-14 rounded-lg text-teal-500 flex justify-center items-center" >              
        <Icon name="fluent-emoji-high-contrast:herb" class="h-8 w-8" /> 
      </div> 
      <div>
        <BaseHeading size="md" weight="light" class="text-neutral-500">Markvegetation</BaseHeading>
        <BaseHeading size="2xl" weight="light">{{ vegetationTypeLabel }}</BaseHeading>
        </div>
    </div>
       
    </div>
</div>
<div class="flex justify-end">
<BaseButtonAction @click="toggleHeight" shape="full" class="mb-2">  
        <span class="ml-2">
          {{ listBoxRowVisible ? 'Ny miljö' : 'Ny miljö' }}
        </span>
        <Icon :name="listBoxRowVisible ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="h-6 w-6" />
</BaseButtonAction>
</div>

    <!-- Apply dynamic style for height transition -->
    <div :style="{ height: listBoxRowHeight }" class="overflow-hidden transition-height ease-in-out duration-500">
    <ListBoxRowHorizontal
      :geography="props.geography"
      :forestType="props.forestType"
      :standAge="props.standAge"
      :vegetationType="props.vegetationType"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const listBoxRowVisible = ref(false);
const listBoxRowHeight = ref('0px'); // Initial height is 0px

// Method to toggle the height
const toggleHeight = () => {
    listBoxRowVisible.value = !listBoxRowVisible.value;
    listBoxRowHeight.value = listBoxRowVisible.value ? '360px' : '0px';
};

const props = defineProps({
  geography: String,
  forestType: String,
  standAge: String,
  vegetationType: String
});

const geographyOptions = [
      { value: 'North Sweden', label: 'Norra Sverige' },
      { value: 'South Sweden', label: 'Södra Sverige' }
    ],
    forestTypeOptions = [
      { value: 'Spruce', label: 'Gran' },
      { value: 'Pine', label: 'Tall' },
      { value: 'Mixed Coniferous', label: 'Blandad barrskog' },
      { value: 'Mixed Deciduous', label: 'Blandad lövskog' }
    ],
    vegetationTypeOptions = [
      { value: 'Tall herbs', label: 'Högört' },
      { value: 'Low herbs', label: 'Lågört' },
      { value: 'No field layer', label: 'Kalmark' },
      { value: 'Broad grasses', label: 'Bredblad gräs' },
      { value: 'Narrow grasses', label: 'Smalblad gräs' },
      { value: 'Blueberry', label: 'Blåbär' },
      { value: 'Lingonberry', label: 'Lingon' },
      { value: 'Crowberry/heather', label: 'Kråkbär/Ljung' }
    ],
    standAgeOptions = [
      { value: '1-40 years', label: '1-40 år' },
      { value: '41-90 years', label: '41-90 år' },
      { value: '91< years', label: '91 år och äldre' },
    ];

const getLabel = (value, options) => {
  const option = options.find(option => option.value === value);
  return option ? option.label : '';
};

const geographyLabel = computed(() => getLabel(props.geography, geographyOptions));
const forestTypeLabel = computed(() => getLabel(props.forestType, forestTypeOptions));
const vegetationTypeLabel = computed(() => getLabel(props.vegetationType, vegetationTypeOptions));
const standAgeLabel = computed(() => getLabel(props.standAge, standAgeOptions));
</script>

<style>
/* Specific transition for height */
.transition-height {
  transition: height 0.5s ease-in-out;
}
</style>
