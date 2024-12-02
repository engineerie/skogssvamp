<template>
  <div>
    <!-- Navigation Bar -->
    <div
      ref="navRef"
      :class="[
        'fixed top-0 left-0 right-0 py-3 px-6 transition-transform duration-300 z-50',
        isSticky ? 'fixed' : 'absolute',
        hideNav ? '-translate-y-full' : 'translate-y-0',
        scrollTopLessThan10
          ? 'bg-neutral-100 dark:bg-opacity-0 backdrop-blur-none dark:backdrop-blur-none border-b border-neutral-200'
          : 'bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-80 backdrop-blur-xl dark:backdrop-blur-xl border-b border-neutral-200',
      ]"
      @mouseleave="clearActiveMenu"
    >
      <!-- Inner Container for Content -->
      <div class="container mx-auto max-w-screen-xl px-6 flex items-center">
        <!-- Left Side: Logo -->
        <div class="flex items-center">
          <NuxtImg src="/images/LogoSmile2.svg" class="h-10 mr-2" />
        </div>

        <!-- Center: Navigation Links -->
        <nav
          aria-label="Primary Navigation"
          class="flex-grow flex justify-center"
        >
          <ul
            role="menubar"
            class="flex space-x-8"
            @mouseenter="handleNavMouseEnter"
            @mouseleave="handleNavMouseLeave"
          >
            <!-- Funktioner Menu -->
            <li role="none">
              <button
                role="menuitem"
                aria-haspopup="true"
                :aria-expanded="activeMenu === 'funktioner'"
                :class="[
                  'text-lg font-medium focus:outline-none transition-all cursor-default',
                  {
                    'opacity-50': activeMenu && activeMenu !== 'funktioner',
                  },
                ]"
                @mouseenter="setActiveMenu('funktioner')"
                @mouseleave="clearActiveMenu"
                @click="toggleMenu('funktioner')"
              >
                Funktioner
              </button>
            </li>

            <!-- Dokumentation Menu -->
            <li role="none">
              <button
                role="menuitem"
                aria-haspopup="true"
                :aria-expanded="activeMenu === 'dokumentation'"
                :class="[
                  'text-lg font-medium focus:outline-none transition-all cursor-default',
                  {
                    'opacity-50': activeMenu && activeMenu !== 'dokumentation',
                  },
                ]"
                @mouseenter="setActiveMenu('dokumentation')"
                @mouseleave="clearActiveMenu"
                @click="toggleMenu('dokumentation')"
              >
                Dokumentation
              </button>
            </li>

            <!-- Om projektet Menu -->
            <li role="none">
              <button
                role="menuitem"
                aria-haspopup="true"
                :aria-expanded="activeMenu === 'omProjektet'"
                :class="[
                  'text-lg font-medium focus:outline-none transition-all cursor-default',
                  {
                    'opacity-50': activeMenu && activeMenu !== 'omProjektet',
                  },
                ]"
                @mouseenter="setActiveMenu('omProjektet')"
                @mouseleave="clearActiveMenu"
                @click="toggleMenu('omProjektet')"
              >
                Om projektet
              </button>
            </li>
          </ul>
        </nav>

        <!-- Right Side: Theme Switch -->
        <div class="flex items-center">
          <BaseThemeSwitch />
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div
      :class="[
        'fixed inset-0 bg-green-500 z-30 transition-all',
        {
          'opacity-50': activeMenu,
          'opacity-0 pointer-events-none': !activeMenu,
        },
      ]"
      @click="closeMenu"
    ></div>

    <!-- Dropdown Menu -->
    <Transition name="slide-down">
      <div
        v-if="activeMenu"
        class="fixed left-0 right-0 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 shadow-md z-40"
        :style="{ top: navHeight - 10 + 'px' }"
        @mouseenter="handleDropdownMouseEnter"
        @mouseleave="handleDropdownMouseLeave"
      >
        <!-- Inner Container for Dropdown Content -->
        <div class="container mx-auto max-w-screen-xl px-6 py-4">
          <!-- Funktioner Dropdown Content -->
          <div
            v-if="activeMenu === 'funktioner'"
            class="grid grid-cols-5 pt-4 pb-2"
          >
            <div></div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Appfunktioner
              </BaseHeading>
              <NuxtLink
                to="/svampdata"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                <Icon
                  name="mingcute:mushroom-line"
                  class="me-2 block w-5 h-5"
                />
                Svamparter
              </NuxtLink>
              <NuxtLink
                to="/skogsbruk"
                @click="closeMenu"
                class="flex items-center text-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                <Icon
                  name="material-symbols:nature-people-outline-rounded"
                  class="me-2 block w-5 h-5"
                />
                Skogsbruk
              </NuxtLink>
            </div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Resurser
              </BaseHeading>
              <NuxtLink
                to="/svampkunskap"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                <Icon name="heroicons:book-open" class="me-2 block w-5 h-5" />
                Svampkunskap
              </NuxtLink>
            </div>
            <!-- Columns 4 & 5 remain empty -->
            <div></div>
            <div></div>
          </div>

          <!-- Dokumentation Dropdown Content -->
          <div
            v-else-if="activeMenu === 'dokumentation'"
            class="grid grid-cols-5 pt-4 pb-2"
          >
            <div></div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Sveriges mykorrhizasvampar
              </BaseHeading>
              <NuxtLink
                to="/svampdata"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Markinventeringen
              </NuxtLink>
              <NuxtLink
                to="/skogsbruk"
                @click="closeMenu"
                class="flex items-center text-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Kartfunktion
              </NuxtLink>
            </div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Skogsbruk
              </BaseHeading>
              <NuxtLink
                to="/skogsbruk/skogshistorik"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Skogshistorik
              </NuxtLink>
            </div>
            <!-- Columns 4 & 5 remain empty -->
            <div></div>
            <div></div>
          </div>

          <!-- Om Projektet Dropdown Content -->
          <div
            v-else-if="activeMenu === 'omProjektet'"
            class="grid grid-cols-5 pt-4 pb-2"
          >
            <div></div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Bakgrund
              </BaseHeading>
              <NuxtLink
                to="/om-projektet/syfte"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Syfte med projektet
              </NuxtLink>
              <NuxtLink
                to="/om-projektet/finansiering"
                @click="closeMenu"
                class="flex items-center text-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Finansiering
              </NuxtLink>
            </div>
            <div>
              <BaseHeading
                weight="thin"
                size="sm"
                class="text-neutral-400 mb-2"
              >
                Hör av dig
              </BaseHeading>
              <NuxtLink
                to="/om-projektet/kontakt"
                @click="closeMenu"
                class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded"
              >
                Kontakt
              </NuxtLink>
            </div>
            <!-- Columns 4 & 5 remain empty -->
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, onActivated } from "vue";
import { useRoute } from "#app"; // Import useRoute from Nuxt's composables

