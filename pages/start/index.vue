<template>
  <BaseHeading size="sm" weight="thin" class="mt-12 text-neutral-500"
    >Appfunktioner</BaseHeading
  >
  <div class="grid grid-cols-4 gap-5 mb-12 mt-1">
    <NuxtLink to="/svampdata">
      <div
        class="ring-1 ring-neutral-200 rounded-xl hover:bg-neutral-50 bg-neutral-100 transition-all overflow-hidden h-72 flex flex-col justify-between"
      >
        <div class="p-4">
          <div class="flex gap-2 items-center text-neutral-900">
            <icon name="material-symbols:map-outline-rounded" class="h-6 w-6" />

            <BaseHeading size="lg" weight="thin">
              Sveriges mykorrhiza
            </BaseHeading>
          </div>

          <BaseHeading size="md" weight="medium" class="text-neutral-500 mt-2">
            Se vilka arter som kan finnas olika i skogsmiljöer.
          </BaseHeading>
        </div>
        <Img src="/images/SvamparSverige4.svg" class="" />
      </div>
    </NuxtLink>

    <NuxtLink to="/skogsbruk">
      <div
        class="ring-1 ring-neutral-200 rounded-xl hover:bg-neutral-50 bg-neutral-100 transition-all overflow-hidden h-72 flex flex-col justify-between"
      >
        <div class="p-4">
          <div class="flex gap-2 items-center text-neutral-900">
            <icon
              name="material-symbols:nature-people-outline-rounded"
              class="h-6 w-6"
            />
            <BaseHeading size="lg" weight="thin"> Skogsskötsel </BaseHeading>
          </div>

          <BaseHeading
            size="md"
            weight="medium"
            class="text-neutral-500 pr-12 mt-2"
          >
            Se hur olika sorters skogsskötsel påverkar mykorrhizasvampar.
          </BaseHeading>
        </div>
        <Img src="/images/Skogssbruk.svg" class="" />
      </div>
    </NuxtLink>
  </div>
  <BaseHeading size="sm" weight="thin" class="text-neutral-500"
    >Resurser</BaseHeading
  >
  <div class="grid grid-cols-4 gap-5 mb-12 mt-1">
    <NuxtLink to="/svampkunskap">
      <div
        class="ring-1 ring-neutral-200 rounded-xl hover:bg-neutral-50 bg-neutral-100 transition-all overflow-hidden"
      >
        <div class="p-4">
          <div class="flex gap-2 items-center text-neutral-900">
            <icon name="heroicons:book-open" class="h-6 w-6" />
            <BaseHeading size="lg" weight="thin"> Svampkunskap </BaseHeading>
          </div>

          <BaseHeading size="md" weight="medium" class="text-neutral-500 mt-2">
            Grundläggande kunskap om hur mykorrhizasvampar lever i marken.
          </BaseHeading>
        </div>
        <div class="flex justify-center">
          <Img src="/images/Svampkunskap3.svg" class="mt-4" />
        </div>
      </div>
    </NuxtLink>
  </div>
  <BaseHeading size="sm" weight="thin" class="text-neutral-500"
    >Dokumentation</BaseHeading
  >

  <div class="grid grid-cols-4 gap-5 mb-12 mt-1">
    <NuxtLink to="/guide">
      <div
        class="ring-1 ring-neutral-200 rounded-xl hover:bg-neutral-50 bg-neutral-100 transition-all overflow-hidden h-72 flex flex-col justify-between"
      >
        <div class="p-4">
          <div class="flex gap-2 items-center text-neutral-900">
            <icon name="mdi:file-cog-outline" class="h-6 w-6" />
            <BaseHeading size="lg" weight="thin"> Dokumentation </BaseHeading>
          </div>

          <BaseHeading size="md" weight="medium" class="text-neutral-500 mt-2">
            Definitioner, källor och hur du bäst använder appen.
          </BaseHeading>
        </div>
        <div class="flex justify-center">
          <Img src="/images/Dokumentation.svg" class="mt-4" />
        </div>
      </div>
    </NuxtLink>
    <NuxtLink to="/about">
      <div
        class="ring-1 ring-neutral-200 rounded-xl hover:bg-neutral-50 bg-neutral-100 transition-all overflow-hidden h-72 flex flex-col justify-between"
      >
        <div class="p-4">
          <div class="flex gap-2 items-center text-neutral-900">
            <icon name="tabler:info-circle" class="h-6 w-6" />
            <BaseHeading size="lg" weight="thin"> Om projektet </BaseHeading>
          </div>

          <BaseHeading size="md" weight="medium" class="text-neutral-500 mt-2">
            Bakgrund och syfte med projektet.
          </BaseHeading>
        </div>
        <div class="flex justify-center">
          <Img src="/images/Projektet.svg" class="mt-4" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
