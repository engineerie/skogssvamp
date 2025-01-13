<template>
  <div class="w-full p-6">
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-2">
        Översikt
      </BaseHeading>
      <p class="text-md text-neutral-700">
        Här kommer det komma översiktlig populärvetenskaplig text och bilder på
        följande tema
      </p>
    </div>
    <!-- Section 0: Vad är svamp -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        0. Vad är svamp
      </BaseHeading>
      <p class="text-md text-neutral-700">Kort vad svamp är.</p>
    </div>

    <!-- Section 1: Vad är mykorrhiza -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        1. Vad är mykorrhiza
      </BaseHeading>
      <p class="text-md text-neutral-700 mb-4">
        Symbios mellan svamp och träd, bilder och förklaring.
      </p>
      <p class="text-md text-neutral-700">
        (Kanske olika typer av mykorrhiza? – och att här fokus på ekto)
      </p>
    </div>

    <!-- Section 2: Vilken betydelse har mykorrhiza -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        2. Vilken betydelse har mykorrhiza
      </BaseHeading>
      <p class="text-md text-neutral-700">Gammal symbios.</p>
    </div>

    <!-- Section 3: Vilka svampar är mykorrhizasvampar -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        3. Vilka svampar är mykorrhizasvampar
      </BaseHeading>
      <p class="text-md text-neutral-700 mb-4">
        Översikt med bilder och lista på svampsläkten. Att i princip alla
        matsvampar är det, hur många de är.
      </p>
    </div>

    <!-- Section 4: Vilka träd har mykorrhiza -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        4. Vilka träd har mykorrhiza
      </BaseHeading>
      <p class="text-md text-neutral-700">
        Grupperat – ekto och andra (alm, ask, lönn, rönn…som har AM).
      </p>
    </div>

    <!-- Section 5: Hur många arter finns det -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        5. Hur många arter finns det
      </BaseHeading>
      <p class="text-md text-neutral-700">I Sverige, i en skog, på ett träd.</p>
    </div>

    <!-- Section 6: Förhållandet fruktkropp vs mycel -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        6. Förhållandet fruktkropp vs mycel
      </BaseHeading>
      <p class="text-md text-neutral-700 mb-4">
        Bild och kort text. Frkp väderleksberoende och varierar mycket mellan
        år., mycelmängder i mark mer konstanta.
      </p>
    </div>

    <!-- Section 7: Mykorrhizasvampar är individer -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        7. Mykorrhizasvampar är individer
      </BaseHeading>
      <p class="text-md text-neutral-700">
        Kort om mykorrhizasvampars livscykel – att de är individer med storlekar
        och åldrar. Olika arter olika.
      </p>
    </div>

    <!-- Section 8: Hur ser det ut i marken -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        8. Hur ser det ut i marken
      </BaseHeading>
      <p class="text-md text-neutral-700 mb-4">Bilder, text och teckningar.</p>
    </div>

    <!-- Section 9: Mycelnätverket -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        9. Mycelnätverket
      </BaseHeading>
      <p class="text-md text-neutral-700 mb-4">
        Kanske kort om att wood wide web inte finns, men väl ett mer intrikat
        och fascinerande gytter av olika mycel.
      </p>
    </div>

    <!-- Section 10: Hur påverkar skogsbrukande -->
    <div class="mb-6">
      <BaseHeading size="2xl" weight="semi-bold" class="mb-4">
        10. Hur påverkar skogsbrukande
      </BaseHeading>
      <p class="text-md text-neutral-700">Kort summerande text.</p>
    </div>

    <!-- Section 11: Läsa mer -->
    <div class="mb-6">
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
        <!-- Add more literature tips as needed -->
      </ul>
    </div>
  </div>
</template>
