<template>
  <!-- Info Button -->
  <!-- <BaseIconBox
    shape="full"
    size="xs"
    variant="solid"
    color="muted"
    class="z-50 fixed top-2 right-2 border-muted-200 dark:border-muted-600 dark:bg-muted-700 border bg-white text-gray-500"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Icon name="material-symbols:info-i-rounded" class="size-4" />
  </BaseIconBox>

  <Transition name="fade">
    <UCard
      v-show="isHovered"
      class="z-50 fixed top-12 right-2 ml-12 bg-opacity-90 backdrop-blur-lg text-neutral-800 dark:text-neutral-300"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <BaseHeading weight="medium" size="sm">
        Figuren illustrerar hur utbredningen av mykorrhizasvampars mycel kan se
        ut i 41-90 år gamla tallskogar med blåbärsris i norra Sverige. De olika
        färgerna representerar olika svampars frekvens: grått indikerar de
        vanligaste arterna (4 arter), grönt visar de mindre vanliga arterna (10
        arter), och lila representerar de ovanliga arterna (187 arter).
      </BaseHeading>
    </UCard>
  </Transition> -->

  <!-- Image Section -->
  <div class="justify-center">
    <div v-if="imageUrl">
      <div class="relative">
        <NuxtImg
          height="505"
          width="805"
          :src="imageUrl"
          class="image-fit border-[1px] dark:border-neutral-700 border-neutral-200 rounded-xl"
          format="webp"
        />
      </div>
    </div>
    <BasePlaceload v-else class="h-20 w-32 mb-12 rounded-lg" />

    <div class="hidden">
      <NuxtImg
        v-for="(src, index) in allImageUrls"
        :key="index"
        :src="src"
        height="505"
        width="805"
        format="webp"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// State to track hover status
const isHovered = ref(false);

// Define props to receive data from parent
const props = defineProps({
  geography: String,
  forestType: String,
  vegetationType: String,
  standAge: String,
  data: {
    type: Array,
    required: true,
  },
  topCount: {
    type: Number,
    required: true,
  },
  remainingCount: {
    type: Number,
    required: true,
  },
});

// Destructure props for easier access
const { data, topCount, remainingCount } = props;

// Convert the props to an image filename
const imageUrl = computed(() => {
  if (
    props.geography &&
    props.forestType &&
    props.vegetationType &&
    props.standAge
  ) {
    const imageName = `${props.geography}_${props.forestType}_${props.standAge}_${props.vegetationType}`;

    const finalUrl = `/images/EDNA_bilder_skog/${imageName}.png`;
    console.log("Returning dynamic URL:", finalUrl);
    return finalUrl;
  }
});

// List of possible values for each prop
const geographies = ["Norr", "Söder"];
const forestTypes = [
  "Granskog",
  "Tallskog",
  "Barrblandskog",
  "Lövblandskog",
  "Lövskog",
  "Naturbete",
  "EkBokskog",
];
const vegetationTypes = ["Örter_grupp", "Blåbär_grupp", "Lingon_grupp"];
const standAges = ["1-40", "41-90", "91", "allaåldrar"];

// Generate all possible image URLs
const allImageUrls = computed(() => {
  const urls = [];
  for (const geography of geographies) {
    for (const forestType of forestTypes) {
      for (const vegetationType of vegetationTypes) {
        for (const standAge of standAges) {
          const imageName = `${geography}_${forestType}_${standAge}_${vegetationType}`;

          urls.push(`/images/EDNA_bilder_skog/${imageName}.png`);
        }
      }
    }
  }
  return urls;
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
