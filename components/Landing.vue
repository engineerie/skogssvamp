<template>
  <div>
    <div class="max-w-screen-xl mx-auto">
      <!-- Desktop Navigation (visible on md and above) -->
      <div class="hidden md:block">
        <LandingTopNav />
      </div>

      <!-- Mobile Navigation (visible below md) -->
      <LandingHeroSection />
      <!-- <LandingFunding /> -->
      <div class="md:mx-16">
        <LandingSverigesMykorrhizasvampar />

        <div
          class="bg-neutral-50 rounded-b-3xl border border-neutral-200 relative pb-6 md:pb-12"
        >
          <LandingEdnaOchFruktkroppTitle
            class="sticky top-20 md:top-4 mt-4 z-10 md:mt-12"
          />
          <LandingEdnaOchFruktkropp class="mt-4 md:mt-10 mb-20 md:mx-12" />

          <!-- <LandingListBoxRowLanding /> -->

          <div
            class="md:mx-24 mx-4 mt-14 md:mt-24 grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-16"
          >
            <LandingDNA />
            <LandingSamladKunskap />
          </div>
          <!-- <div class="mx-12 -mb-6">
            <EnvironmentTitle />
          </div> -->
        </div>
      </div>

      <div class="md:mx-16 mt-24 md:mt-36">
        <LandingSkogImage />

        <div
          class="bg-neutral-50 rounded-b-3xl border border-neutral-200 relative pb-4 md:pb-12"
        >
          <LandingSkogTitle class="sticky top-20 md:top-4 mt-4 z-10 md:mt-12" />
          <LandingSkog class="mt-4 md:mt-10 mb-20 md:mx-12" />

          <!-- <LandingListBoxRowLanding /> -->

          <!-- <div
            class="md:mx-24 mx-4 mt-14 grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-16"
          >
            <LandingDNA />
            <LandingSamladKunskap />
          </div> -->
        </div>
      </div>

      <!-- <LandingForestryImpactSection /> -->
      <div class="mx-4">
        <LandingInfoSection />
      </div>
    </div>
    <LandingFooter class="w-full" />
  </div>
</template>
