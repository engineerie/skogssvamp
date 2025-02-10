<template>
  <!-- The container changes width based on expanded state -->
  <div
    :class="[
      'fixed h-screen py-4 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-50 border-r-[1px] dark:border-neutral-700 border-neutral-300 flex flex-col justify-between',
      isExpanded ? 'w-72 px-4' : 'w-20 px-3',
    ]"
  >
    <!-- The two modals remain unchanged -->
    <UModal v-model="isPdfOpen" :ui="{ width: 'w-full sm:max-w-6xl' }">
      <!-- Modal Content for PDF Viewer -->
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

    <UModal v-model="isOpen" :ui="{ width: 'w-full sm:max-w-6xl' }">
      <!-- Modal Content for YouTube Iframe -->
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

    <!-- ─── TOP SECTION: Logo and Navigation ───────────────────────────── -->
    <div>
      <!-- Always show the logo -->
      <NuxtLink
        @click="closeSidebar"
        to="/"
        class="flex items-center"
        data-nui-tooltip="Tillbaka till startsida"
        data-nui-tooltip-position="right"
      >
        <img src="/images/slu_logo_svart_webb.png" alt="Logo" class="size-20" />
      </NuxtLink>

      <!-- Render the navigation links differently based on expanded state -->
      <div class="mt-4">
        <!-- Expanded: use UVerticalNavigation with a links array (including a divider) -->
        <template v-if="isExpanded">
          <UVerticalNavigation
            :links="navigationLinks"
            :ui="{ width: 'w-full' }"
          />
        </template>
        <!-- Collapsed: use the original icon buttons -->
        <template v-else>
          <div class="flex flex-col items-center">
            <BaseButtonIcon
              :color="isInStart ? 'primary' : 'default'"
              shape="full"
              to="/start"
              class="h-5 w-5 my-5"
              data-nui-tooltip="Översikt"
              data-nui-tooltip-position="right"
            >
              <icon
                name="material-symbols:grid-view-outline-rounded"
                class="h-5 w-5"
              />
            </BaseButtonIcon>
            <div
              class="border-b border-neutral-300 dark:border-neutral-700 w-full"
            ></div>
            <BaseButtonIcon
              :color="isInSvampData ? 'primary' : 'default'"
              shape="full"
              to="/svampdata/dashboard"
              class="h-5 w-5 my-5"
              data-nui-tooltip="Sveriges mykorrhizasvampar"
              data-nui-tooltip-position="right"
            >
              <icon
                name="material-symbols:map-outline-rounded"
                class="h-5 w-5"
              />
            </BaseButtonIcon>
            <BaseButtonIcon
              :color="isInSkogsbruk ? 'primary' : 'default'"
              shape="full"
              to="/skogsbruk"
              class="h-5 w-5 mb-5"
              data-nui-tooltip="Skogsskötsel"
              data-nui-tooltip-position="right"
            >
              <icon
                name="material-symbols:nature-people-outline-rounded"
                class="h-5 w-5"
              />
            </BaseButtonIcon>
            <div
              class="border-b border-neutral-300 dark:border-neutral-700 w-full"
            ></div>
            <BaseButtonIcon
              :color="isInSvampkunskap ? 'primary' : 'default'"
              shape="full"
              to="/svampkunskap"
              class="h-5 w-5 my-5"
              data-nui-tooltip="Svampkunskap"
              data-nui-tooltip-position="right"
            >
              <icon name="heroicons:book-open" class="h-5 w-5" />
            </BaseButtonIcon>
          </div>
        </template>
      </div>
    </div>

    <!-- ─── BOTTOM SECTION: Action Buttons & Toggle ───────────────────────── -->
    <div>
      <!-- In expanded mode, show full–width buttons with labels -->
      <div class="mt-4">
        <template v-if="isExpanded">
          <div class="mb-4">
            <BaseButtonIcon
              color="info"
              shape="full"
              @click="isOpen = true"
              class="w-full flex items-center px-2 py-1"
            >
              <icon name="heroicons:play-circle-solid" class="h-5 w-5 mr-2" />
              Introduktionsfilm
            </BaseButtonIcon>
            <BaseButtonIcon
              color="info"
              shape="full"
              @click.prevent="isPdfOpen = true"
              class="w-full flex items-center px-2 py-1 mt-2"
            >
              <icon name="heroicons:document-text-solid" class="h-5 w-5 mr-2" />
              Manual PDF
            </BaseButtonIcon>
          </div>
        </template>
        <!-- Collapsed mode: show the original icon–only buttons -->
        <template v-else>
          <div class="flex flex-col items-center">
            <BaseButtonIcon
              color="info"
              shape="full"
              @click="isOpen = true"
              class="h-5 w-5 my-5"
              data-nui-tooltip="Introduktionsfilm"
              data-nui-tooltip-position="right"
            >
              <icon name="heroicons:play-circle-solid" class="h-5 w-5" />
            </BaseButtonIcon>
            <BaseButtonIcon
              color="info"
              shape="full"
              @click.prevent="isPdfOpen = true"
              class="h-5 w-5 mb-5"
              data-nui-tooltip="Manual PDF"
              data-nui-tooltip-position="right"
            >
              <icon name="heroicons:document-text-solid" class="h-5 w-5" />
            </BaseButtonIcon>
            <div
              class="border-b border-neutral-300 dark:border-neutral-700 w-full"
            ></div>
            <BaseButtonIcon
              :color="isInGuide ? 'primary' : 'default'"
              shape="full"
              to="/guide"
              class="h-5 w-5 my-5"
              data-nui-tooltip="Dokumentation"
              data-nui-tooltip-position="right"
            >
              <icon name="mdi:file-cog-outline" class="h-5 w-5" />
            </BaseButtonIcon>
            <BaseButtonIcon
              :color="isInAbout ? 'primary' : 'default'"
              shape="full"
              to="/about"
              class="h-5 w-5 mb-5"
              data-nui-tooltip="Om Projektet"
              data-nui-tooltip-position="right"
            >
              <icon name="tabler:info-circle" class="h-5 w-5" />
            </BaseButtonIcon>
          </div>
        </template>
      </div>

      <!-- Expand/Collapse toggle button (always visible) -->
      <div class="mt-4 flex justify-center">
        <BaseButtonIcon
          @click="isExpanded = !isExpanded"
          shape="full"
          class="h-5 w-5"
          :data-nui-tooltip="isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'"
        >
          <icon
            :name="
              isExpanded
                ? 'heroicons:chevron-double-left'
                : 'heroicons:chevron-double-right'
            "
            class="h-5 w-5"
          />
        </BaseButtonIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSidebarStore } from "~/stores/sidebarStore";
