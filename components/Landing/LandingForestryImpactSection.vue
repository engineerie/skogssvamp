<template>
  <div class="mt-44 mb-44">
    <div class="text-center mx-24">
      <BaseHeading
        size="5xl"
        lead="tight"
        class="text-neutral-950 dark:text-neutral-200"
      >
        Hur påverkar skogsskötsel
      </BaseHeading>
      <BaseHeading
        lead="tight"
        size="5xl"
        class="text-primary-500 dark:text-neutral-200 mb-1"
      >
        mykorrhizasvampar?
      </BaseHeading>
      <!-- Description -->
      <BaseHeading
        weight="semi-bold"
        size="xl"
        class="text-neutral-500 dark:text-neutral-400 mb-6"
      >
        Här visualiserar vi baserat på den kunskap som finns hur olika
        skogsskötsel, olika former av trakthyggesbruk och hyggesfria metoder,
        påverkar förekomsten av mykorrhizasvampar under en skogsgeneration.
      </BaseHeading>

      <!-- Navigation Buttons -->

      <NuxtLink to="/skogsbruk">
        <BaseButton color="primary" type="outline" size="md" shape="full">
          <Icon
            name="material-symbols:nature-people-outline-rounded"
            class="-ms-1 mr-1 size-6"
          />
          <span>Skogsskötsel</span>
        </BaseButton>
      </NuxtLink>
    </div>
    <div class="container mx-auto px-6">
      <div class="mt-6 items-center gap-20">
        <!-- Left Column: Text Content -->

        <!-- Right Column: Image Slideshow -->
        <div>
          <div
            class="relative w-full pb-[56.25%] mb-2 rounded-2xl overflow-hidden"
            @mouseover="stopSlideshow"
            @mouseleave="startSlideshow"
          >
            <!-- Initial Image (optional for preload) -->
            <NuxtImg
              src="/images/landing_skogsbruk/trakthygge_20_visa_visa_naturskog.webp"
              height="1000"
              class="absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-0"
              alt="Trakthyggesbruk 20% påverkan"
            />
            <!-- Slideshow Images -->
            <div
              v-for="(image, index) in images"
              :key="index"
              :class="[
                'absolute top-0 left-0 w-full h-full transition-opacity duration-1000',
                index === currentImageIndex ? 'opacity-100' : 'opacity-0',
              ]"
            >
              <NuxtImg
                :src="image.src"
                height="1000"
                class="w-full h-full object-cover rounded-2xl"
                :alt="image.alt"
              />
            </div>
            <div
              v-for="(image, index) in images"
              :key="`info-${index}`"
              :class="[
                'absolute left-3 bottom-3 mt-4 p-4 w-96 rounded-xl bg-white dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30',
                index === currentImageIndex ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-1000',
              ]"
            >
              <UBadge
                :ui="{ rounded: 'rounded-full' }"
                color="primary"
                variant="outline"
                class="mb-2 mr-2"
              >
                {{ image.tid }}
              </UBadge>

              <div class="mb-2">
                <div class="flex gap-2 mb-2">
                  <div class="size-5">
                    <Icon
                      name="lucide:trees"
                      class="w-5 h-5 icon text-primary-500"
                    />
                  </div>
                  <BaseHeading size="sm" weight="thin" class="text-neutral-600">
                    {{ image.skog }}
                  </BaseHeading>
                </div>
                <div class="flex gap-2 mb-2">
                  <div class="size-5">
                    <Icon
                      name="fluent:shape-organic-24-filled"
                      class="size-5 text-primary-500 icon"
                    />
                  </div>
                  <BaseHeading size="sm" weight="thin" class="text-neutral-600">
                    {{ image.svamp }}
                  </BaseHeading>
                </div>
              </div>
            </div>
          </div>
          <div class="relative"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingForestryImpactSection",
  data() {
    return {
      images: [
        {
          src: "/images/landing_skogsbruk/trakthygge_före_visa_visa_naturskog.webp",
          alt: "Trakthyggesbruk före påverkan",
          skog: "Äldre skog",
          svamp:
            "Rikligt med mykorhizasvampar med många olika arter. Goda förutsättningar för matsvampar. Rödlistade svampar kan finnas. Gamla svampindivider som kan ha stora mycelstorlekar.",
          tid: "Före avverkning",
        },
        {
          src: "/images/landing_skogsbruk/trakthygge_efter_visa_visa_naturskog.webp",
          alt: "Trakthyggesbruk efter påverkan",
          skog: "Kalaverkning med 5% naturhänsyn i form av enstaka och grupper av hänsynsträd samt högstubbar.",
          svamp:
            "Merparten av mykorrhizasvamparnas mycel tynar bort och dör. Svampmycel överlever vid hänsynsträd, längs med hyggeskanterna och på kvarväxande småplantor.",
          tid: "Efter avverkning",
        },
        {
          src: "/images/landing_skogsbruk/trakthygge_20_visa_visa_naturskog.webp",
          alt: "Trakthyggesbruk 20% påverkan",
          skog: "Trädplantor som sattes efter avverkning är nu 5-10 meter hög ungskog.",
          svamp:
            "Successivt återetableras mykorrhizasvampar med vindspridda sporer från näraliggande skogar. Betydligt mindre mängd mykorrhiza och färre arter än i äldre skog. Matsvampar saknas ofta helt.",
          tid: "20 år efter avverkning",
        },
        {
          src: "/images/landing_skogsbruk/trakthygge_50_visa_visa_naturskog.webp",
          alt: "Trakthyggesbruk 50% påverkan",
          skog: "Uppvuxen skog. En gallring av 30% av beståndets stamantal har skett. Sker 1-3 gånger under ett bestånds omloppstid.",
          svamp:
            "Mängd och artantal mykorrhizasvampar närmar sig vad som finns i äldre skog. Matsvampar, t ex stensopp, blir allt vanligare. Gallringen påverkar inte förekomsten av mykorrhizasvamparna nämnvärt.",
          tid: "50 år efter avverkning",
        },
        {
          src: "/images/landing_skogsbruk/trakthygge_80_visa_visa_naturskog.webp",
          alt: "Trakthyggesbruk 80% påverkan",
          skog: "Äldre skog, kan beroende på markbördighet och var i Sverige komma att avverkas vid 60-100 års ålder.",
          svamp:
            "Förekomsten av vanliga mykorrhizasvampar, mängd och artantal är ungefär samma som före avverkningen. Ofta bra för matsvampar. Någon rödlistade art kan ha lyckats etableras om de förekommer i närheten.",
          tid: "80 år efter avverkning",
        },
      ],
      currentImageIndex: 0,
      slideshowInterval: null,
      fadeDuration: 8000, // Time each image is displayed (in ms)
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeDestroy() {
    this.stopSlideshow();
  },
  methods: {
    startSlideshow() {
      this.slideshowInterval = setInterval(() => {
        this.nextImage();
      }, this.fadeDuration);
    },
    stopSlideshow() {
      if (this.slideshowInterval) {
        clearInterval(this.slideshowInterval);
      }
    },
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
  },
};
</script>

<style scoped>
/* Optional: Customize transition timing if needed */
</style>
