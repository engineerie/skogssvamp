<template>
  <div class="relative">
    <div class="grid grid-cols-4 gap-5">
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="geographyLabel">
          <div
            class="my-4 w-14 h-14 rounded-lg text-fuchsia-500 flex justify-center items-center"
          >
            <Icon name="material-symbols:location-on-outline" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light" class="text-neutral-500"
              >Plats</BaseHeading
            >

            <BaseHeading size="2xl" weight="light">
              {{ geographyLabel }}
            </BaseHeading>
          </div>
        </div>
      </transition>
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="forestTypeLabel">
          <div
            class="my-4 w-14 h-14 rounded-lg text-green-500 flex justify-center items-center"
          >
            <Icon name="lucide:trees" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light" class="text-neutral-500"
              >Skogstyp</BaseHeading
            >
            <BaseHeading size="2xl" weight="light">
              {{ forestTypeLabel }}
            </BaseHeading>
          </div>
        </div>
      </transition>
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="standAgeLabel">
          <div
            class="my-4 w-14 h-14 rounded-lg text-violet-500 flex justify-center items-center"
          >
            <Icon name="carbon:crop-growth" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light" class="text-neutral-500"
              >Beståndsålder</BaseHeading
            >
            <BaseHeading size="2xl" weight="light">{{
              standAgeLabel
            }}</BaseHeading>
          </div>
        </div>
      </transition>
      <transition name="slide-up" mode="out-in">
        <div
          class="flex items-center justify-center"
          :key="vegetationTypeLabel"
        >
          <div
            class="my-4 w-14 h-14 rounded-lg text-teal-500 flex justify-center items-center"
          >
            <Icon name="fluent-emoji-high-contrast:herb" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light" class="text-neutral-500"
              >Markvegetation</BaseHeading
            >
            <BaseHeading size="2xl" weight="light">{{
              vegetationTypeLabel
            }}</BaseHeading>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <!-- Apply dynamic style for height transition -->
  <div
    :style="{ height: listBoxRowHeight }"
    class="overflow-hidden transition-height ease-in-out duration-500"
  >
    <ListBoxRowHorizontal />
  </div>
  <div class="flex justify-end">
    <BaseButtonAction @click="toggleHeight" shape="full" class="mb-2">
      <span class="ml-2">
        {{ listBoxRowVisible ? "Ny miljö" : "Ny miljö" }}
      </span>
      <Icon
        :name="listBoxRowVisible ? 'mdi:chevron-up' : 'mdi:chevron-down'"
        class="h-6 w-6"
      />
    </BaseButtonAction>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const listBoxRowVisible = ref(false);
const listBoxRowHeight = ref("0px");

const toggleHeight = () => {
  listBoxRowVisible.value = !listBoxRowVisible.value;
  listBoxRowHeight.value = listBoxRowVisible.value ? "275px" : "0px";
};

const route = useRoute();
const router = useRouter();

// Define options as reactive references if they might change, or as constants outside the setup function if they are static
const geographyOptions = [
  { value: "Norr", label: "Norra Sverige" },
  { value: "Söder", label: "Södra Sverige" },
];
const forestTypeOptions = [
  { value: "Granskog", label: "Granskog" },
  { value: "Tallskog", label: "Tallskog" },
  { value: "Barrblandskog", label: "Blandad barrskog" },
  { value: "Lövblandskog", label: "Blandad lövskog" },
  { value: "Lövskog", label: "Lövskog" },
  { value: "EkBokskog", label: "Ek och Bokskog" },
  { value: "Naturbete", label: "Naturbete" },
];
const standAgeOptions = [
  { value: "1-40", label: "1-40 år" },
  { value: "41-90", label: "41-90 år" },
  { value: "91", label: "91 år och äldre" },
  { value: "allaåldrar", label: "Alla åldrar" },
];
const vegetationTypeOptions = [
  { value: "Högört", label: "Högört" },
  { value: "Lågört", label: "Lågört" },
  { value: "Utan fältskikt", label: "Utan fältskikt" },
  { value: "Bredblad gräs", label: "Bredblad gräs" },
  { value: "Smalblad gräs", label: "Smalblad gräs" },
  { value: "Blåbär", label: "Blåbär" },
  { value: "Lingon", label: "Lingon" },
  { value: "KråkbärLjung", label: "Kråkbär och Ljung" },
];

// Computed properties to get the labels from the options based on the URL parameters
const geographyLabel = computed(() => {
  const param = decodeURIComponent(route.params.geography || "");
  const option = geographyOptions.find((o) => o.value === param);
  return option ? option.label : param; // Fall back to raw value if no label is found
});
const forestTypeLabel = computed(() => {
  const param = decodeURIComponent(route.params.forestType || "");
  const option = forestTypeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
const standAgeLabel = computed(() => {
  const param = decodeURIComponent(route.params.standAge || "");
  const option = standAgeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
const vegetationTypeLabel = computed(() => {
  const param = decodeURIComponent(route.params.vegetationType || "");
  const option = vegetationTypeOptions.find((o) => o.value === param);
  return option ? option.label : param;
});
</script>

<style scoped>
/* Specific transition for height */
.transition-height {
  transition: height 0.5s ease-in-out;
}

/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
