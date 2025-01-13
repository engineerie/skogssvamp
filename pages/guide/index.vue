<template>
  <div class="w-full p-6">
    <!-- Header Section -->

    <!-- Documentation Content -->
    <div class="space-y-4">
      <!-- Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Översikt
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Här skall finnas en utförlig dokumentation när applikationen blir
          publik i april 2025.
        </p>
      </div>

      <!-- Markinventeringen Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Markinventeringen och Rikskogstaxeringen
        </BaseHeading>
        <ul class="list-disc list-inside space-y-1">
          <li>
            <NuxtLink
              to="https://www.slu.se/centrumbildningar-och-projekt/markinventeringen/"
              target="_blank"
              class="text-primary-500 underline"
            >
              Markinventeringen
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://www.slu.se/centrumbildningar-och-projekt/riksskogstaxeringen/"
              target="_blank"
              class="text-primary-500 underline"
            >
              Rikskogstaxeringen
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Svampförekomst Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Uppgifter om svampförekomst i skogsmark baserat på DNA-analyser
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Underlag för uppgifter om svampförekomst i skogsmark, se tills vidare.
          Hur bearbetningen för att visa i denna applikation gått till kommer
          skrivas här.
        </p>
      </div>

      <!-- Uppgifter om Mat- och Giftsvampar Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Uppgifter om mat- och giftsvampar samt naturvårdsarter (rödlistade
          arter och signalarter)
        </BaseHeading>
        <BaseHeading size="lg" weight="medium" class="mt-4">
          Arturvalet baseras på
        </BaseHeading>
        <ul class="list-disc list-inside space-y-1 ml-4">
          <li>
            <strong>Matsvampar:</strong> Nya svampboken (2014) av Pelle Holmberg
            och Hans Marklund, Norstedts.
          </li>
          <li>
            <strong>Giftsvampar:</strong> Giftsvampar och svampgifter (2023) av
            Rut Folke, Anders Hirell, Peter Hultén & Anna Myrnäs. Svamprutan.
          </li>
          <li>
            <strong>Rödlistade mykorrhizasvampar:</strong> Rödlistade arter i
            Sverige 2020. SLU Artdatabanken (2020).
          </li>
        </ul>
        <p class="text-md text-neutral-700 mt-2">
          Rödlistan är Sveriges officiella rödlista fr.o.m. 2020-04-22. Kan
          laddas ner här:
          <NuxtLink
            to="https://www.slu.se/globalassets/ew/subw/artd/6-publikationer/31.-rodlista-2020/rodlista-2020.pdf"
            target="_blank"
            class="text-primary-500 underline"
          >
            Rodlista 2020 PDF
          </NuxtLink>
        </p>
        <p class="text-md text-neutral-700">
          Sök rödlistade arter digitalt:
          <NuxtLink
            to="https://artfakta.se/sok/taxa?redlistCategories=%5B0,1,2,3,4,5%5D"
            target="_blank"
            class="text-primary-500 underline"
          >
            Artfakta.se
          </NuxtLink>
        </p>
        <p class="text-md text-neutral-700 mt-2">
          <strong>Signalarter:</strong> Skyddsvärd skog - Naturvårdsarter och
          andra kriterier för naturvärdesbedömning (2020) av Johan Nitare,
          Skogsstyrelsen.
        </p>
        <p class="text-md text-neutral-700 mt-2">
          Hur bearbetningen för att visa i denna applikation gått till kommer
          skrivas här.
        </p>
      </div>

      <!-- Kartfunktionen Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Kartfunktionen
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Referenser och vad som visas kommer att beskrivas här.
        </p>
      </div>

      <!-- Skogsskötsel Section -->
      <div>
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Skogsskötsel
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Sammanställning över referenser, vad de säger och hur bedömningar
          skett beskrivs här.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if necessary */
</style>

<script>
export default {
  layout: "sidebarLayout",
};
</script>
