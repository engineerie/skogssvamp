<template>
  <div
    class="fixed h-screen px-3 py-4 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-50 border-r-[1px] dark:border-neutral-700 border-neutral-300 flex flex-col justify-between"
  >
    <div class="flex flex-col items-center">
      <NuxtLink
        @click="closeSidebar"
        shape="full"
        to="/"
        class="mb-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Hem"
      >
        <icon name="hugeicons:mushroom" class="size-9 text-green-500" />
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
        :color="isInSvampData ? 'primary' : 'default'"
        @click="openSidebar"
        shape="full"
        to="/svampdata"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Svampar i olika skogar"
      >
        <icon name="mingcute:mushroom-line" class="h-5 w-5" />
      </BaseButtonIcon>
      <BaseButtonIcon
        :color="isInSkogsbruk ? 'primary' : 'default'"
        shape="full"
        to="/skogsbruk"
        class="h-5 w-5 my-5"
        data-nui-tooltip-position="right"
        data-nui-tooltip="Svampar och skogsbruk"
      >
        <icon
          name="material-symbols:nature-people-outline-rounded"
          class="h-5 w-5"
        />
      </BaseButtonIcon>
    </div>

    <div class="flex flex-col items-center">
      <BaseButtonIcon
        :color="isInGuide ? 'primary' : 'default'"
        @click="openSidebar"
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
        @click="openSidebar"
        shape="full"
        to="/about"
        class="h-5 w-5 my-5"
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

const route = useRoute();

const isActiveDirectory = (directory) => {
  return computed(() => {
    return route.path.includes(`/${directory}`);
  });
};

const isInSvampData = isActiveDirectory("svampdata");
const isInSkogsbruk = isActiveDirectory("skogsbruk");
const isInAbout = isActiveDirectory("about");
const isInSvampliv = isActiveDirectory("svampliv");
const isInGuide = isActiveDirectory("guide");
const isInHome = computed(() => route.path === "/");

const { openSidebar, isSidebarOpen, closeSidebar } = useSidebarStore(); // Destructure isSidebarOpen here
</script>
