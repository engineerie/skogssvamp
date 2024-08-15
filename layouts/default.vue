<template>
  <ThinSideBar class="z-50" />
  <SideBar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />
  <div
    :class="{
      'pl-4': isStartPage,
      'ml-20': isSvampdata,

      'ml-[350px]': isSidebarOpen && !isStartPage,
      'ml-[64px]': !isSidebarOpen && !isSvampdata,

      'ml-[20px]': isSidebarOpen && isDocumentation,
      'sync-transition': true,
    }"
  >
    <div
      :class="{
        'py-4 pr-8 pt-2 pl-8': !isStartPage && !isSvampdata,
        'lg:max-w-full 2xl:max-w-screen-2xl mx-auto':
          !isStartPage && !isSvampdata,
      }"
    >
      <div
        v-if="!isStartPage && !isSvampdata"
        class="flex justify-between items-center"
      >
        <div class="flex gap-2">
          <button @click="toggleSidebar">
            <Bars3CenterLeftIcon
              v-if="!isSidebarOpen"
              class="h-10 w-10 ml-3 text-green-500"
            />
            <ChevronLeftIcon v-else class="h-10 w-10 ml-2 text-green-500" />
          </button>
          <slot name="title" :key="route.path">
            <BaseHeading as="h1" weight="light" size="3xl" :key="route.path">{{
              titleStore.title
            }}</BaseHeading>
            <!-- <div class="z-60 ml-4 mr-4">
                <BaseMessage type="danger" icon>Under utveckling! Information som presenteras kan vara ofullständig eller felaktig. Färdig version lanseras våren 2025. </BaseMessage></div> -->
          </slot>
        </div>
        <div class="flex justify-end gap-4 items-center">
          <BaseButtonIcon
            shape="full"
            size="md"
            v-if="isDashboard"
            data-nui-tooltip-position="down"
            data-nui-tooltip="Dela miljö på sociala medier"
          >
            <Icon name="material-symbols:share" class="size-5" />
          </BaseButtonIcon>
          <BaseButtonIcon
            shape="full"
            size="md"
            v-if="isDashboard"
            data-nui-tooltip-position="down"
            data-nui-tooltip="Kopiera länk till miljön"
            @click="copyLinkToClipboard"
          >
            <Icon name="akar-icons:link-chain" class="size-5" />
          </BaseButtonIcon>
          <BaseButtonIcon
            shape="full"
            size="md"
            v-if="isDashboard"
            data-nui-tooltip-position="down"
            data-nui-tooltip="Spara miljö som PDF"
          >
            <Icon name="carbon:generate-pdf" class="size-5" />
          </BaseButtonIcon>
          <BaseThemeSwitch />
        </div>
      </div>
      <!-- <div v-if="isStartPage" class="flex justify-end items-center"></div> -->
      <div :class="{ 'p-4 pt-8': !isStartPage && !isSvampdata }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onServerPrefetch, watch, toRefs, computed } from "vue";
import { Bars3CenterLeftIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useTitleStore } from "~/stores/titleStore";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebarStore";

const toast = useToast();

const sidebarStore = useSidebarStore();
const titleStore = useTitleStore();
const route = useRoute();
const isStartPage = computed(() => route.path === "/");
const isSvampdata = computed(() => route.path === "/svampdata");

const isDocumentation = computed(() => route.path === "/guide");

const isDashboard = computed(() =>
  route.path.startsWith("/svampdata/dashboard/")
);
const { isSidebarOpen, toggleSidebar } = toRefs(sidebarStore); // Destructure from the same instance

watch(isSvampdata, (newVal) => {
  if (newVal) {
    sidebarStore.closeSidebar(); // Ensure the sidebarStore has a method to close the sidebar
  }
});

watch(isDashboard, (newVal) => {
  if (newVal) {
    sidebarStore.closeSidebar(); // Close the sidebar when dashboard is loaded
  }
});

const copyLinkToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast.add({
        title: "Länken har kopierats till urklipp.",
        type: "success", // Assuming your toast system supports different types
      });
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.add({
        title: "Kunde inte kopiera länken.",
        type: "error",
      });
    });
};

watch(
  () => route.path,
  (newPath) => {
    // Logic to determine the title based on the route path
    const newTitle = determineTitle(newPath);
    titleStore.setTitle(newTitle);
  },
  { immediate: true } // Ensure it runs initially
);

function determineTitle(path) {
  // Implement your logic to return the title based on the route
  if (path.includes("/skogsbruk")) {
    return "Skogssbruk";
  }
  if (path.includes("svampdata")) {
    return "Svamparter";
  }
  if (path.includes("/guide")) {
    return "Dokumentation";
  }
  if (path.includes("/about")) {
    return "Om projektet";
  }
  return "Default Title";
}
</script>

<style>
/* Add this to your styles */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
