<!-- ListBoxRow.vue -->

<template>
  <div
    class="p-6 border-[1px] dark:border-stone-700 border-stone-200 rounded-xl"
  >
    <div class="pr-2">
      <!-- <h1 as="h2" size="md" class="mb-4">Select Location</h1> -->
      <div class="">
        <!-- grid grid-cols-5 gap-4 items-end    -->
        <USelectMenu
          shape="full"
          v-model="selectedOptions.geography"
          label="Geografi"
          :properties="listboxProperties"
          :items="geographyOptions"
          placeholder="Välj"
          class="mb-3"
        />
        <USelectMenu
          shape="full"
          v-model="selectedOptions.forestType"
          label="Skogsstyp"
          :properties="listboxProperties"
          :items="forestTypeOptions"
          placeholder="Välj"
          class="mb-3"
        />
        <USelectMenu
          shape="full"
          v-model="selectedOptions.standAge"
          label="Beståndsålder"
          :properties="listboxProperties"
          :items="standAgeOptions"
          placeholder="Välj"
          class="mb-3"
        />
        <USelectMenu
          shape="full"
          v-model="selectedOptions.vegetationType"
          label="Vegetationstyp"
          :properties="listboxProperties"
          :items="vegetationTypeOptions"
          placeholder="Välj"
        />
      </div>
    </div>
  </div>
  <div class="mt-4 flex justify-end mr-2">
    <div v-if="!isButtonDisabled">
      <NuxtLink :to="generateParams()">
        <UButton shape="full" size="sm" flavor="solid" color="primary">
          <span>Utforska</span>
          <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
        </UButton>
      </NuxtLink>
    </div>
    <div v-else>
      <UButton shape="full" size="sm" disabled flavor="solid" color="primary">
        <span>Utforska</span>
        <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
      </UButton>
    </div>
  </div>
</template>

<script>
import { useDashboardStore } from "~/stores/dashboardStore";

export default {
  data() {
    return {
      listboxProperties: {
        label: "label", // This tells USelectMenu to use the 'label' property of your items for display
      },
      selectedOptions: {
        geography: null,
        forestType: null,
        vegetationType: null,
        standAge: null,
      },
      geographyOptions: [
        { value: "North Sweden", label: "Norra Sverige" },
        { value: "South Sweden", label: "Södra Sverige" },
      ],
      forestTypeOptions: [
        { value: "Spruce", label: "Gran" },
        { value: "Pine", label: "Tall" },
        { value: "Mixed Coniferous", label: "Blandad barrskog" },
        { value: "Mixed Deciduous", label: "Blandad lövskog" },
      ],
      vegetationTypeOptions: [
        { value: "Tall herbs", label: "Högört" },
        { value: "Low herbs", label: "Lågört" },
        { value: "No field layer", label: "Kalmark" },
        { value: "Broad grasses", label: "Bredblad gräs" },
        { value: "Narrow grasses", label: "Smalblad gräs" },
        { value: "Blueberry", label: "Blåbär" },
        { value: "Lingonberry", label: "Lingon" },
        { value: "Crowberry/heather", label: "Kråkbär/Ljung" },
      ],
      standAgeOptions: [
        { value: "1-40 years", label: "1-40 år" },
        { value: "41-90 years", label: "41-90 år" },
        { value: "91< years", label: "91 år och äldre" },
      ],
    };
  },
  computed: {
    isButtonDisabled() {
      // Check if any of the selected options are null or undefined
      return Object.values(this.selectedOptions).some(
        (option) => option === null || option === undefined
      );
    },
  },
  methods: {
    generateParams() {
      const path = [
        this.selectedOptions.geography.value,
        this.selectedOptions.forestType.value,
        this.selectedOptions.standAge.value,
        this.selectedOptions.vegetationType.value,
      ].join("/");
      return `/mykorrhizasvampar/${path}`;
    },
  },
};
</script>
