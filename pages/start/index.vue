<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'w-full sm:max-w-6xl',
    }"
  >
    <!-- Ändrad från w-full till max-w-4xl -->
    <div class="p-6 w-full">
      <!-- Ökad padding för bättre layout -->
      <!-- YouTube Iframe -->
      <div class="relative w-full pb-[56.25%]">
        <iframe
          class="absolute top-0 left-0 w-full h-full rounded-2xl border border-neutral-300"
          src="https://www.youtube.com/embed/cnMmNMoqBME"
          title="Skogssvamp Introduktionsfilm"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </UModal>
  <NuxtLink
    @click="isOpen = true"
    class="inline-flex items-center justify-center cursor-pointer mt-8 mb-4"
  >
    <div
      class="rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50"
    >
      <span>Introduktionsfilm</span>
      <Icon name="heroicons:play-circle-solid" class="h-6 w-6 ml-1 -mr-2" />
    </div>
  </NuxtLink>
  <BaseHeading size="sm" weight="thin" class="text-neutral-500"
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
              Sveriges mykorrhizasvampar
            </BaseHeading>
          </div>

          <BaseHeading size="md" weight="medium" class="text-neutral-500 mt-2">
            Se vilka arter som kan finnas olika i skogsmiljöer.
          </BaseHeading>
        </div>
        <img src="/images/SvamparSverige4.svg" class="" />
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
        <img src="/images/Skogssbruk.svg" class="" />
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
          <img src="/images/Svampkunskap3.svg" class="mt-4" />
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
          <img src="/images/Dokumentation.svg" class="mt-4" />
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
          <img src="/images/Projektet.svg" class="mt-4" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>
