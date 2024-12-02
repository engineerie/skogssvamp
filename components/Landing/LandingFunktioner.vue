<template>
  <div>
    <div class="container mx-auto px-6 relative">
      <!-- <BaseHeading class="text-center">Funktioner </BaseHeading> -->
      <div class="gap-3 w-full p-10 pb-0">
        <!-- <div
          class="relative bg-neutral-100 h-52 w-96 ring-1 ring-neutral-200 rounded-xl text-left p-4"
        >
          <div class="flex gap-2 items-center text-neutral-900">
            <icon name="material-symbols:map-outline-rounded" class="h-7 w-7" />

            <BaseHeading size="2xl" weight="thin">
              Sveriges mykorrhizasvampar
            </BaseHeading>
          </div>

          <BaseHeading size="lg" weight="medium" class="text-neutral-500">
            Se vilka arter som kan finnas olika i skogsmiljöer.
          </BaseHeading>
          <div class="flex mt-4">
            <NuxtLink
              @click="isOpen = true"
              class="inline-flex items-center justify-center cursor-pointer"
            >
              <div
                class="rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50"
              >
                <span>Starta</span>
              </div>
            </NuxtLink>
            <NuxtLink
              @click="isOpen = true"
              class="inline-flex items-center justify-center cursor-pointer"
            >
              <div class="text-sm mr-2 p-2 px-5">
                <span>Läs mer</span>
                <Icon name="heroicons:arrow-right" class="h-5 w-5 ml-1 -mr-2" />
              </div>
            </NuxtLink>
          </div>
        </div> -->
        <div class="container mx-auto px-6 text-center mt-28">
          <BaseHeading
            size="5xl"
            lead="tight"
            class="font-bold text-center leading-tight"
          >
            Vilka svampar kan finnas
          </BaseHeading>
          <BaseHeading
            size="5xl"
            class="text-primary-500 font-bold mb-4 text-center leading-tight"
          >
            i din skogsmark?
          </BaseHeading>
          <p class="text-xl mb-10 text-neutral-500 mx-40 text-center">
            Olika skogsmiljöer har olika sammansättningar av mykorrhizasvampar.
            Här kan du söka på olika svenska skogsmiljöer för att se vilka arter
            som kan finnas i marken.
          </p>
        </div>
        <NuxtImg src="/images/SvamparSverige4.svg" class="z-10 rounded-b-3xl" />
      </div>
      <!-- <LandingListBoxRowLanding class="" /> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const leftDiv = ref(null);
    const rightDiv = ref(null);

    // Initial classes for the divs
    const leftDivClass = ref(
      "opacity-0 -translate-x-5 transition-all duration-700 ease-out"
    );
    const rightDivClass = ref(
      "opacity-0 translate-x-5 transition-all duration-700 ease-out"
    );

    onMounted(() => {
      const observerOptions = {
        threshold: 0.1,
      };

      const observerCallback = (entries, observer, classRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            classRef.value =
              "opacity-100 translate-x-0 transition-all duration-700 ease-out";
            observer.unobserve(entry.target);
          }
        });
      };

      // Observer for the left div
      const leftObserver = new IntersectionObserver((entries, observer) => {
        observerCallback(entries, observer, leftDivClass);
      }, observerOptions);

      // Observer for the right div
      const rightObserver = new IntersectionObserver((entries, observer) => {
        observerCallback(entries, observer, rightDivClass);
      }, observerOptions);

      if (leftDiv.value) {
        leftObserver.observe(leftDiv.value);
      }

      if (rightDiv.value) {
        rightObserver.observe(rightDiv.value);
      }
    });

    return {
      leftDiv,
      rightDiv,
      leftDivClass,
      rightDivClass,
    };
  },
};
</script>

<style>
/* No additional CSS needed if using Tailwind CSS */
</style>
