<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- Container for the text and initial animation -->
    <transition name="fade">
      <div
        v-show="showTextCenter1"
        class="absolute inset-0 flex flex-col items-center justify-center z-50"
      >
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-center md:text-5xl xl:text-4xl dark:text-white"
        >
          Se Svampen i din Skog
        </h1>
        <p
          class="font-light text-gray-500 text-center md:text-lg lg:text-xl dark:text-gray-400"
        >
          En webbapplikation för skogsägare och svampintresserade.
        </p>
      </div>
    </transition>

    <!-- Text fades in to top-left and stays -->
    <div v-if="showTextTopLeft">
      <topNav />
    </div>

    <!-- The main content with sliding divs -->
    <transition name="slide">
      <div
        v-if="showContent"
        class="flex h-screen gap-3 overflow-hidden pt-0 p-6"
      >
        <!-- Left div -->
        <div
          :class="[
            'relative transition-all duration-1500 ease-in-out bg-primary-300 bg-opacity-70 dark:bg-opacity-50 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden p-24',
            leftFlex,
          ]"
        >
          <div class="absolute top-0 left-0 w-full h-full z-10">
            <div
              class="absolute bg-green-300 dark:bg-green-700 rounded-full w-96 h-96 top-72 left-20 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-green-500 dark:bg-green-500 rounded-full w-2/3 h-96 -top-10 left-20 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-violet-400 dark:bg-violet-800 rounded-full w-1/3 h-96 -top-10 right-20 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-green-400 dark:bg-green-800 rounded-full w-64 h-64 -top-32 left-0 blur-3xl dark:opacity-20 opacity-10"
            ></div>
            <div
              class="absolute bg-green-300 dark:bg-green-500 rounded-full w-72 h-72 top-20 left-1/2 blur-3xl dark:opacity-0 opacity-0"
            ></div>
            <div
              class="absolute bg-green-400 dark:bg-green-500 rounded-full w-2/3 h-96 -top-44 right-0 blur-3xl dark:opacity-10 opacity-0"
            ></div>
            <div
              class="absolute bg-rose-200 dark:bg-rose-200 rounded-full w-52 h-52 -top-20 -right-10 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-green-500 dark:bg-green-800 rounded-full w-48 h-48 top-20 left-40 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-violet-500 dark:bg-violet-900 rounded-full w-48 h-96 top-30 left-72 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-green-300 dark:bg-green-800 rounded-full w-2/3 h-96 top-40 -right-20 blur-3xl dark:opacity-20 opacity-20"
            ></div>
            <div
              class="absolute bg-green-200 dark:bg-green-500 rounded-full w-56 h-56 -bottom-10 right-40 blur-3xl dark:opacity-15 opacity-15"
            ></div>
          </div>
          <NuxtImg
            v-if="!isRightExpanded"
            src="/images/SeSvampenIDinSkog.png"
            class="rounded-lg z-50 absolute w-full -bottom-40 -right-10"
          />
          <BaseButtonIcon
            @click="expandLeft"
            color="default"
            flavor="solid"
            size="md"
            shape="full"
            class="absolute bottom-2 right-2 z-50"
          >
            <Icon name="heroicons:plus" class="h-5 w-5" />
          </BaseButtonIcon>
        </div>

        <!-- Right div -->
        <div
          :class="[
            'relative transition-all duration-1500 ease-in-out bg-violet-300 bg-opacity-70 dark:bg-opacity-50 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden p-24',
            rightFlex,
          ]"
        >
          <div class="absolute top-0 left-0 w-full h-full z-10">
            <div
              class="absolute bg-green-300 dark:bg-green-700 rounded-full w-96 h-96 top-72 left-20 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-green-500 dark:bg-green-500 rounded-full w-2/3 h-96 -top-10 left-20 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-violet-400 dark:bg-violet-800 rounded-full w-1/3 h-96 -top-10 right-20 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-green-400 dark:bg-green-800 rounded-full w-64 h-64 -top-32 left-0 blur-3xl dark:opacity-20 opacity-10"
            ></div>
            <div
              class="absolute bg-green-300 dark:bg-green-500 rounded-full w-72 h-72 top-20 left-1/2 blur-3xl dark:opacity-0 opacity-0"
            ></div>
            <div
              class="absolute bg-green-400 dark:bg-green-500 rounded-full w-2/3 h-96 -top-44 right-0 blur-3xl dark:opacity-10 opacity-0"
            ></div>
            <div
              class="absolute bg-rose-200 dark:bg-rose-200 rounded-full w-52 h-52 -top-20 -right-10 blur-3xl dark:opacity-10 opacity-20"
            ></div>
            <div
              class="absolute bg-green-500 dark:bg-green-800 rounded-full w-48 h-48 top-20 left-40 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-violet-500 dark:bg-violet-900 rounded-full w-48 h-96 top-30 left-72 blur-3xl dark:opacity-10 opacity-10"
            ></div>
            <div
              class="absolute bg-green-300 dark:bg-green-800 rounded-full w-2/3 h-96 top-40 -right-20 blur-3xl dark:opacity-20 opacity-20"
            ></div>
            <div
              class="absolute bg-green-200 dark:bg-green-500 rounded-full w-56 h-56 -bottom-10 right-40 blur-3xl dark:opacity-15 opacity-15"
            ></div>
          </div>
          <NuxtImg
            v-if="!isLeftExpanded"
            src="/images/Skogsbruk.png"
            class="object-center rounded-lg z-50 absolute h-96"
          />
          <!-- <div class="absolute top-4 left-4 flex z-50">
            <BaseIconBox
              size="sm"
              shape="full"
              color="none"
              class="bg-primary-500 shadow-primary-500/50 text-white shadow-lg"
            >
              <Icon name="jam:tree" class="size-6" />
            </BaseIconBox>
          </div> -->
          <!-- <NuxtImg
            src="/images/image005.png"
            class="h-full w-full object-cover opacity-100 transition-opacity duration-1000 absolute group-hover:opacity-0 z-20"
          />
          <NuxtImg
            src="/images/Skogsbruk.png"
            class="h-full w-full object-cover"
          /> -->
          <BaseButtonIcon
            @click="expandRight"
            color="default"
            flavor="solid"
            size="md"
            shape="full"
            class="absolute bottom-2 right-2 z-30"
          >
            <Icon name="heroicons:plus" class="h-5 w-5" />
          </BaseButtonIcon>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const showTextCenter1 = ref(true);
