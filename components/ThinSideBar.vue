<template>
  <div
    class="fixed h-screen px-3 py-4 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-50 border-r-[1px] dark:border-neutral-700 border-neutral-300 flex flex-col justify-between"
  >
    <UModal
      v-model="isPdfOpen"
      :ui="{
        width: 'w-full sm:max-w-6xl',
      }"
    >
      <!-- Modal Content for PDF Viewer -->
      <div class="p-6 w-full">
        <!-- Increased padding for better layout -->
        <!-- PDF Viewer -->
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

    <div class="flex flex-col items-center">
      <NuxtLink
        @click="closeSidebar"
        shape="full"
        to="/"
        class="mb-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Tillbaka till startsida"
      >
        <img src="/images/LogoSmile2.svg" class="h-9" />
        <!-- <icon name="hugeicons:mushroom" class="size-9 text-green-500" /> -->
      </NuxtLink>
      <!-- <BaseButtonIcon
        :color="isInHome ? 'primary' : 'default'"
        @click="closeSidebar"
        shape="full"
        to="/"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Hem"
      >
       
      </BaseButtonIcon> -->
      <BaseButtonIcon
        :color="isInStart ? 'primary' : 'default'"
        shape="full"
        to="/start"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Översikt"
      >
        <icon
          name="material-symbols:grid-view-outline-rounded"
          class="h-5 w-5"
        />
      </BaseButtonIcon>
      <div
        class="border-b-[1px] border-neutral-300 dark:border-neutral-700 w-full"
      ></div>
      <BaseButtonIcon
        :color="isInSvampData ? 'primary' : 'default'"
        shape="full"
        to="/svampdata"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Sveriges mykorrhizasvampar"
      >
        <icon name="material-symbols:map-outline-rounded" class="h-5 w-5" />
      </BaseButtonIcon>
      <BaseButtonIcon
        :color="isInSkogsbruk ? 'primary' : 'default'"
        shape="full"
        to="/skogsbruk"
        class="h-5 w-5 mb-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Skogsskötsel"
      >
        <icon
          name="material-symbols:nature-people-outline-rounded"
          class="h-5 w-5"
        />
      </BaseButtonIcon>
      <div
        class="border-b-[1px] border-neutral-300 dark:border-neutral-700 w-full"
      ></div>
      <BaseButtonIcon
        :color="isInSvampkunskap ? 'primary' : 'default'"
        shape="full"
        to="/svampkunskap"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Svampkunskap"
      >
        <icon name="heroicons:book-open" class="h-5 w-5" />
      </BaseButtonIcon>
    </div>

    <div class="flex flex-col items-center">
      <BaseButtonIcon
        color="warning"
        shape="full"
        @click="isOpen = true"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Introduktionsfilm"
      >
        <icon name="heroicons:play-circle-solid" class="h-5 w-5" />
      </BaseButtonIcon>
      <BaseButtonIcon
        color="warning"
        shape="full"
        @click.prevent="isPdfOpen = true"
        class="h-5 w-5 mb-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Manual PDF"
      >
        <icon name="heroicons:document-text-solid" class="h-5 w-5" />
      </BaseButtonIcon>

      <div
        class="border-b-[1px] border-neutral-300 dark:border-neutral-700 w-full"
      ></div>
      <BaseButtonIcon
        :color="isInGuide ? 'primary' : 'default'"
        shape="full"
        to="/guide"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Dokumentation"
      >
        <icon name="mdi:file-cog-outline" class="h-5 w-5" />
      </BaseButtonIcon>
      <BaseButtonIcon
        :color="isInAbout ? 'primary' : 'default'"
        shape="full"
        to="/about"
        class="h-5 w-5 mb-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Om Projektet"
      >
        <icon name="tabler:info-circle" class="h-5 w-5" />
      </BaseButtonIcon>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useSidebarStore } from "~/stores/sidebarStore";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const isPdfOpen = ref(false); // New state for PDF modal

const pdfUrl = "/docs/Manual.pdf"; // Ensure the path matches the location in public/

const route = useRoute();

const isActiveDirectory = (directory) => {
  return computed(() => {
    return route.path.includes(`/${directory}`);
  });
};

const isInStart = isActiveDirectory("start");
const isInSvampData = isActiveDirectory("svampdata");
const isInSkogsbruk = isActiveDirectory("skogsbruk");
const isInSvampkunskap = isActiveDirectory("svampkunskap");
const isInAbout = isActiveDirectory("about");
// const isInSvampliv = isActiveDirectory("svampkunskap");
const isInGuide = isActiveDirectory("guide");
const isInHome = computed(() => route.path === "/");

const { openSidebar, isSidebarOpen, closeSidebar } = useSidebarStore(); // Destructure isSidebarOpen here
</script>
