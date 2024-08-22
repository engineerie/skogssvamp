<template>
  <div class="justify-center">
    <NuxtImg
      height="505"
      width="805"
      v-if="imageUrl"
      :src="imageUrl"
      class="image-fit border-b-[1px] dark:border-neutral-700 border-neutral-200"
      format="webp"
    />
    <BasePlaceload v-else class="h-20 w-32 mb-12 rounded-lg" />
    <div class="p-4 text-sm text-neutral-500">
      <p>
        Figuren illustrerar hur utbredningen av mykorrhizasvampars mycel kan se
        ut i 41-90 år gamla tallskogar med blåbärsris i norra Sverige. De olika
        färgerna representerar olika svampars frekvens: grått indikerar de
        vanligaste arterna (4 arter), grönt visar de mindre vanliga arterna (10
        arter), och lila representerar de ovanliga arterna (187 arter).
      </p>
    </div>
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
import { computed } from "vue";

// Define props to receive data from the parent component
const props = defineProps({
  geography: String,
  forestType: String,
  vegetationType: String,
  standAge: String,
});

// Convert the props to an image filename
const imageUrl = computed(() => {
  if (
    props.geography &&
    props.forestType &&
    props.vegetationType &&
    props.standAge
  ) {
    const imageName =
      `${props.geography}-${props.forestType}-${props.vegetationType}-${props.standAge}`
        .toLowerCase()
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/-+/g, "_") // Replace hyphens with underscores
        .replace(/[<>]+/g, "_"); // Remove any < or > characters
    const finalUrl = `/images/bilderDNASkog/${imageName}.png`;
    console.log("Returning dynamic URL:", finalUrl);
    return finalUrl;
  }
});

// List of possible values for each prop
const geographies = ["norr", "söder"];
const forestTypes = [
  "granskog",
  "tallskog",
  "barrblandskog",
  "lövblandskog",
  "lövskog",
  "naturbete",
  "EkBokskog",
];
const vegetationTypes = [
  "Högört",
  "Lågört",
  "Utan fältskikt",
  "Bredblad gräs",
  "Smalblad gräs",
  "Blåbär",
  "Lingon",
  "KråkbärLjung",
];
const standAges = ["1-40", "41-90", "91", "allaåldrar"];

// Generate all possible image URLs
const allImageUrls = computed(() => {
  const urls = [];
  for (const geography of geographies) {
    for (const forestType of forestTypes) {
      for (const vegetationType of vegetationTypes) {
        for (const standAge of standAges) {
          const imageName =
            `${geography}-${forestType}-${vegetationType}-${standAge}`
              .toLowerCase()
              .replace(/\s+/g, "_") // Replace spaces with underscores
              .replace(/-+/g, "_") // Replace hyphens with underscores
              .replace(/[<>]+/g, "_"); // Remove any < or > characters
          urls.push(`/images/bilderDNASkog/${imageName}.png`);
        }
      }
    }
  }
  return urls;
});
</script>
