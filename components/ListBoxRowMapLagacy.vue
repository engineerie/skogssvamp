<template>
  <!-- Geography Options -->
  <div class="bg-neutral-50 w-full">
    <div class="h-24 absolute flex"></div>
    <div class="grid grid-cols-6 gap-5 rounded-xl p-6 w-full">
      <div
        class="p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div class="absolute right-0 top-0">
          <div
            class="w-14 h-14 rounded-lg text-fuchsia-500 flex justify-center items-center"
          >
            <Icon name="material-symbols:location-on-outline" class="h-6 w-6" />
          </div>
        </div>
        <div>
          <label>Plats</label>
          <div
            v-for="option in geographyOptions"
            :key="option.value"
            class="mb-1"
          >
            <div class="flex items-center gap-2">
              <BaseRadio
                color="primary"
                v-model="selectedOptions.geography"
                :value="option.value"
                name="geography"
                :disabled="isOptionDisabled(option)"
              />
              <span
                :class="{ 'disabled-text': isOptionDisabled(option) }"
                class="text-sm"
                >{{ option.label }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Forest Type Options -->
      <div
        class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div class="absolute right-0 top-0">
          <div
            class="w-14 h-14 rounded-lg text-green-500 flex justify-center items-center"
          >
            <Icon name="lucide:trees" class="h-6 w-6" />
          </div>
        </div>
        <div>
          <label>Skogstyp</label>
          <div
            v-for="option in forestTypeOptions"
            :key="option.value"
            class="mb-1"
          >
            <BaseRadio
              color="primary"
              v-model="selectedOptions.forestType"
              :value="option.value"
              :label="option.label"
              name="forestType"
            />
          </div>
        </div>
      </div>
      <!-- Stand Age Options -->
      <div
        class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div class="absolute right-0 top-0">
          <div
            class="w-14 h-14 rounded-lg text-violet-500 flex justify-center items-center"
          >
            <Icon name="carbon:crop-growth" class="h-6 w-6" />
          </div>
        </div>
        <div>
          <label>Beståndsålder</label>
          <div
            v-for="option in standAgeOptions"
            :key="option.value"
            class="mb-1"
          >
            <BaseRadio
              color="primary"
              v-model="selectedOptions.standAge"
              :value="option.value"
              :label="option.label"
              name="standAge"
            />
          </div>
        </div>
      </div>
      <!-- Vegetation Type Options -->
      <div
        class="relative p-6 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200 h-fit"
      >
        <div class="absolute right-0 top-0">
          <div
            class="w-14 h-14 rounded-lg text-teal-500 flex justify-center items-center"
          >
            <Icon name="fluent-emoji-high-contrast:herb" class="h-6 w-6" />
          </div>
        </div>
        <div>
          <label>Markvegetation</label>
          <div
            v-for="option in vegetationTypeOptions"
            :key="option.value"
            class="mb-1"
          >
            <BaseRadio
              color="primary"
              v-model="selectedOptions.vegetationType"
              :value="option.value"
              :label="option.label"
              name="vegetationType"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 mr-12 h-full">
        <div v-if="!isButtonDisabled">
          <NuxtLink :to="generateParams()">
            <BaseButton size="md" flavor="solid" color="primary" shape="full">
              <Icon
                name="material-symbols:travel-explore"
                class="me-1 h-5 w-5"
              />
              <span>Utforska</span>
            </BaseButton>
          </NuxtLink>
        </div>
        <div v-else>
          <BaseButton
            size="md"
            disabled
            flavor="pastel"
            color="muted"
            shape="full"
          >
            <Icon name="material-symbols:travel-explore" class="me-1 h-5 w-5" />
            <span>Utforska</span>
          </BaseButton>
        </div>

        <div
          class="p-6 mt-4 backdrop-blur-3xl rounded-xl bg-neutral-50 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-60 border-[1px] dark:border-neutral-800 border-stone-200"
        >
          info
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const fields = reactive({
  first: "",
});
</script>

<script>
import { useDashboardStore } from "~/stores/dashboardStore";

export default {
  props: {
    geography: String,
    forestType: String,
    standAge: String,
    vegetationType: String,
  },
  data() {
    return {
      listboxProperties: {
        label: "label", // This tells BaseListbox to use the 'label' property of your items for display
      },
      selectedOptions: {
        geography: this.geography,
        forestType: this.forestType,
        vegetationType: this.vegetationType,
        standAge: this.standAge,
      },
      geographyOptions: [
        { value: "Norr", label: "Norra Sverige" },
        { value: "Söder", label: "Södra Sverige" },
      ],
      forestTypeOptions: [
        { value: "Granskog", label: "Granskog" },
        { value: "Tallskog", label: "Tallskog" },
        { value: "Barrblandskog", label: "Blandad barrskog" },
        { value: "Lövblandskog", label: "Blandad lövskog" },
        { value: "Lövskog", label: "Lövskog" },
        { value: "EkBokskog", label: "Ek och Bokskog" },
        { value: "Naturbete", label: "Naturbete" },
      ],
      vegetationTypeOptions: [
        { value: "Högört", label: "Högört" },
        { value: "Lågört", label: "Lågört" },
        { value: "Utan fältskikt", label: "Utan fältskikt" },
        { value: "Bredblad gräs", label: "Bredblad gräs" },
        { value: "Smalblad gräs", label: "Smalblad gräs" },
        { value: "Blåbär", label: "Blåbär" },
        { value: "Lingon", label: "Lingon" },
        { value: "KråkbärLjung", label: "Kråkbär och Ljung" },
      ],
      standAgeOptions: [
        { value: "1-40", label: "1-40 år" },
        { value: "41-90", label: "41-90 år" },
        { value: "91", label: "91 år och äldre" },
        { value: "allaåldrar", label: "Alla åldrar" },
      ],
    };
  },
  watch: {
    geography(newVal) {
      console.log("Geography prop changed:", newVal); // This should log when the prop changes
      this.selectedOptions.geography = newVal;
    },
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
        this.selectedOptions.geography,
        this.selectedOptions.forestType,
        this.selectedOptions.standAge,
        this.selectedOptions.vegetationType,
      ].join("/");
      return `/svampdata/dashboard/${path}`;
    },
    isOptionDisabled(option) {
      return option.label.startsWith("P") || option.value.startsWith("P");
    },
  },
};
</script>
