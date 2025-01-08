<template>
  <div class="">
    <div class="flex gap-8">
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="geographyLabel">
          <div
            class="my-2 mx-1 w-5 h-5 rounded-lg text-fuchsia-500 flex justify-center items-center"
          >
            <Icon name="material-symbols:location-on-outline" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light">
              {{ geographyLabel }}
            </BaseHeading>
          </div>
        </div>
      </transition>
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="forestTypeLabel">
          <div
            class="my-2 mx-1 w-5 h-5 rounded-lg text-green-500 flex justify-center items-center"
          >
            <Icon name="lucide:trees" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light">
              {{ forestTypeLabel }}
            </BaseHeading>
          </div>
        </div>
      </transition>
      <transition name="slide-up" mode="out-in">
        <div class="flex items-center justify-center" :key="standAgeLabel">
          <div
            class="my-2 mx-1 w-5 h-5 rounded-lg text-violet-500 flex justify-center items-center"
          >
            <Icon name="carbon:crop-growth" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light">{{
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
            class="my-2 mx-1 w-5 h-5 rounded-lg text-teal-500 flex justify-center items-center"
          >
            <Icon name="fluent-emoji-high-contrast:herb" class="h-8 w-8" />
          </div>
          <div>
            <BaseHeading size="md" weight="light">{{
              vegetationTypeLabel
            }}</BaseHeading>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

// Define options as reactive references if they might change, or as constants outside the setup function if they are static

// Options for the select fields
const geographyOptions = [
  {
    value: "Norr",
    label: "Norra Sverige",
    description: "Norr om latitud 60°",
  },
  {
    value: "Söder",
    label: "Södra Sverige",
    description: "Söder om latitud 60°",
  },
];

const forestTypeOptions = [
  {
    value: "Granskog",
    label: "Granskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är gran",
  },
  {
    value: "Tallskog",
    label: "Tallskog",
    description: "Minst 70% barrträd, och minst 70% av dessa är tall",
  },
  {
    value: "Barrblandskog",
    label: "Barrblandskog",
    description: "Minst 70% barrträd, men varken tall eller gran uppnår 70%",
  },
  {
    value: "Lövblandskog",
    label: "Blandskog",
    description: "31-69% lövträd respektive barrträd",
  },
  {
    value: "Lövskog",
    label: "Övrig lövskog",
    description: "Minst 70% lövträd",
  },
  {
    value: "EkBokskog",
    label: "Ek och Bokskog",
    description: "Minst 70% lövträd, och minst 70% av dessa är ek eller bok.",
  },
  {
    value: "Naturbete",
    label: "Trädklädd betesmark",
    description: "Trädbevuxna gräsmarker som används för betesdjur.",
  },
];

const standAgeOptions = [
  {
    value: "1-40",
    label: "1-40 år",
    description: "Yngre träd mellan 1 och 40 år.",
  },
  {
    value: "41-90",
    label: "41-90 år",
    description: "Träd mellan 41 och 90 år.",
  },
  {
    value: "91",
    label: "91 år och äldre",
    description: "Äldre träd som är 91 år eller mer.",
  },
  {
    value: "allaåldrar",
    label: "Alla åldrar",
    description: "Inkluderar alla åldersgrupper av träd.",
  },
];

const vegetationTypeOptions = [
  {
    value: "Örter_grupp",
    label: "Örttyper",
    description: "Består av högörter, lågörter och bredbladiga gräs.",
  },
  {
    value: "Blåbär_grupp",
    label: "Blåbärstyper",
    description: "Innehåller blåbär och smalbladiga gräs.",
  },
  {
    value: "Lingon_grupp",
    label: "Lingon-fattigristyper",
    description: "Täcker områden med lingon och kråkbär eller ljung.",
  },
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
