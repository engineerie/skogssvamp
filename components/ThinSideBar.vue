<template>
  <!-- Modal for PDF Viewer -->
  <UModal v-model="isPdfOpen" :ui="{ width: 'w-full sm:max-w-6xl' }">
    <div class="p-6 w-full">
      <div
        class="relative w-full h-[80vh] border border-neutral-200 rounded-2xl"
      >
        <iframe
          class="absolute top-0 left-0 w-full h-full rounded-2xl"
          :src="pdfUrl"
          title="PDF Viewer"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </UModal>

  <!-- Modal for YouTube (Introduktionsfilm) -->
  <UModal v-model="isOpen" :ui="{ width: 'w-full sm:max-w-6xl' }">
    <div class="p-6 w-full">
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

  <!-- Sidebar Container -->
  <div
    :class="[
      'transition-all z-50 fixed inset-1 rounded-xl  ring-neutral-200 py-4 bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-50 shadow-md flex flex-col justify-between',
      isExpanded ? 'w-64 px-3' : 'w-[72px] px-3',
      isInHome ? '-ml-20' : '',
    ]"
  >
    <!-- TOP GROUP: Logo + Navigation Buttons -->
    <div>
      <!-- LOGO -->
      <NuxtLink
        @click="closeSidebar"
        to="/"
        class="flex items-center -mx-4 -my-3"
        data-nui-tooltip="Tillbaka till startsida"
        data-nui-tooltip-position="right"
      >
        <img src="/images/slu_logo_svart_webb.png" alt="Logo" class="size-20" />
      </NuxtLink>

      <!-- TOP SECTION (Navigation Buttons) -->
      <div class="mt-4 flex flex-col">
        <!-- Översikt Button -->
        <div
          class="mb-2"
          :data-nui-tooltip="!isExpanded ? 'Översikt' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <NuxtLink
            to="/start"
            class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              isInStart
                ? '  bg-primary-500 hover:bg-primary-500'
                : 'text-neutral-800',
            ]"
          >
            <icon
              name="heroicons:squares-2x2"
              class="size-6 transition-all"
              :class="isInStart ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
                :class="isInStart ? 'text-white' : 'text-neutral-800'"
              >
                Översikt
              </span>
            </Transition>
          </NuxtLink>
        </div>

        <!-- Separator -->
        <hr class="border-neutral-300 dark:border-neutral-700" />

        <!-- Mykorrhizasvampar Button -->
        <div
          class="mt-2 mb-1"
          :data-nui-tooltip="!isExpanded ? 'Mykorrhizasvampar' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <NuxtLink
            to="/svampdata/dashboard"
            class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              isInSvampData
                ? '  bg-primary-500 hover:bg-primary-500'
                : 'text-neutral-800',
            ]"
          >
            <icon
              name="lineicons:mushroom-1"
              class="size-6 transition-all"
              :class="isInSvampData ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
                :class="isInSvampData ? 'text-white' : 'text-neutral-800'"
              >
                Mykorrhizasvampar
              </span>
            </Transition>
          </NuxtLink>
        </div>

        <!-- Skogsskötsel Button -->
        <div
          class="mb-2"
          :data-nui-tooltip="!isExpanded ? 'Skogsskötsel' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <NuxtLink
            to="/skogsbruk"
            class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              isInSkogsbruk
                ? '  bg-primary-500 hover:bg-primary-500'
                : 'text-neutral-800',
            ]"
          >
            <icon
              name="material-symbols:nature-people-outline-rounded"
              class="size-6 transition-all"
              :class="isInSkogsbruk ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
                :class="isInSkogsbruk ? 'text-white' : 'text-neutral-800'"
              >
                Skogsskötsel
              </span>
            </Transition>
          </NuxtLink>
        </div>

        <!-- Separator -->
        <hr class="border-neutral-300 dark:border-neutral-700" />

        <!-- Svampkunskap Button -->
        <div
          class="mt-2"
          :data-nui-tooltip="!isExpanded ? 'Svampkunskap' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <NuxtLink
            to="/svampkunskap"
            class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              isInSvampkunskap
                ? '  bg-primary-500 hover:bg-primary-500'
                : 'text-neutral-800',
            ]"
          >
            <icon
              name="i-heroicons-book-open"
              class="size-6 transition-all"
              :class="isInSvampkunskap ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
                :class="isInSvampkunskap ? 'text-white' : 'text-neutral-800'"
              >
                Svampkunskap
              </span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- BOTTOM SECTION -->
    <div>
      <!-- Modal Trigger Buttons Group -->
      <div class="mt-4 mb-2 flex flex-col space-y-1">
        <div
          :data-nui-tooltip="'Introduktionsfilm'"
          data-nui-tooltip-position="right"
        >
          <button
            @click="isOpen = true"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              'flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200  border-primary-500 border-2 border-dashed',
            ]"
          >
            <icon
              name="heroicons:play-circle-solid"
              class="size-6 transition-all"
              :class="isOpen ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
              >
                Introduktionsfilm
              </span>
            </Transition>
          </button>
        </div>
        <div
          :data-nui-tooltip="!isExpanded ? 'Manual PDF' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <button
            @click.prevent="isPdfOpen = true"
            :class="[
              isExpanded ? 'w-full' : 'w-12 h-12',
              'flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200  border-primary-500 border-2 border-dashed',
            ]"
          >
            <icon
              name="tabler:pdf"
              class="size-6 transition-all"
              :class="isPdfOpen ? 'text-white' : 'text-neutral-700'"
            />
            <Transition name="fade">
              <span
                v-if="isExpanded"
                class="text-md whitespace-nowrap transition-all"
              >
                Manual PDF
              </span>
            </Transition>
          </button>
        </div>
      </div>

      <!-- Separator -->
      <hr class="border-neutral-300 dark:border-neutral-700" />

      <!-- Documentation & Om Projektet Buttons -->
      <div class="mt-2 flex flex-col space-y-1">
        <NuxtLink
          to="/guide"
          class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
          :class="[
            isExpanded ? 'w-full' : 'w-12 h-12',
            isInGuide
              ? '  bg-primary-500 hover:bg-primary-500'
              : 'text-neutral-800',
          ]"
          :data-nui-tooltip="!isExpanded ? 'Dokumentation' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <icon
            name="i-heroicons-document-text"
            class="size-6 transition-all"
            :class="isInGuide ? 'text-white' : 'text-neutral-700'"
          />
          <Transition name="fade">
            <span
              v-if="isExpanded"
              class="text-md whitespace-nowrap transition-all"
              :class="isInGuide ? 'text-white' : 'text-neutral-800'"
            >
              Dokumentation
            </span>
          </Transition>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="flex items-center p-3 rounded-full space-x-2 transition-all overflow-hidden hover:bg-neutral-200"
          :class="[
            isExpanded ? 'w-full' : 'w-12 h-12',
            isInAbout
              ? '  bg-primary-500 hover:bg-primary-500'
              : 'text-neutral-800',
          ]"
          :data-nui-tooltip="!isExpanded ? 'Om Projektet' : null"
          :data-nui-tooltip-position="!isExpanded ? 'right' : null"
        >
          <icon
            name="i-heroicons-information-circle"
            class="size-6 transition-all"
            :class="isInAbout ? 'text-white' : 'text-neutral-700'"
          />
          <Transition name="fade">
            <span
              v-if="isExpanded"
              class="text-md whitespace-nowrap transition-all"
              :class="isInAbout ? 'text-white' : 'text-neutral-800'"
            >
              Om Projektet
            </span>
          </Transition>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose, watch } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebarStore";

