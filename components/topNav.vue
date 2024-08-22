<template>
  <div
    :class="[
      'top-0 left-0 right-0 py-3 px-6 transition-transform duration-300 z-50 flex items-center',
      isSticky ? 'fixed' : 'absolute',
      hideNav ? '-translate-y-full' : 'translate-y-0',
      scrollTopLessThan10
        ? 'bg-opacity-0 dark:bg-opacity-0 backdrop-blur-none dark:backdrop-blur-none'
        : 'bg-neutral-100 bg-opacity-80 dark:bg-neutral-900 dark:bg-opacity-80 backdrop-blur-xl dark:backdrop-blur-xl',
    ]"
  >
    <!-- Left side: Icon -->
    <div class="flex items-center">
      <Icon name="hugeicons:mushroom" class="size-9 text-green-500" />
    </div>

    <!-- Center: Headings -->
    <div class="flex-grow flex justify-center">
      <div class="flex gap-8">
        <BaseDropdown flavor="text" label="Funktioner" class="text-sm">
          <BaseDropdownItem
            to="/svampdata"
            title="Svamparter"
            text="Svampar i olika skogar"
            rounded="sm"
          >
            <template #start>
              <Icon name="mingcute:mushroom-line" class="me-2 block size-5" />
            </template>
          </BaseDropdownItem>
          <BaseDropdownItem
            to="/skogsbruk"
            title="Skogsbruk"
            text="Påverkan på marksvampar"
            rounded="sm"
          >
            <template #start>
              <Icon
                name="material-symbols:nature-people-outline-rounded"
                class="me-2 block size-5"
              />
            </template>
          </BaseDropdownItem>
        </BaseDropdown>

        <BaseDropdown
          flavor="text"
          label="Dokumentation"
          placement="bottom-start"
          class="text-sm"
        >
          <BaseDropdownItem
            to="#"
            title="Miljöindelningar"
            text="Hur vi definerar skogsmiljöer"
            rounded="sm"
          />

          <BaseDropdownItem
            to="#"
            title="DNA analys"
            text="Hur svampar kartläggs"
            rounded="sm"
          />

          <BaseDropdownItem
            to="#"
            title="Artrikedom"
            text="Hur miljöers artrikedom uppskattas"
            rounded="sm"
          />

          <BaseDropdownItem
            to="#"
            title="Exempel2"
            text="mer information"
            shape="lg"
          />
        </BaseDropdown>
        <BaseDropdown
          flavor="text"
          label="Om projektet"
          placement="bottom-start"
          class="text-sm"
        >
          <BaseDropdownItem
            to="#"
            title="Motivation"
            text="Syftet bakom projektet"
            rounded="sm"
          />

          <BaseDropdownItem
            to="#"
            title="Kontakt"
            text="Hör av dig"
            rounded="sm"
          />
        </BaseDropdown>
      </div>
    </div>

    <!-- Right side: Theme switch -->
    <div class="flex items-center">
      <BaseThemeSwitch />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isSticky = ref(false);
const hideNav = ref(false);
const scrollTopLessThan10 = ref(false);

let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
/* Optional additional styles */
</style>
