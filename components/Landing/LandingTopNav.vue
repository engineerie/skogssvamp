<template>
  <div>
    <!-- <BaseMessage type="danger" icon class="fixed top-4 right-4 z-[999]">
      <span class="text-red-500">
        <b>Testversion:</b> information kan vara ofullständig eller felaktig
      </span>
    </BaseMessage> -->
    <!-- Navigation Bar -->
    <div
      ref="navRef"
      :class="[
        'fixed top-0 left-0 right-0 py-3 px-6 transition-all duration-300 z-50',
        isSticky ? 'fixed' : 'absolute',
        hideNav ? '-translate-y-24 ' : 'translate-y-0',
        activeMenu ? 'max-h-screen' : 'max-h-16', // Adjust max-h based on navbar height
      ]"
    >
      <!-- Inner Container for Content -->
      <div
        :class="[
          scrollTopLessThan10
            ? 'bg-neutral-100 dark:bg-opacity-0 backdrop-blur-none dark:backdrop-blur-none'
            : 'bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-80 backdrop-blur-xl dark:backdrop-blur-xl',
        ]"
        class="container mx-auto max-w-screen-xl px-2 py-4 flex flex-col items-center rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300"
        @mouseenter="handleNavMouseEnter"
        @mouseleave="handleNavMouseLeave"
      >
        <!-- Top Row: Logo, Navigation Links, Theme Switch -->
        <div class="flex items-center w-full justify-between">
          <!-- Left Side: Logo -->
          <div class="flex items-center">
            <!-- <img
              src="/images/LogoSmile2.svg"
              alt="Logo"
              class="size-6 mr-2 mt-1"
            /> -->
            <img
              src="/images/slu_logo_svart_webb.png"
              alt="Logo"
              class="size-16 mr-2 -my-3"
            />

            <BaseHeading size="xl" weight="medium">Svampskog</BaseHeading>
          </div>

          <!-- Center: Navigation Links -->
          <nav
            aria-label="Primary Navigation"
            class="flex-grow flex justify-center"
          >
            <ul role="menubar" class="flex space-x-8">
              <!-- Funktioner Menu -->
              <li role="none" class="relative">
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  :aria-expanded="activeMenu === 'funktioner'"
                  :class="[
                    'text-md font-medium text-neutral-800 focus:outline-none transition-opacity duration-300 cursor-default',
                    {
                      'opacity-50': activeMenu && activeMenu !== 'funktioner',
                    },
                  ]"
                  @mouseenter="setActiveMenu('funktioner')"
                  @mouseleave="handleNavMouseLeave"
                  @click="toggleMenu('funktioner')"
                >
                  Funktioner
                </button>
                <!-- Dropdown Content for Funktioner -->
              </li>

              <!-- Dokumentation Menu -->
              <li role="none" class="relative">
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  :aria-expanded="activeMenu === 'dokumentation'"
                  :class="[
                    'text-md font-medium text-neutral-800 focus:outline-none transition-opacity duration-300 cursor-default',
                    {
                      'opacity-50':
                        activeMenu && activeMenu !== 'dokumentation',
                    },
                  ]"
                  @mouseenter="setActiveMenu('dokumentation')"
                  @mouseleave="handleNavMouseLeave"
                  @click="toggleMenu('dokumentation')"
                >
                  Dokumentation
                </button>
                <!-- Dropdown Content for Dokumentation -->
              </li>

              <!-- Om Projektet Menu -->
              <li role="none" class="relative">
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  :aria-expanded="activeMenu === 'omProjektet'"
                  :class="[
                    'text-md font-medium text-neutral-800 focus:outline-none transition-opacity duration-300 cursor-default',
                    {
                      'opacity-50': activeMenu && activeMenu !== 'omProjektet',
                    },
                  ]"
                  @mouseenter="setActiveMenu('omProjektet')"
                  @mouseleave="handleNavMouseLeave"
                  @click="toggleMenu('omProjektet')"
                >
                  Om projektet
                </button>
                <!-- Dropdown Content for Om Projektet -->
              </li>
            </ul>
          </nav>

          <!-- Right Side: Theme Switch -->
          <div class="flex items-center w-10">
            <!-- <BaseThemeSwitch /> -->
          </div>
        </div>

        <!-- Dropdown Content Container -->
        <!-- Dropdown Content -->
        <transition name="fade-slide">
          <div v-if="activeMenu" class="w-full mt-4">
            <div
              class="container mx-auto max-w-screen-xl py-4 px-24"
              @mouseenter="handleDropdownMouseEnter"
              @mouseleave="handleDropdownMouseLeave"
            >
              <!-- Funktioner Dropdown Content -->
              <div
                v-if="activeMenu === 'funktioner'"
                class="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
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
                    class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded transition-colors"
                  >
                    <Icon
                      name="mingcute:mushroom-line"
                      class="me-2 block w-5 h-5"
                    />
                    Sveriges mykorrhizasvampar
                  </NuxtLink>

                  <NuxtLink
                    to="/skogsbruk"
                    @click="closeMenu"
                    class="flex items-center text-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded transition-colors"
                  >
                    <Icon
                      name="material-symbols-light:nature-people-outline-rounded"
                      class="me-2 block w-5 h-5"
                    />
                    Skogsskötsel
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
                    class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded transition-colors"
                  >
                    <Icon
                      name="heroicons:book-open"
                      class="me-2 block w-5 h-5"
                    />
                    Svampkunskap
                  </NuxtLink>
                </div>
                <!-- Columns 4 & 5 remain empty or can be utilized as needed -->
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
              </div>

              <!-- Dokumentation Dropdown Content -->
              <div
                v-else-if="activeMenu === 'dokumentation'"
                class="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <BaseHeading
                    weight="thin"
                    size="sm"
                    class="text-neutral-400 mb-2"
                  >
                    Dokumentation
                  </BaseHeading>
                  <NuxtLink
                    to="/guide"
                    @click="closeMenu"
                    class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded transition-colors"
                  >
                    Översikt
                  </NuxtLink>
                </div>

                <!-- Columns 4 & 5 remain empty or can be utilized as needed -->
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
              </div>

              <!-- Om Projektet Dropdown Content -->
              <div
                v-else-if="activeMenu === 'omProjektet'"
                class="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <BaseHeading
                    weight="thin"
                    size="sm"
                    class="text-neutral-400 mb-2"
                  >
                    Om projektet
                  </BaseHeading>
                  <NuxtLink
                    to="/about"
                    @click="closeMenu"
                    class="flex items-center text-lg w-fit text-neutral-700 dark:text-neutral-300 hover:text-primary-500 py-1 rounded transition-colors"
                  >
                    Syfte och kontakt
                  </NuxtLink>
                </div>

                <!-- Columns 4 & 5 remain empty or can be utilized as needed -->
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
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

// Function to handle mouse entering the nav
const handleNavMouseEnter = () => {
  isHoveringNav.value = true;
  console.log("handleNavMouseEnter: hovering over nav");
  // Clear any existing hide timeout
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

// Function to handle mouse leaving the nav
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
    }, 500); // Adjust delay as needed
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

  if (currentScrollY > 0) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }

  scrollTopLessThan10.value = currentScrollY < 0;

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

/* Dropdown transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  max-height: 500px; /* Adjust as needed */
  opacity: 1;
}
</style>