const isExpanded = ref(false);
const isOpen = ref(false);
const isPdfOpen = ref(false);
const route = useRoute();
const { closeSidebar } = useSidebarStore();

const pdfUrl = "/docs/Manual.pdf";

// Active directory helpers – a button will be “active” if the current URL includes the directory.
const isActiveDirectory = (directory: string) =>
  computed(() => route.path.includes(`/${directory}`));

const isInStart = isActiveDirectory("start");
const isInSvampData = isActiveDirectory("svampdata");
const isInSkogsbruk = isActiveDirectory("skogsbruk");
const isInSvampkunskap = isActiveDirectory("svampkunskap");
const isInGuide = isActiveDirectory("guide");
const isInAbout = isActiveDirectory("about");

const isInHome = computed(() => route.path === "/");

watch(isInHome, (newValue) => {
  if (newValue) {
    isExpanded.value = false;
  }
});

// New method to toggle expansion
function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

// Expose the toggle method (and even the current state, if needed)
defineExpose({
  toggleExpand,
  isExpanded,
});
</script>

<style scoped>
/* Fade-in (Expanding) */
.fade-enter-active {
  transition: opacity 0.2s ease-in-out;
  transition-delay: 0.2s;
}

/* Fade-out (Collapsing) */
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

/* Initial and final opacity */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
