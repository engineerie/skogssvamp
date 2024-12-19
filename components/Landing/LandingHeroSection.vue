<template>
  <UModal v-model="isOpen">
    <div class="p-4 w-full">
      <div
        class="relative w-full pb-[56.25%] bg-transparent border border-neutral-300 rounded-2xl cursor-pointer"
        style="
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 5px,
            transparent 5px,
            transparent 10px
          );
        "
      >
        <!-- Play Triangle -->
        <button
          class="absolute inset-0 flex items-center justify-center focus:outline-none"
          aria-label="Play Video"
          style="
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            margin: auto;
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#333"
            width="40"
            height="40"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  </UModal>
  <div class="py-64 z-10">
    <div class="container mx-auto px-6 flex flex-col lg:flex-row items-center">
      <!-- Text Content -->
      <div class="mb-10 lg:mb-0 lg:w-1/2">
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
        <BaseHeading
          size="7xl"
          lead="tight"
          class="text-gray-800 dark:text-white"
        >
          Se svampen<br /><span class="text-primary-500">i skogsmarken</span>
        </BaseHeading>
        <p class="mt-4 text-xl text-neutral-500 dark:text-gray-300">
          Utforska vilka mykorrhizasvampar som kan finnas i olika skogar och hur
          de reagerar vid skogsbruksåtgärder.
        </p>
        <NuxtLink
          to="/start"
          class="inline-flex items-center justify-center mt-8"
        >
          <div
            class="text-neutral-100 rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-primary-500 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-primary-400"
          >
            <!-- <Icon name="mingcute:mushroom-line" class="-ms-1 h-6 w-6 mr-3" /> -->
            <span>Kom igång</span>
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
