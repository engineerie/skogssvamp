<template>
  <div>
    <EnvironmentTitle class="z-40" />

    <!-- Modal -->
    <UModal v-model="isModalOpen" v-if="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="flex items-end">
              <Icon
                name="material-symbols:info-rounded"
                class="h-9 w-9 text-green-500 mr-4"
              />
              <BaseHeading
                size="2xl"
                weight="thin"
                class="text-neutral-800 dark:text-neutral-200"
                >DNA och fruktkroppsobservationer</BaseHeading
              >
            </div>
            <BaseButtonIcon
              shape="full"
              size="sm"
              @click="isModalOpen = false"
              class=""
            >
              <Icon name="material-symbols:close" class="size-4" />
            </BaseButtonIcon>
          </div>
        </template>
        <UCard class="mb-4 relative">
          <BaseIconBox
            size="md"
            rounded="none"
            variant="pastel"
            color="muted"
            mask="blob"
            class="absolute right-2 top-2"
          >
            <Icon name="solar:dna-bold-duotone" class="size-6" />
          </BaseIconBox>
          <div class="flex items-end">
            <div
              class="dark:opacity-90 w-9 h-9 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
            >
              <Icon name="game-icons:plant-roots" class="h-10 w-10" />
            </div>
            <BaseHeading
              size="2xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-200"
              >Mykorrhizasvampar</BaseHeading
            >
          </div>
          <BaseProse class="ml-2 my-4">
            Denna del visar vilka mykorrhizasvampar som finns i svensk
            skogsmark, baserat på DNA-analyser av svampmycel från jordprover.
            Resultaten är baserade på prover från 2500 skogar som samlades in
            mellan 2015 och 2022.
          </BaseProse>
        </UCard>

        <UCard class="mb-4 relative">
          <BaseIconBox
            size="md"
            rounded="none"
            variant="pastel"
            color="muted"
            mask="blob"
            class="absolute right-2 top-2"
          >
            <Icon name="hugeicons:mushroom" class="size-6" />
          </BaseIconBox>
          <div class="flex items-end">
            <div
              class="dark:opacity-90 w-9 h-9 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
            >
              <Icon name="icon-park-solid:knife-fork" class="h-10 w-10" />
            </div>
            <BaseHeading
              size="2xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-300 mr-4"
              >Matsvampar</BaseHeading
            >
          </div>
          <BaseProse class="ml-2 my-4">
            Denna del visar ätbara svampar som kan förekomma i miljön, baserat
            på observationer av fruktkroppar som rapporterats till
            Artdatabanken. Informationen har sammanställts för hand av
            sakkunniga vid SLU och kompletterar DNA-undersökningen som missar
            många arter.
          </BaseProse>
        </UCard>
        <UCard class="relative">
          <BaseIconBox
            size="md"
            rounded="none"
            variant="pastel"
            color="muted"
            mask="blob"
            class="absolute right-2 top-2"
          >
            <Icon name="hugeicons:mushroom" class="size-6" />
          </BaseIconBox>
          <div class="flex items-end">
            <div
              class="dark:opacity-90 w-9 h-9 ml-2 mr-3 rounded-lg text-teal-500 flex justify-center items-center"
            >
              <Icon
                name="material-symbols:award-star-outline"
                class="h-10 w-10"
              />
            </div>
            <BaseHeading
              size="2xl"
              weight="medium"
              class="text-neutral-800 dark:text-neutral-300 mr-4"
              >Naturvårdsarter</BaseHeading
            >
          </div>
          <BaseProse class="ml-2 my-4">
            Denna del visar signalarter och rödlistade arter som kan förekomma i
            miljön, baserat på observationer av fruktkroppar. Informationen har
            sammanställts för hand av sakkunniga vid SLU och kompletterar
            DNA-undersökningen som missar ovanliga arter.
          </BaseProse>
        </UCard>
        <template #footer>
          <BaseProse class="text-neutral-500">
            Se
            <NuxtLink to="/guide" class="underline" @click="isModalOpen = false"
              >dokumentationen</NuxtLink
            >
            för mer information.
          </BaseProse>
        </template>
      </UCard>
    </UModal>

    <!-- Normal view and fullscreen components -->
    <div class="">
      <transition name="fade" mode="out-in">
        <component
          :is="activeComponent"
          :isNormalView="
            activeFullScreenComponent &&
            activeFullScreenComponent.value === null
          "
          @close="handleCloseFullScreen"
          @enlarge="handleFullScreen"
          key="activeComponent"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTitleStore } from "~/stores/titleStore";
import FullScreenEdna from "./FullScreenEdna.vue";
import FullScreenEdible from "./FullScreenEdible.vue";
import FullScreenRedlisted from "./FullScreenRedlisted.vue";
import NormalView from "./NormalView.vue"; // Component for the normal view

const route = useRoute();
const titleStore = useTitleStore();
const { geography, forestType, standAge, vegetationType } = route.params;

const activeFullScreenComponent = ref(null);
const isModalOpen = ref(false);

// Computed to select the active component based on fullscreen state
const activeComponent = computed(() => {
  switch (activeFullScreenComponent.value) {
    case "FullScreenEdna":
      return FullScreenEdna;
    case "FullScreenEdible":
      return FullScreenEdible;
    case "FullScreenRedlisted":
      return FullScreenRedlisted;
    default:
      return NormalView;
  }
});

// Functions to manage fullscreen and modal states
const handleFullScreen = (componentName) => {
  activeFullScreenComponent.value = componentName;
};

const handleCloseFullScreen = () => {
  activeFullScreenComponent.value = null;
};

onMounted(() => {
  // Open the modal every time the page is loaded
  if (route.path.startsWith("/svampdata/dashboard/")) {
    isModalOpen.value = true;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.5s;
  transform-origin: center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
