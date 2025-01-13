<template>
  <div class="grid grid-cols-1 md:grid-cols-2 mt-6 mb-24 items-center gap-20">
    <!-- Left Column: Text Content -->
    <div>
      <BaseHeading
        size="5xl"
        lead="tight"
        class="text-neutral-950 dark:text-neutral-200"
        >Svampar och träd
      </BaseHeading>
      <BaseHeading
        lead="tight"
        size="5xl"
        class="text-primary-500 dark:text-neutral-200 mb-1"
        >hänger ihop
      </BaseHeading>
      <!-- Description -->
      <BaseHeading
        weight="semi-bold"
        size="xl"
        class="text-neutral-500 dark:text-neutral-400 mb-6"
      >
        Mykorrhizasvampar lever i symbios med träd. Svampar får sin energi från
        träden som i sin tur förser träden med näring och vatten.
        Mykorrhizasvampar lever som m²-stora mycel som kan bli lika gamla som
        träd. Svampar med stora fruktkroppar, som kantareller, kremlor och
        soppar är mykorrhizasvampar. De allra flesta vildplockade matsvampar är
        mykorrhizasvampar.
      </BaseHeading>
      <div class="flex items-start">
        <!-- Navigation Buttons -->
        <div class="flex gap-4">
          <NuxtLink to="/svampkunskap">
            <BaseButton color="primary" type="outline" size="md" shape="full">
              <Icon name="heroicons:book-open" class="-ms-1 mr-1 size-6" />
              <span>Svampkunskap</span>
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Right Column: Video -->
    <div>
      <div class="relative w-full pb-[56.25%] mb-2">
        <iframe
          class="absolute top-0 left-0 w-full h-full rounded-xl ring-[1px] ring-neutral-300"
          src="https://ksla.solidtango.com/widgets/embed/vapd6f5b"
          frameborder="0"
          allowfullscreen
          allow="autoplay; fullscreen"
          title="Video about Mykorrhizasvampar"
        ></iframe>
      </div>
      <BaseHeading
        weight="semi-bold"
        size="md"
        class="text-neutral-500 dark:text-neutral-400 mb-6"
      >
        Kort introducerande föreläsningar om svampar från en temadag om svamp i
        mars 2024 på KSLA. Fler klip finns
        <NuxtLink
          to="https://www.ksla.se/aktiviteter/svamparnas-rike-osynligt-men-viktigt/"
          class="text-primary-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          här</NuxtLink
        >.
      </BaseHeading>
    </div>
  </div>
</template>
