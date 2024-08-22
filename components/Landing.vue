<template>
  <section class="py-32 z-10">
    <div class="container mx-auto px-6 text-center">
      <div class="container mx-auto px-6">
        <topNav />
      </div>

      <!-- Hero Text -->
      <div class="mb-28">
        <BaseButton
          to="https://www.slu.se/ew-nyheter/2023/3/se-svampen-i-din-skog/"
          target="_blank"
          color="primary"
          flavor="pastel"
          size="sm"
          shape="full"
          class="border-[0.5px] border-green-500 inline-flex mb-5"
        >
          <span>Läs artikel på slu.se</span>
          <Icon name="lucide:arrow-up-right" class="me-1 h-4 w-4" />
        </BaseButton>
        <BaseHeading
          size="7xl"
          lead="tight"
          class="text-gray-800 dark:text-white"
        >
          Se Svampen i<br />
          <transition name="slide-up" mode="out-in">
            <span :key="currentSkog" class="inline-block">{{
              currentSkog
            }}</span>
          </transition>
        </BaseHeading>
        <p class="mt-4 text-xl text-neutral-500 dark:text-gray-300">
          Utforska mångfalden av mykorrhizasvampar i svenska skogar <br />och se
          hur de reagerar på olika skogsbruksåtgärder.
        </p>
        <NuxtLink
          @click="openSidebar"
          to="/svampdata"
          class="inline-flex items-center justify-center mt-12"
        >
          <div
            class="rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50"
          >
            <Icon name="mingcute:mushroom-line" class="-ms-1 h-6 w-6 mr-3" />
            <span>Svamparter</span>
          </div>
        </NuxtLink>
        <NuxtLink
          @click="openSidebar"
          to="/skogsbruk"
          class="inline-flex items-center justify-center"
        >
          <div
            class="rounded-full text-sm dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50"
          >
            <Icon
              name="material-symbols:nature-people-outline-rounded"
              class="-ms-1 h-6 w-6 mr-3"
            />
            <span>Skogsbruk</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Hero Image -->
      <div class="mt-4 z-10">
        <img
          src="/images/SeSvampenIDinSkog.png"
          alt="App Screenshot"
          class="mx-auto rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const skogList = [
  "din Skog",
  "Granskogen",
  "Blåbärsskogen",
  "Gammelskogen",
  "Tallskogen",
  "Lövskogen",
  "Lingonskogen",
  "Ungskogen",
  "Bokskogen",
];

const currentSkog = ref(skogList[0]);
let currentIndex = 0;

const cycleSkog = () => {
  currentIndex = (currentIndex + 1) % skogList.length;
  currentSkog.value = skogList[currentIndex];
};

onMounted(() => {
  setInterval(cycleSkog, 6000); // Change every 2 seconds
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