const showTextCenter2 = ref(false);
const showTextCenter3 = ref(false);
const showTextTopLeft = ref(false);
const showContent = ref(false);

const leftFlex = ref("translate-x-[-100%] opacity-0"); // Start offscreen
const rightFlex = ref("translate-x-[100%] opacity-0"); // Start offscreen

// A computed property to determine if the right div is expanded
const isRightExpanded = computed(() => rightFlex.value.includes("w-4/5"));
const isLeftExpanded = computed(() => leftFlex.value.includes("w-4/5"));

onMounted(() => {
  setTimeout(() => {
    showTextCenter1.value = false;
    setTimeout(() => {
      showTextCenter2.value = true;
      setTimeout(() => {
        showTextCenter2.value = false;
        setTimeout(() => {
          showTextCenter3.value = true;
          setTimeout(() => {
            showTextCenter3.value = false;
            setTimeout(() => {
              showTextTopLeft.value = true;
              showContent.value = true;
              setTimeout(() => {
                leftFlex.value = "translate-x-0 opacity-100 flex-grow w-1/2";
                rightFlex.value = "translate-x-0 opacity-100 flex-grow w-1/2";
              }, 500); // Trigger the sliding divs after slight delay
            }, 1000); // Delay before top-left text and divs
          }, 500); // Delay for third text
        }, 0); // Delay for second text
      }, 0); // Delay for first text
    }, 500); // 0.5 seconds delay between texts
  }, 2000); // 2 seconds delay for the first text to stay in the center
});

function expandLeft() {
  leftFlex.value = "translate-x-0 opacity-100 flex-grow w-4/5 duration-2000";
  rightFlex.value = "translate-x-0 opacity-100 flex-grow w-1/5 duration-2000";
}

function expandRight() {
  leftFlex.value = "translate-x-0 opacity-100 flex-grow w-1/5 duration-2000";
  rightFlex.value = "translate-x-0 opacity-100 flex-grow w-4/5 duration-2000";
}
</script>

<style scoped>
/* Fade in and out animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Slide in divs from the sides */
.slide-enter-active,
.slide-leave-active {
  transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(0);
}

/* Slow down the expand transition */
.duration-1500 {
  transition-duration: 1.5s;
}
.duration-2000 {
  transition-duration: 1s;
}
</style>
