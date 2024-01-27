<!-- ListBoxRow.vue -->

<template>
  <!-- <div class="p-6  bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-[1px] dark:border-stone-700 border-stone-300 rounded-xl"> -->
         <div class="flex items-end">
    <!-- <BaseHeading as="h2" size="md" class="mb-4">Select Location</BaseHeading> -->
      <div  class="w-52 mr-4">     
        <!-- grid grid-cols-5 gap-4 items-end    -->
      <BaseListbox shape="full" contrast="muted" v-model="selectedOptions.geography" label="Geografi" label-float :properties="listboxProperties" :items="geographyOptions" placeholder="Geografi" class="mb-4"/>
      <BaseListbox shape="full" contrast="muted" v-model="selectedOptions.forestType" label="Skogstyp" label-float :properties="listboxProperties"  :items="forestTypeOptions" placeholder="Skogstyp" class="mb-4"/>
      <BaseListbox shape="full" contrast="muted" v-model="selectedOptions.standAge" label="Beståndsålder" label-float :properties="listboxProperties"  :items="standAgeOptions" placeholder="Beståndsålder" class="mb-4"/>
      <BaseListbox shape="full" contrast="muted" v-model="selectedOptions.vegetationType" label="Vegetationstyp" label-float :properties="listboxProperties"  :items="vegetationTypeOptions" placeholder="Vegetationstyp" />
      </div>
      <div class="flex justify-center">
          <div class="mt-4">
            <div v-if="!isButtonDisabled">
              <NuxtLink :to="generateParams()">
                <BaseButton size="md" flavor="solid" color="primary" shape="full">
                  <Icon name="material-symbols:travel-explore" class="me-1 h-6 w-6" />
                  <span>Utforska</span>
                </BaseButton>
              </NuxtLink>
            </div>
            <div v-else>
              <BaseButton size="md" disabled flavor="pastel" color="muted" shape="full">
                <Icon name="material-symbols:travel-explore" class="me-1 h-6 w-6" />
                <span>Utforska</span>
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
    listboxProperties: {
        label: 'label' // This tells BaseListbox to use the 'label' property of your items for display
      },
    selectedOptions: {
      geography: null,
      forestType: null,
      vegetationType: null,
      standAge: null
    },
    geographyOptions: [
      { value: 'North Sweden', label: 'Norra Sverige' },
      { value: 'South Sweden', label: 'Södra Sverige' }
    ],
    forestTypeOptions: [
      { value: 'Spruce', label: 'Gran' },
      { value: 'Pine', label: 'Tall' },
      { value: 'Mixed Coniferous', label: 'Blandad barrskog' },
      { value: 'Mixed Deciduous', label: 'Blandad lövskog' }
    ],
    vegetationTypeOptions: [
      { value: 'Tall herbs', label: 'Högört' },
      { value: 'Low herbs', label: 'Lågört' },
      { value: 'No field layer', label: 'Kalmark' },
      { value: 'Broad grasses', label: 'Bredblad gräs' },
      { value: 'Narrow grasses', label: 'Smalblad gräs' },
      { value: 'Blueberry', label: 'Blåbär' },
      { value: 'Lingonberry', label: 'Lingon' },
      { value: 'Crowberry/heather', label: 'Kråkbär/Ljung' }
    ],
    standAgeOptions: [
      { value: '1-40 years', label: '1-40 år' },
      { value: '41-90 years', label: '41-90 år' },
      { value: '91< years', label: '91 år och äldre' },
    ]
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
    const path = [
      this.selectedOptions.geography.value,
      this.selectedOptions.forestType.value,
      this.selectedOptions.standAge.value,
      this.selectedOptions.vegetationType.value
    ].join('/');
    return `/svampdata/dashboard/${path}`;
  }
}

};
</script>

