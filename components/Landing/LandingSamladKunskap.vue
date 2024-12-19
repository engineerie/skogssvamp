<template>
  <div class="grid grid-cols-2 mt-6 mb-44 items-center gap-20">
    <div class="relative pr-4">
      <LandingMatsvamp class="absolute top-16 -left-16 z-0" />

      <LandingRedlisted class="z-50" />

      <!-- <div
        class="absolute -top-8 -right-10 z-50 dark:opacity-90 w-24 h-24 ml-2 mr-3 rounded-full bg-violet-200 ring-1 ring-neutral-200 text-violet-500 flex justify-center items-center"
      >
        <Icon name="solar:dna-linear" class="h-16 w-16" />
      </div> -->
      <div class="absolute -bottom-12 -right-20 w-11/12">
        <img src="/images/SamladKunskap.svg" />
      </div>
    </div>
    <div>
      <BaseHeading
        lead="tight"
        size="5xl"
        class="text-neutral-950 dark:text-neutral-200"
      >
        Samlad kunskap
      </BaseHeading>
      <BaseHeading
        lead="tight"
        size="5xl"
        class="text-primary-500 dark:text-neutral-200 mb-1"
      >
        från fruktkroppsfynd
      </BaseHeading>
      <!-- Description -->
      <BaseHeading
        weight="semi-bold"
        size="xl"
        class="text-neutral-500 dark:text-neutral-400 mb-6"
      >
        Sedan 2015 har Markinventeringen samlat in humusprover som
        DNA-analyserats för att kartlägga svamparnas förekomst. Än så länge har
        2500 prover analyserats, vilket ger en god bild av vanliga
        mykorrhizasvampar i olika skogar. Materialet fångar dock inte upp mindre
        frekventa arter, eftersom dessa ofta är lokalt begränsade och sällan
        förekommer i de små proverna.
      </BaseHeading>
      <div class="flex items-start">
        <!-- Navigation Buttons -->
        <div class="flex gap-4">
          <NuxtLink to="/svampdata">
            <BaseButton color="primary" size="md" shape="full">
              <Icon name="mdi:file-cog-outline" class="-ms-1 mr-1 size-5" />
              <span>Läs dokumentation</span>
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
