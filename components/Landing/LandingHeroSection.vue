<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'w-full md:max-w-6xl',
    }"
  >
    <!-- Ändrad från w-full till max-w-4xl -->
    <div class="w-full">
      <!-- Ökad padding för bättre layout -->
      <!-- YouTube Iframe -->
      <div
        class="relative w-full pb-[56.25%] border border-neutral-200 rounded-2xl"
      >
        <iframe
          class="absolute top-0 left-0 w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/k3QjCZNrp1c"
          title="Introduktionsfilm Skogssvamp"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </UModal>

  <div class="md:pt-52 pt-36 mb-16 z-10 md:mx-24">
    <div class="px-6 items-center text-center">
      <!-- Text Content -->
      <div class="mb-10 lg:mb-0">
        <!-- Existing content -->
        <NuxtLink
          to="https://www.slu.se/ew-nyheter/2023/3/se-svampen-i-din-skog/"
          target="_blank"
        >
          <UBadge
            variant="subtle"
            color="primary"
            size="lg"
            :ui="{ rounded: 'rounded-full' }"
            class="border-[0.5px] border-green-500 inline-flex mb-5"
          >
            <span>Testversion 2025.02.03</span>
            <Icon name="heroicons:arrow-right-16-solid" class="me-1 h-4 w-4" />
          </UBadge>
        </NuxtLink>

        <h1
          class="text-neutral-800 dark:text-white text-4xl md:text-7xl mb-6 font-semibold"
        >
          Mykorrhizasvampar
          <br />
          <span class="text-primary-500 -mt-6">& skogsskötsel </span>
        </h1>
        <h1
          class="text-neutral-500 dark:text-white text-lg md:text-xl md:mx-36"
        >
          Svampskog.se är en webbapplikation där du kan utforska vilka
          mykorrhizasvampar som kan finnas i olika skogar och se hur de reagerar
          vid skogsbruksåtgärder
        </h1>
        <div class="space-x-2 mt-8">
          <UButton to="/start" size="lg" :ui="{ rounded: 'rounded-full' }">
            Börja här
          </UButton>
          <UButton
            @click="isOpen = true"
            icon="heroicons:play-circle-solid"
            color="white"
            size="lg"
            trailing
            :ui="{ rounded: 'rounded-full' }"
          >
            Introduktionsfilm
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>
