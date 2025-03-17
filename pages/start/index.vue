<template>
  <h1 class="text-neutral-500 mt-4 text-xs">Appfunktioner</h1>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6 mt-1">
    <!-- First card: Mykorrhizasvampar -->
    <NuxtLink to="/mykorrhizasvampar">
      <div
        class="ring-1 shadow ring-neutral-200 rounded-3xl hover:bg-neutral-50 hover:ring-neutral-300 bg-white transition-all flex flex-col justify-between overflow-hidden"
      >
        <!-- Fixed height image section -->
        <div
          class="bg-primary-50/50 border-b w-full h-32 flex items-start overflow-hidden"
        >
          <img
            class="w-full object-cover"
            src="/images/SvamparSverige4.svg"
            alt="Mykorrhizasvampar"
          />
        </div>
        <!-- Fixed height text section -->
        <div class="p-4 relative h-28">
          <UButton
            icon="lineicons:mushroom-1"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute -top-4"
          />
          <div class="flex gap-2 items-center text-neutral-900 mt-1">
            <h1 class="text-md font-medium truncate">Mykorrhizasvampar</h1>
          </div>
          <h1 class="text-neutral-500 text-sm line-clamp-2">
            Se vilka arter som kan finnas olika i skogsmiljöer.
          </h1>
        </div>
      </div>
    </NuxtLink>

    <!-- Second card: Skogsskötsel -->
    <NuxtLink to="/skogsskotsel">
      <div
        class="ring-1 shadow ring-neutral-200 rounded-3xl hover:bg-neutral-50 hover:ring-neutral-300 bg-white transition-all flex flex-col justify-between overflow-hidden"
      >
        <div
          class="bg-primary-50/50 border-b w-full h-32 flex items-start overflow-hidden"
        >
          <img
            class="w-full object-cover"
            src="/images/Skogsskötsel4.svg"
            alt="Skogsskötsel"
          />
        </div>
        <div class="p-4 relative h-28">
          <UButton
            icon="healthicons:forest-persons-outline"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute -top-4"
          />
          <div class="flex gap-2 items-center text-neutral-900 mt-1">
            <h1 class="text-md font-medium truncate">Skogsskötsel</h1>
          </div>
          <h1 class="text-neutral-500 text-sm line-clamp-2">
            Se hur olika sorters skogsskötsel påverkar mykorrhizasvampar.
          </h1>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink to="/svampkunskap">
      <div
        class="ring-1 shadow ring-neutral-200 rounded-3xl hover:bg-neutral-50 hover:ring-neutral-300 bg-white transition-all flex flex-col justify-between overflow-hidden"
      >
        <div
          class="bg-primary-50/50 border-b w-full h-32 flex items-start overflow-hidden"
        >
          <img
            class="w-full object-cover"
            src="/images/Svampkunskap3.svg"
            alt="Svampkunskap"
          />
        </div>
        <div class="p-4 relative h-28">
          <UButton
            icon="heroicons:book-open"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute -top-4"
          />
          <div class="flex gap-2 items-center text-neutral-900 mt-1">
            <h1 class="text-md font-medium truncate">Svampkunskap</h1>
          </div>
          <h1 class="text-neutral-500 text-sm line-clamp-2">
            Grundläggande kunskap om hur mykorrhizasvampar lever i marken.
          </h1>
        </div>
      </div>
    </NuxtLink>
  </div>

  <!-- <h1 class="text-neutral-500 text-sm">Resurser</h1>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6 mt-1">
  
  </div> -->

  <h1 class="text-neutral-500 text-xs">Dokumentation</h1>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-12 mt-1">
    <!-- Fourth card: Dokumentation -->
    <NuxtLink to="/guide">
      <div
        class="ring-1 shadow ring-neutral-200 rounded-3xl hover:bg-neutral-50 hover:ring-neutral-300 bg-white transition-all flex flex-col justify-between overflow-hidden"
      >
        <div
          class="bg-primary-50/50 border-b w-full h-32 flex items-start overflow-hidden"
        >
          <img
            class="w-full object-cover"
            src="/images/Dokumentation.svg"
            alt="Dokumentation"
          />
        </div>
        <div class="p-4 relative h-28">
          <UButton
            icon="mdi:file-cog-outline"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute -top-4"
          />
          <div class="flex gap-2 items-center text-neutral-900 mt-1">
            <h1 class="text-md font-medium truncate">Dokumentation</h1>
          </div>
          <h1 class="text-neutral-500 text-sm line-clamp-2">
            Definitioner, källor och hur du bäst använder appen.
          </h1>
        </div>
      </div>
    </NuxtLink>

    <!-- Fifth card: Om projektet -->
    <NuxtLink to="/about">
      <div
        class="ring-1 shadow ring-neutral-200 rounded-3xl hover:bg-neutral-50 hover:ring-neutral-300 bg-white transition-all flex flex-col justify-between overflow-hidden"
      >
        <div
          class="bg-primary-50/50 border-b w-full h-32 flex items-start overflow-hidden"
        >
          <img
            class="w-full object-cover"
            src="/images/Projektet.svg"
            alt="Om projektet"
          />
        </div>
        <div class="p-4 relative h-28">
          <UButton
            icon="tabler:info-circle"
            color="white"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute -top-4"
          />
          <div class="flex gap-2 items-center text-neutral-900 mt-1">
            <h1 class="text-md font-medium truncate">Om projektet</h1>
          </div>
          <h1 class="text-neutral-500 text-sm line-clamp-2">
            Bakgrund och syfte med projektet.
          </h1>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const isPdfOpen = ref(false); // New state for PDF modal

const pdfUrl = "docs/Manual.pdf"; // Ensure the path matches the location in public/
</script>
