<template>
  <div class="relative">
    <ThinSideBar
      :class="{ '-ml-20': isStartPage, 'ml-0 w-20': !isStartPage }"
      class="z-50 transition-all duration-300 sync-transition"
    />
    <SideBar
      :isSidebarOpen="isSidebarOpen"
      @toggleSidebar="toggleSidebar"
      class="z-30 sync-transition"
    />

    <div
      :class="[
        'fixed top-0 left-0 right-0 flex justify-between items-center z-20 transition-all duration-300',
        {
          'ml-0 hidden': isStartPage,
          'ml-16': isSvampdataSubRoute && !isStartPage,
          'ml-[400px]': isSidebarOpen && !isStartPage,
          'ml-[64px]': !isSidebarOpen && !isSvampdataSubRoute && !isStartPage,
          'ml-[20px]': isSidebarOpen && isDocumentation,
        },
      ]"
      class="bg-neutral-100 dark:bg-neutral-800 py-2"
    >
      <div
        class="px-6 container flex justify-between items-center mx-auto lg:max-w-full 2xl:max-w-screen-2xl"
      >
        <div class="flex gap-2">
          <button @click="toggleSidebar">
            <Icon
              name="material-symbols-light:data-info-alert-rounded"
              v-if="!isSidebarOpen"
              class="h-10 w-10 ml-3 text-green-500"
            />
            <ChevronLeftIcon v-else class="h-10 w-10 ml-2 text-green-500" />
          </button>
          <slot name="title" :key="route.path">
            <BaseHeading as="h1" weight="light" size="3xl" :key="route.path">
              {{ titleStore.title }}
            </BaseHeading>
          </slot>
        </div>
        <transition name="slide-down">
          <EnvironmentTitleSmall
            v-if="isDashboard && showEnvironmentTitleSmall"
            class="z-50 pointer-events-none"
          />
        </transition>

        <div class="flex justify-end gap-4 items-center">
          <!-- <BaseButtonIcon
            shape="full"
            size="md"
            v-if="isDashboard"
            data-nui-tooltip-position="down"
            data-nui-tooltip="Dela miljö på sociala medier"
          >
            <Icon name="material-symbols:share" class="size-5" />
          </BaseButtonIcon> -->
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
          <!-- <BaseButtonIcon
            shape="full"
            size="md"
            v-if="isDashboard"
            data-nui-tooltip-position="down"
            data-nui-tooltip="Spara miljö som PDF"
          >
            <Icon name="carbon:generate-pdf" class="size-5" />
          </BaseButtonIcon> -->
          <BaseMessage type="danger" icon>
            <span class="text-red-500">
              <b>Testversion:</b> information kan vara ofullständig eller
              felaktig
            </span>
          </BaseMessage>
          <!-- <BaseThemeSwitch /> -->
        </div>
      </div>
    </div>
    <div
      :class="{
        '': !isStartPage,

        'pl-0': isStartPage,
        'ml-16 ': !isStartPage,
        'ml-[400px]': isSidebarOpen && !isStartPage,
        'ml-[64px]':
          !isSidebarOpen &&
          !isSvampdataSubRoute &&
          !isExactSvampdata &&
          !isStartPage,
        'ml-[20px]': isSidebarOpen && isDocumentation,
        'sync-transition': true,
      }"
    >
      <div
        :class="{
          'py-4 pt-2 pl-6 pr-4': !isStartPage && !isExactSvampdata,
          'lg:max-w-full 2xl:max-w-screen-2xl mx-auto ': !isStartPage,
        }"
      >
        <div :class="{ 'p-4 pt-8': !isStartPage && !isExactSvampdata }">
          <slot />
        </div>
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

const showEnvironmentTitleSmall = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  showEnvironmentTitleSmall.value = window.scrollY > 100; // Adjust '100' to the desired scroll threshold
}

const toast = useToast();

const sidebarStore = useSidebarStore();
const titleStore = useTitleStore();
const route = useRoute();
const isStartPage = computed(() => route.path === "/");
const isSvampdata = computed(() => route.path === "/svampdata");
const isExactSvampdata = computed(() => route.path === "/svampdata");
const isSvampdataSubRoute = computed(() =>
  route.path.startsWith("/svampdata/")
);

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
    return "Skogsskötsel";
  }
  if (path.includes("/svampdata")) {
    return "Sveriges mykorrhizasvampar";
  }
  if (path.includes("/start")) {
    return "Skogssvamp";
  }
  if (path.includes("/svampkunskap")) {
    return "Svampkunskap";
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

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
