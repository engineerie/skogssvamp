<template>
  <div class="relative">
    <MobileTopNav />
    <ThinSideBar
      ref="thinSideBar"
      :class="{ '-ml-20': isStartPage, 'ml-0 w-20': !isStartPage }"
      class="z-50 transition-all duration-300 sync-transition hidden md:block"
    />
    <SideBar
      :isSidebarOpen="isSidebarOpen"
      @toggleSidebar="toggleSidebar"
      class="z-30 sync-transition"
    />

    <div
      :class="[
        'fixed top-0 left-0 right-0 justify-between items-center z-20 transition-all duration-300 hidden md:flex',
        {
          'ml-0 md:hidden': isStartPage,
          // 'md:ml-16': isSvampdataSubRoute && !isStartPage,
          'md:ml-[240px]': thinSideBar?.isExpanded && !isStartPage,
          'md:ml-[50px]': !thinSideBar?.isExpanded && !isStartPage,
          'md:ml-[20px]': thinSideBar?.isExpanded && isDocumentation,
        },
      ]"
      class="bg-neutral-100 dark:bg-neutral-800 py-2"
    >
      <div
        class="px-6 container flex justify-between items-center mx-auto lg:max-w-full 2xl:max-w-screen-2xl"
      >
        <div class="flex gap-2">
          <button @click="toggleThinSidebar">
            <!-- The icon can depend on whether the ThinSideBar is expanded -->
            <Icon
              name="heroicons:bars-3-bottom-left-solid"
              v-if="!thinSideBar?.isExpanded"
              class="h-8 w-8 ml-3 text-green-500"
            />
            <ChevronLeftIcon v-else class="h-8 w-8 ml-2 text-green-500" />
          </button>

          <Breadcrumb />
          <!-- <slot name="title" :key="route.path">
            <BaseHeading
              class="text-neutral-800"
              as="h1"
              weight="medium"
              size="3xl"
              :key="route.path"
            >
              {{ titleStore.title }}
            </BaseHeading>
          </slot> -->
        </div>

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
          <transition name="slide-down">
            <EnvironmentTitleSmall
              v-if="isDashboard && showEnvironmentTitleSmall"
              class="z-50 pointer-events-none"
            />
          </transition>
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
          <!-- <BaseMessage type="danger" icon>
            <span class="text-red-500">
              <b>Testversion:</b> information kan vara ofullständig eller
              felaktig
            </span>
          </BaseMessage> -->
          <!-- <BaseThemeSwitch /> -->
        </div>
      </div>
    </div>

    <div class="min-h-screen flex flex-col">
      <div
        :class="{
          '': !isStartPage,
          'pl-0': isStartPage,
          'md:ml-16': !isStartPage,
          'md:ml-[240px]': thinSideBar?.isExpanded && !isStartPage,
          'md:ml-[20px]': thinSideBar?.isExpanded && isDocumentation,
          'sync-transition': true,
        }"
        class="flex-grow"
      >
        <div
          :class="{
            'py-4 pt-2 md:pl-6 md:pr-4': !isStartPage,
            'lg:max-w-full 2xl:max-w-screen-2xl mx-auto': !isStartPage,
          }"
        >
          <div :class="{ 'p-4 pt-8': !isStartPage }">
            <slot />
          </div>
        </div>
      </div>
      <footer
        class="bg-transparent border-t border-neutral-200 flex justify-end p-4"
      >
        <UPopover
          class="fixed bottom-4 right-4"
          :popper="{ placement: 'top-end' }"
          :ui="{ rounded: 'rounded-xl' }"
        >
          <!-- Trigger: the suggestion button -->
          <button
            class="rounded-full bg-primary-500 text-white px-2 py-1 text-sm"
          >
            Föreslå förbättringar
          </button>

          <!-- Panel: the form submission -->
          <template #panel="{ close }">
            <div class="p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
              <BaseHeading size="2xl" class="text-neutral-800 mb-1">
                Föreslå en förbättring
              </BaseHeading>
              <p class="w-96 mb-2 text-neutral-500">
                Har du idéer på förbättringar? Dela dina tankar och hjälp oss
                göra svampskog.se ännu bättre.
              </p>
              <form
                action="https://formsubmit.co/jacob.bertilsson@gmail.com"
                method="POST"
              >
                <div class="mb-2">
                  <BaseCheckbox
                    label="Meddelande gäller den aktiva sidan"
                    color="primary"
                    v-model="includeUrl"
                    shape="full"
                  />

                  <transition name="fade">
                    <div
                      v-if="displayUrl"
                      class="text-sm text-neutral-500 w-96 mt-1 truncate"
                    >
                      {{ displayUrl }}
                    </div>
                  </transition>

                  <!-- Skicka aktuell URL med formuläret -->
                  <input type="hidden" name="pageUrl" :value="displayUrl" />
                </div>
                <div class="flex mb-2 gap-2">
                  <UInput
                    variant="outline"
                    type="text"
                    name="name"
                    placeholder="Namn"
                    required
                    :ui="{ rounded: 'rounded-lg' }"
                    class="w-52"
                  />
                  <UInput
                    variant="outline"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    :ui="{ rounded: 'rounded-lg' }"
                    class="w-52"
                  />
                </div>
                <div class="mb-2">
                  <UTextarea
                    :rows="10"
                    variant="outline"
                    name="message"
                    placeholder="Meddelande"
                    required
                    :ui="{ rounded: 'rounded-lg' }"
                  />
                </div>
                <!-- Checkbox to include current URL -->

                <div class="flex justify-end gap-2">
                  <UButton
                    type="submit"
                    color="white"
                    variant="solid"
                    class="rounded-full"
                  >
                    Skicka
                  </UButton>
                  <UButton
                    type="button"
                    variant="outline"
                    class="rounded-full"
                    @click="close"
                  >
                    Avbryt
                  </UButton>
                </div>
              </form>
            </div>
          </template>
        </UPopover>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onServerPrefetch, watch, toRefs, computed } from "vue";
import { Bars3CenterLeftIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useTitleStore } from "~/stores/titleStore";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebarStore";

const thinSideBar = ref(null);

// Change the toggle function to call the ThinSideBar's toggle method
function toggleThinSidebar() {
  thinSideBar.value && thinSideBar.value.toggleExpand();
}

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

const includeUrl = ref(false);

// currentUrl uppdateras vid route-ändringar
const currentUrl = computed(() => {
  // Referera till route.path så computed blir reaktiv vid ruttändring
  const _ = route.path;
  return window.location.href;
});
// displayUrl är tom om checkboxen inte är markerad
const displayUrl = computed(() => (includeUrl.value ? currentUrl.value : ""));

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
