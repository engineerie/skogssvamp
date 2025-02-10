<template>
  <div class="md:hidden">
    <!-- Navigation Bar -->
    <div
      :class="[
        'fixed top-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-900  z-50  ring-neutral-200 ',
        isMenuOpen ? 'ring-0' : 'ring-1 ',
      ]"
    >
      <div class="w-full flex justify-center -mb-6">
        <BaseHeading size="xs" weight="medium">Svampskog.se</BaseHeading>
      </div>
      <div class="flex justify-between items-center py-2 pl-1 pr-4">
        <!-- Logo -->
        <NuxtLink to="/" class="-my-3 -mx-2">
          <img
            src="/images/slu_logo_svart_webb.png"
            alt="Logo"
            class="size-20"
          />
        </NuxtLink>

        <!-- Hamburger Menu Button -->
        <button
          @click="toggleMenu"
          aria-label="Toggle Menu"
          class="focus:outline-none"
        >
          <Icon v-if="!isMenuOpen" name="heroicons:bars-3" class="size-8" />
          <Icon v-else name="heroicons:x-mark" class="size-8" />
          <!-- <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8h16M4 16h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> -->
        </button>
      </div>
    </div>

    <!-- Full-screen Mobile Menu Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-neutral-100 dark:bg-neutral-900 z-40 flex flex-col"
      >
        <!-- Optional: Close button at the top-right of the overlay -->
        <!-- <div class="flex justify-end p-4">
          <button
            @click="closeMenu"
            aria-label="Close Menu"
            class="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div> -->
        <!-- Navigation Links -->
        <div class="p-4 mt-12">
          <h1 class="text-sm text-neutral-400 mt-4 mb-2">Funktioner</h1>
          <ul class="flex flex-col space-y-2">
            <li class="flex items-center">
              <Icon name="lineicons:mushroom-1" class="me-2 block w-5 h-5" />
              <NuxtLink
                to="/svampdata"
                @click="closeMenu"
                class="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 text-lg"
              >
                Sveriges mykorrhizasvampar
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <Icon
                name="healthicons:forest-persons-outline"
                class="me-2 block size-6"
              />
              <NuxtLink
                to="/skogsbruk"
                @click="closeMenu"
                class="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 text-lg"
              >
                Skogsskötsel
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <Icon name="heroicons:book-open" class="me-2 block w-5 h-5" />
              <NuxtLink
                to="/svampkunskap"
                @click="closeMenu"
                class="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 text-lg"
              >
                Svampkunskap
              </NuxtLink>
            </li>
          </ul>
          <h1 class="text-sm text-neutral-400 mt-8 mb-2">Dokumentation</h1>
          <ul class="flex flex-col space-y-2">
            <li>
              <NuxtLink
                to="/guide"
                @click="closeMenu"
                class="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 text-lg"
              >
                Översikt
              </NuxtLink>
            </li>
          </ul>
          <h1 class="text-sm text-neutral-400 mt-8 mb-2">Om projektet</h1>
          <ul class="flex flex-col space-y-2">
            <li>
              <NuxtLink
                to="/about"
                @click="closeMenu"
                class="block text-neutral-700 dark:text-neutral-300 hover:text-primary-500 text-lg"
              >
                Syfte och kontakt
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const isMenuOpen = ref(false);

watch(isMenuOpen, (val) => {
  if (val) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Fade transition for the full-screen overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