const route = useRoute(); // Initialize the route object

const isSticky = ref(false);
const hideNav = ref(false);
const scrollTopLessThan10 = ref(false);
const activeMenu = ref(null); // Tracks which menu is active
const navRef = ref(null); // Reference to the navigation bar
const navHeight = ref(64); // Default nav height in pixels (adjust as needed)

let lastScrollY = 0;
const hideTimeout = ref(null); // Reference to the hide timeout

const isHoveringNav = ref(false);
const isHoveringDropdown = ref(false);

// Function to set the active menu
const setActiveMenu = (menu) => {
  activeMenu.value = menu;
  isHoveringNav.value = true;
  console.log(`setActiveMenu: ${menu}`);
  // Clear any existing hide timeout when activating a menu
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

// Function to toggle the active menu (for click interactions)
const toggleMenu = (menu) => {
  if (activeMenu.value === menu) {
    activeMenu.value = null;
  } else {
    activeMenu.value = menu;
  }
};

// Function to close the menu
const closeMenu = () => {
  activeMenu.value = null;
  console.log("Menu closed.");
};

// Functions to handle hover events on nav
const handleNavMouseEnter = () => {
  isHoveringNav.value = true;
  console.log("handleNavMouseEnter: hovering over nav");
  // Clear any existing hide timeout
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

const handleNavMouseLeave = () => {
  isHoveringNav.value = false;
  console.log("handleNavMouseLeave: not hovering over nav");
};

// Functions to handle hover events on dropdown
const handleDropdownMouseEnter = () => {
  isHoveringDropdown.value = true;
  console.log("handleDropdownMouseEnter: hovering over dropdown");
  // Clear any existing hide timeout
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

const handleDropdownMouseLeave = () => {
  isHoveringDropdown.value = false;
  console.log("handleDropdownMouseLeave: not hovering over dropdown");
};

// Watcher to monitor hover states
watch([isHoveringNav, isHoveringDropdown], ([hoverNav, hoverDropdown]) => {
  console.log(`Watcher: hoverNav=${hoverNav}, hoverDropdown=${hoverDropdown}`);
  if (!hoverNav && !hoverDropdown) {
    // If not hovering over nav or dropdown, set a timeout to hide the dropdown
    hideTimeout.value = setTimeout(() => {
      console.log("Timeout: hiding dropdown");
      activeMenu.value = null;
      hideTimeout.value = null;
    }, 300); // Adjust delay as needed
  } else {
    // If hovering over nav or dropdown, clear the hide timeout
    if (hideTimeout.value) {
      clearTimeout(hideTimeout.value);
      hideTimeout.value = null;
      console.log("Watcher: cleared hide timeout");
    }
  }
});

// Watcher to reset activeMenu on route changes
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (activeMenu.value) {
      console.log(
        `Route changed from ${oldPath} to ${newPath}. Resetting activeMenu.`
      );
      activeMenu.value = null;
    }
  }
);

// Lifecycle hook to reset activeMenu when component is activated (for <keep-alive>)
onActivated(() => {
  if (activeMenu.value) {
    console.log("Component activated. Resetting activeMenu.");
    activeMenu.value = null;
  }
});

// Function to handle scroll events
const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Prevent hiding nav if hovering over nav or dropdown
  if (isHoveringNav.value || isHoveringDropdown.value) {
    hideNav.value = false;
    return;
  }

  if (currentScrollY > lastScrollY) {
    hideNav.value = true;
  } else {
    hideNav.value = false;
  }

  if (currentScrollY > 50) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }

  scrollTopLessThan10.value = currentScrollY < 10;

  lastScrollY = currentScrollY;
};

// Function to update nav height (useful for responsive designs)
const updateNavHeight = () => {
  if (navRef.value) {
    navHeight.value = navRef.value.offsetHeight;
    console.log(`Updated navHeight: ${navHeight.value}`);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  updateNavHeight();
  window.addEventListener("resize", updateNavHeight); // Update on window resize

  // Reset activeMenu on mount to ensure dropdowns are closed
  activeMenu.value = null;
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateNavHeight);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Chango&family=Exo+2&family=Lilita+One&family=Oxygen:wght@300;400;700&display=swap");

.chango-regular {
  font-family: "Chango", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.lilita-one-regular {
  font-family: "Lilita One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.exo-2-myfont {
  font-family: "Exo 2", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.oxygen-light {
  font-family: "Oxygen", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.oxygen-regular {
  font-family: "Oxygen", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.oxygen-bold {
  font-family: "Oxygen", sans-serif;
  font-weight: 700;
  font-style: normal;
}

/* Slide-down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