import { useRoute } from "vue-router";

// States for the modals and the new expanded mode
const isOpen = ref(false);
const isPdfOpen = ref(false);
const isExpanded = ref(false);

// Path for the PDF (make sure it exists in your public folder)
const pdfUrl = "/docs/Manual.pdf";

const route = useRoute();
const isActiveDirectory = (directory: string) =>
  computed(() => route.path.includes(`/${directory}`));

const isInStart = isActiveDirectory("start");
const isInSvampData = isActiveDirectory("svampdata");
const isInSkogsbruk = isActiveDirectory("skogsbruk");
const isInSvampkunskap = isActiveDirectory("svampkunskap");
const isInAbout = isActiveDirectory("about");
const isInGuide = isActiveDirectory("guide");
const isInHome = computed(() => route.path === "/");

const { closeSidebar } = useSidebarStore();

// Navigation links that replace the icon buttons when expanded.
// Notice the divider property (which you can use with UVerticalNavigation to split sections)
const navigationLinks = [
  {
    label: "Översikt",
    icon: "i-material-symbols-grid-view-outline-rounded",
    to: "/start",
  },
  {
    label: "Sveriges mykorrhizasvampar",
    icon: "i-material-symbols-map-outline-rounded",
    to: "/svampdata/dashboard",
  },
  {
    label: "Skogsskötsel",
    icon: "i-material-symbols-nature-people-outline-rounded",
    to: "/skogsbruk",
  },
  {
    label: "Svampkunskap",
    icon: "i-heroicons-book-open",
    to: "/svampkunskap",
  },
  // This item starts a new section (divider before it)
  {
    label: "Dokumentation",
    icon: "i-heroicons-document-text",
    to: "/guide",
    divider: true,
  },
  {
    label: "Om Projektet",
    icon: "i-heroicons-information-circle",
    to: "/about",
  },
];
</script>
