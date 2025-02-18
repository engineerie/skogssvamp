<script setup lang="ts">
import { ref } from "vue";

// Reactive variable to hold the active section ID.
const activeSection = ref("overview");

// Navigation links now use an "id" property. Clicking a link will show the corresponding section.
const links = [
  { label: "Översikt", id: "overview" },
  { label: "0. Vad är svamp", id: "section0" },
  { label: "1. Vad är mykorrhiza", id: "section1" },
  { label: "2. Vilken betydelse har mykorrhiza", id: "section2" },
  { label: "3. Vilka svampar är mykorrhizasvampar", id: "section3" },
  { label: "4. Vilka träd har mykorrhiza", id: "section4" },
  { label: "5. Hur många arter finns det", id: "section5" },
  { label: "6. Förhållandet fruktkropp vs mycel", id: "section6" },
  { label: "7. Mykorrhizasvampar är individer", id: "section7" },
  { label: "8. Hur ser det ut i marken", id: "section8" },
  { label: "9. Mycelnätverket", id: "section9" },
  { label: "10. Hur påverkar skogsbrukande", id: "section10" },
  { label: "11. Läsa mer", id: "section11" },
];

// Function to update the active section.
const setActiveSection = (id: string) => {
  activeSection.value = id;
};
</script>

<template>
  <div class="flex">
    <!-- Vertical Navigation Column -->
    <nav class="w-64 p-4">
      <div v-for="link in links" :key="link.id" class="mb-2">
        <button
          @click.prevent="setActiveSection(link.id)"
          :class="[
            'w-full text-left py-2 px-4',
            activeSection === link.id ? 'bg-gray-300' : 'hover:bg-gray-200',
          ]"
        >
          {{ link.label }}
        </button>
      </div>
    </nav>

    <!-- Main Content Column -->
    <div class="flex-1 p-8">
      <!-- Overview Section -->
      <section v-show="activeSection === 'overview'" id="overview" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
          Översikt
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Här kommer översiktlig populärvetenskaplig text och bilder på följande
          tema.
        </p>
      </section>

      <!-- Section 0 -->
      <section v-show="activeSection === 'section0'" id="section0" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          0. Vad är svamp
        </BaseHeading>
        <p class="text-md text-neutral-700">Kort vad svamp är.</p>
      </section>

      <!-- Section 1 -->
      <section v-show="activeSection === 'section1'" id="section1" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          1. Vad är mykorrhiza
        </BaseHeading>
        <p class="text-md text-neutral-700 mb-4">
          Symbios mellan svamp och träd, bilder och förklaring.
        </p>
        <p class="text-md text-neutral-700">
          (Kanske olika typer av mykorrhiza? – och att här fokus på ekto)
        </p>
      </section>

      <!-- Section 2 -->
      <section v-show="activeSection === 'section2'" id="section2" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          2. Vilken betydelse har mykorrhiza
        </BaseHeading>
        <p class="text-md text-neutral-700">Gammal symbios.</p>
      </section>

      <!-- Section 3 -->
      <section v-show="activeSection === 'section3'" id="section3" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          3. Vilka svampar är mykorrhizasvampar
        </BaseHeading>
        <p class="text-md text-neutral-700 mb-4">
          Översikt med bilder och lista på svampsläkten. Att i princip alla
          matsvampar är det, hur många de är.
        </p>
      </section>

      <!-- Section 4 -->
      <section v-show="activeSection === 'section4'" id="section4" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          4. Vilka träd har mykorrhiza
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Grupperat – ekto och andra (alm, ask, lönn, rönn…som har AM).
        </p>
      </section>

      <!-- Section 5 -->
      <section v-show="activeSection === 'section5'" id="section5" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          5. Hur många arter finns det
        </BaseHeading>
        <p class="text-md text-neutral-700">
          I Sverige, i en skog, på ett träd.
        </p>
      </section>

      <!-- Section 6 -->
      <section v-show="activeSection === 'section6'" id="section6" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          6. Förhållandet fruktkropp vs mycel
        </BaseHeading>
        <p class="text-md text-neutral-700 mb-4">
          Bild och kort text. Frkp väderleksberoende och varierar mycket mellan
          år, mycelmängder i mark mer konstanta.
        </p>
      </section>

      <!-- Section 7 -->
      <section v-show="activeSection === 'section7'" id="section7" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          7. Mykorrhizasvampar är individer
        </BaseHeading>
        <p class="text-md text-neutral-700">
          Kort om mykorrhizasvampars livscykel – att de är individer med
          storlekar och åldrar. Olika arter olika.
        </p>
      </section>

      <!-- Section 8 -->
      <section v-show="activeSection === 'section8'" id="section8" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          8. Hur ser det ut i marken
        </BaseHeading>
        <p class="text-md text-neutral-700 mb-4">
          Bilder, text och teckningar.
        </p>
      </section>

      <!-- Section 9 -->
      <section v-show="activeSection === 'section9'" id="section9" class="mb-6">
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          9. Mycelnätverket
        </BaseHeading>
        <p class="text-md text-neutral-700 mb-4">
          Kanske kort om att wood wide web inte finns, men väl ett mer intrikat
          och fascinerande gytter av olika mycel.
        </p>
      </section>

      <!-- Section 10 -->
      <section
        v-show="activeSection === 'section10'"
        id="section10"
        class="mb-6"
      >
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          10. Hur påverkar skogsbrukande
        </BaseHeading>
        <p class="text-md text-neutral-700">Kort summerande text.</p>
      </section>

      <!-- Section 11 -->
      <section
        v-show="activeSection === 'section11'"
        id="section11"
        class="mb-6"
      >
        <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
          11. Läsa mer
        </BaseHeading>
        <ul class="list-disc list-inside space-y-2">
          <li>
            <NuxtLink
              to="https://www.skogssallskapet.se/kunskapsbank/artiklar/2024-10-02-ny-teknik-se-svampen-i-din-skog.html"
              target="_blank"
              class="text-primary-500 underline"
            >
              Ny teknik: Se svampen i din skog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://svamparisverige.se/"
              target="_blank"
              class="text-primary-500 underline"
            >
              SvampariSverige
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
