<template>
  <ThinSideBar class="z-50" />
  <SideBar :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />
  <div
    :class="{
      'w-full': isStartPage,
      'ml-[434px]': isSidebarOpen && !isStartPage,
      'ml-[64px]': !isSidebarOpen && !isStartPage,
      'sync-transition': true,
    }"
  >
    <div
      :class="{
        'py-4 pr-8 pt-2 pl-8': !isStartPage,
        'lg:max-w-full 2xl:max-w-screen-2xl mx-auto': !isStartPage,
      }"
    >
      <div v-if="!isStartPage" class="flex justify-between items-center">
        <div class="flex gap-2">
          <button @click="toggleSidebar">
            <Bars3CenterLeftIcon
              v-if="!isSidebarOpen"
              class="h-10 w-10 ml-3 text-green-500"
            />
            <ChevronLeftIcon v-else class="h-10 w-10 ml-2 text-green-500" />
          </button>
          <slot name="title">
            <BaseHeading as="h1" weight="light" size="3xl">{{
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
      <div v-if="isStartPage" class="flex justify-end items-center p-4"></div>
      <div :class="{ 'p-4 pt-8': !isStartPage }">
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

const sidebarStore = useSidebarStore();
const titleStore = useTitleStore();
const route = useRoute();
const isStartPage = computed(() => route.path === "/");
const isDashboard = computed(() =>
  route.path.startsWith("/svampdata/dashboard/")
);
const { isSidebarOpen, toggleSidebar } = toRefs(sidebarStore); // Destructure from the same instance

watch(isDashboard, (newVal) => {
  if (newVal) {
    sidebarStore.closeSidebar(); // Close the sidebar when dashboard is loaded
  }
});
</script>

<style>
/* Add this to your styles */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
