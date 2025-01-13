<template>
  <div class="grid grid-cols-2 mt-6 mb-44 items-center gap-20">
    <div class="">
      <BaseHeading
        size="5xl"
        lead="tight"
        class="text-neutral-950 dark:text-neutral-200"
      >
        DNA-analys
      </BaseHeading>
      <BaseHeading
        lead="tight"
        size="5xl"
        class="text-primary-500 dark:text-neutral-200 mb-1"
      >
        av jordprover
      </BaseHeading>
      <!-- Description -->
      <BaseHeading
        weight="semi-bold"
        size="xl"
        class="text-neutral-500 dark:text-neutral-400 mb-6"
      >
        Sedan 2015 samlar
        <NuxtLink
          to="https://www.slu.se/centrumbildningar-och-projekt/markinventeringen/"
          class="text-primary-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markinventeringen</NuxtLink
        >
        tillsammans med
        <NuxtLink
          to="https://www.slu.se/centrumbildningar-och-projekt/riksskogstaxeringen/"
          class="text-primary-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          SLU Rikskogstaxeringen</NuxtLink
        >
        årligen in markprover som DNA-analyseras för att identifiera och
        undersöka svampar i skogsmark. Hittills har prover från 2500 skogar runt
        om i Sverige analyserats. Resultaten ger en bra bild av förekomsten av
        vanliga mykorrhizasvampar. Denna stickprovsundersökning fångar dock inte
        upp ovanligare arter, eftersom dessa ofta är lokalt begränsade och
        sällan förekommer i de små proverna.
      </BaseHeading>
      <div class="flex items-start">
        <!-- Navigation Buttons -->
        <div class="flex gap-4">
          <!-- <NuxtLink to="/svampdata">
            <BaseButton color="primary" size="md" shape="full">
              <Icon name="mdi:file-cog-outline" class="-ms-1 mr-1 size-5" />
              <span>Läs dokumentation</span>
            </BaseButton>
          </NuxtLink> -->
          <NuxtLink to="https://svamparisverige.se/" target="blank">
            <BaseButton color="default" type="outline" size="md" shape="full">
              <Icon
                name="mingcute:external-link-line"
                class="-ms-1 mr-1 size-6"
              />
              <span>Mer på svamparisverige.se</span>
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="relative">
      <LandingFullScreenEdnaLanding class="pl-2 pb-6" />
      <!-- <div
        class="absolute -top-8 -right-10 z-50 dark:opacity-90 w-24 h-24 ml-2 mr-3 rounded-full bg-violet-200 ring-1 ring-neutral-200 text-violet-500 flex justify-center items-center"
      >
        <Icon name="solar:dna-linear" class="h-16 w-16" />
      </div> -->
      <div class="absolute -bottom-12 -left-28 w-11/12">
        <img src="/images/Markinventering.svg" class="" />
      </div>
    </div>
  </div>
</template>
