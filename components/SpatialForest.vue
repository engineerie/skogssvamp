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
        <div
          class="flex absolute bottom-0 justify-between w-full p-2 items-end"
        >
          <BaseHeading weight="medium" size="xs" class="text-neutral-400"
            >Figuren visar hur mycelutbredningar kan se ut. <br />Ofta täcker ca
            10% av arterna ca 80% av marken.</BaseHeading
          >
          <!-- <div
            class="flex items-end px-3 -mr-2 pb-1 bg-white border-[0.5px] border-neutral-300 rounded-l-full text-neutral-400"
          >
            <BaseHeading size="2xl" weight="medium" class="-mb-1 mx-1.5"
              >{{ data ? data.length : 0 }}
            </BaseHeading>
            <BaseHeading weight="medium" size="xs">Arter</BaseHeading>
          </div> -->
          <div class="flex h-fit shrink-0">
            <div
              class="rounded-l-full flex items-end px-3 -mr-2 py-1 bg-white border-[0.5px] border-r-0 border-neutral-300 text-neutral-400"
            >
              <div class="flex items-end" :data-nui-tooltip="'Mycelform'">
                <!-- <div class="bg-neutral-500 rounded-full w-2 h-2 mr-1"></div> -->

                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 -mr-5 text-gray-500 z-40"
                />
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 -mr-5 text-gray-400 z-30"
                />
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 mr-2 text-gray-300 z-20"
                />

                <BaseHeading
                  size="xs"
                  weight="medium"
                  class="text-neutral-400"
                  :key="imageUrl"
                  >{{ topCount }} Arter</BaseHeading
                >
              </div>
            </div>

            <div
              class="flex items-end px-3 py-1 bg-white border-[0.5px] border-neutral-300 rounded-r-full text-neutral-400 border-l-0"
            >
              <div class="flex items-end" :data-nui-tooltip="'Mycelform'">
                <!-- <div class="bg-violet-500 rounded-full w-2 h-2 mr-1"></div> -->
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 -mr-5 text-yellow-400 z-30"
                />
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 -mr-5 text-lime-400 z-20"
                />
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 -mr-5 text-teal-400 z-10"
                />
                <Icon
                  name="fluent:shape-organic-16-filled"
                  class="h-6 w-6 mr-2 text-rose-400 z-0"
                />

                <BaseHeading size="xs" weight="medium" class="text-neutral-400"
                  >{{ remainingCount }} Arter</BaseHeading
                >
              </div>
            </div>
          </div>
        </div>
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
