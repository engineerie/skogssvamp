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

  <div class="pt-52 mb-16 z-10 mx-24">
    <div class="px-6 items-center text-center">
      <!-- Text Content -->
      <div class="mb-10 lg:mb-0">
        <!-- Existing content -->
        <!-- <BaseButton
          to="https://www.slu.se/ew-nyheter/2023/3/se-svampen-i-din-skog/"
          target="_blank"
          color="primary"
          flavor="pastel"
          size="sm"
          shape="full"
          class="border-[0.5px] border-green-500 inline-flex mb-5"
        >
          <span>Läs artikel på slu.se</span>
          <Icon name="lucide:arrow-up-right" class="me-1 h-4 w-4" />
        </BaseButton> -->
        <!-- <BaseHeading
          size="2xl"
          lead="tight"
          class="text-primary-500 dark:text-white"
        >
          Svampskogen.se
        </BaseHeading> -->
        <BaseHeading
          size="4xl"
          lead="tight"
          class="text-neutral-800 dark:text-white"
        >
          Utforska
          <span class="text-primary-500">mykorrhizasvampar</span>
          i olika skogar <br />
          och se hur de reagerar vid
          <span class="text-primary-500">skogsbruksåtgärder</span>
        </BaseHeading>
        <NuxtLink
          to="/start"
          class="inline-flex items-center justify-center mt-8"
        >
          <div
            class="text-neutral-100 rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-primary-500 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-primary-400"
          >
            <!-- <Icon name="mingcute:mushroom-line" class="-ms-1 h-6 w-6 mr-3" /> -->
            <span>Börja här</span>
          </div>
        </NuxtLink>
        <NuxtLink
          @click="isOpen = true"
          class="inline-flex items-center justify-center cursor-pointer"
        >
          <div
            class="rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50"
          >
            <span>Introduktionsfilm</span>
            <Icon
              name="heroicons:play-circle-solid"
              class="h-6 w-6 ml-1 -mr-2"
            />
          </div>
        </NuxtLink>
      </div>
      <!-- Placeholder Image -->
      <!-- <div class="lg:w-1/2 flex justify-center">
        <img
          src="public/images/EDNA_bilder_skog/Norr_Barrblandskog_1-40_Blåbär_grupp.png"
          alt="Placeholder Image"
          class="w-full h-auto max-w-md"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>
