<template>
  <div
    class="mx-48 space-y-8 relative before:absolute before:inset-0 before:mx-auto before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-200 before:via-primary-400 before:to-primary-200"
  >
    <!-- Timeline Steps -->
    <div
      v-for="(step, index) in timelineData"
      :key="index"
      class="relative group"
    >
      <div
        class="relative flex items-center justify-between md:justify-normal"
        :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Circle (Center) -->
        <div
          class="flex items-center justify-center w-4 h-4 rounded-full bg-primary-500 shrink-0 shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
        ></div>

        <!-- Card -->
        <div
          class="p-6 w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-neutral-200 rounded-xl"
        >
          <BaseHeading
            size="md"
            weight="thin"
            lead="tight"
            class="text-neutral-800 mb-2 dark:text-white"
          >
            {{ step.title }}
          </BaseHeading>

          <BaseParagraph size="sm" lead="tight" class="text-muted-400">
            <strong>Skog:</strong> {{ step.forestDescription }}
          </BaseParagraph>
          <BaseParagraph size="sm" lead="tight" class="text-muted-400 mt-2">
            <strong>Svamp:</strong> {{ step.mushroomDescription }}
          </BaseParagraph>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const timelineData = [
  {
    title: "Innan avverkning",
    forestDescription: "Äldre skog",
    mushroomDescription:
      "Rikligt med mykorhizasvamp i marken med många olika arter.Goda förutsättningar för matsvampar. Rödlistade svampar kan finnas. Gamla svampindivider kan ha stora mycelstorlekar. ",
  },
  {
    title: "Efter avverkning",
    forestDescription:
      "Kalaverkning med 5% naturhänsyn i form av enstaka och grupper av hänsynsträd samt högstubbar.",
    mushroomDescription:
      "Merparten av mykorrhizasvamparnas mycel tynar bort och dör. Svampmycel överlever vid hänsynsträd, längs med hyggeskanterna och på kvarväxande småplantor.",
  },
  {
    title: "20 år efter avverkning",
    forestDescription:
      "Trädplantor som sattes efter avverkning är nu 5-10 meter hög ungskog.",
    mushroomDescription:
      "Successivt återetableras mykorrhizasvampar med vindspridda sporer från näraliggande skogar. Betydligt mindre mängd mykorrhiza och färre arter än i äldre skog. Matsvampar saknas ofta helt.",
  },
  {
    title: "50 år efter avverkning",
    forestDescription:
      "Uppvuxen skog. En gallring av 30% av beståndets stamantal har skett. Sker 1-3 gånger under ett bestånds omloppstid.",
    mushroomDescription:
      "Mängd och artantal mykorrhizasvampar närmar sig vad som finns i äldre skog. Matsvampar, t.ex. stensopp, blir allt vanligare. Gallringen påverkar inte förekomsten av mykorrhizasvamparna nämnvärt.",
  },
  {
    title: "80 år efter avverkning",
    forestDescription:
      "Äldre skog, kan beroende på markbördighet och var i Sverige komma att avverkas vid 60–100 års ålder.",
    mushroomDescription:
      "Förekomsten av vanliga mykorrhizasvampar, mängd och artantal är ungefär samma som före avverkningen. Ofta bra för matsvampar. Få rödlistade arter har lyckats återetableras om de är ovanliga i omgivande landskap.",
  },
];
</script>
