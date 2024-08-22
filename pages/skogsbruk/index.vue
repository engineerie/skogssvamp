<template>
  <div class="hidden">
    <NuxtImg
      v-for="imagePath in allImagePaths"
      :key="imagePath"
      :src="imagePath"
      width="1200"
      format="webp"
      quality="70"
      alt="Preload Image"
    />
  </div>
  <div class="grid grid-cols-4 gap-5 mb-8">
    <div class="flex justify-between col-span-3 px-12">
      <div
        class="flex flex-col items-center hover:cursor-pointer group"
        @click="selectedFrameworkIndex = 0"
      >
        <BaseIconBox
          size="lg"
          rounded="none"
          mask="hexed"
          :class="{
            ' -translate-y-1 bg-violet-400 dark:bg-violet-400':
              selectedFrameworkIndex === 0,
          }"
          class="relative mx-auto flex items-center justify-center size-16 scale-90 bg-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-violet-400 dark:bg-neutral-500/20 dark:group-hover:bg-violet-400"
        >
          <BaseIconBox
            size="lg"
            rounded="none"
            mask="hexed"
            class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
          >
            <Icon
              name="material-symbols:resize"
              class="icon size-7 text-violet-400"
            />
          </BaseIconBox>
        </BaseIconBox>
        <BaseHeading
          size="md"
          weight="medium"
          lead="tight"
          class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
          :class="{
            ' text-muted-600 dark:text-muted-100': selectedFrameworkIndex === 0,
          }"
        >
          Trakthygge
        </BaseHeading>
      </div>
      <div
        class="flex flex-col items-center group hover:cursor-pointer"
        @click="selectedFrameworkIndex = 3"
      >
        <BaseIconBox
          size="lg"
          rounded="none"
          mask="hexed"
          class="relative mx-auto flex items-center justify-center size-16 scale-90 bg-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-sky-400 dark:bg-neutral-500/20 dark:group-hover:bg-sky-400"
          :class="{
            '  bg-sky-400 dark:bg-sky-400 -translate-y-1':
              selectedFrameworkIndex === 3,
          }"
        >
          <BaseIconBox
            size="lg"
            rounded="none"
            mask="hexed"
            class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
          >
            <Icon name="pixelarticons:chess" class="icon size-6 text-sky-400" />
          </BaseIconBox>
        </BaseIconBox>
        <BaseHeading
          size="md"
          weight="medium"
          lead="tight"
          class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
          :class="{
            ' text-muted-600 dark:text-muted-100': selectedFrameworkIndex === 3,
          }"
        >
          Luckhuggning
        </BaseHeading>
      </div>

      <div
        class="flex flex-col items-center group hover:cursor-pointer"
        @click="selectedFrameworkIndex = 4"
      >
        <BaseIconBox
          size="lg"
          rounded="none"
          mask="hexed"
          :class="{
            ' -translate-y-1 bg-orange-400 dark:bg-orange-400':
              selectedFrameworkIndex === 4,
          }"
          class="relative mx-auto flex items-center justify-center size-16 scale-90 bg-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-orange-400 dark:bg-neutral-500/20 dark:group-hover:bg-orange-400"
        >
          <BaseIconBox
            size="lg"
            rounded="none"
            mask="hexed"
            class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
          >
            <Icon
              name="catppuccin:redwood"
              class="icon size-6 text-orange-400"
            />
          </BaseIconBox>
        </BaseIconBox>
        <BaseHeading
          size="md"
          weight="medium"
          lead="tight"
          class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
          :class="{
            ' text-muted-600 dark:text-muted-100': selectedFrameworkIndex === 4,
          }"
        >
          Skärmträd
        </BaseHeading>
      </div>
      <div
        class="flex flex-col items-center group hover:cursor-pointer"
        @click="selectedFrameworkIndex = 2"
      >
        <BaseIconBox
          size="lg"
          rounded="none"
          mask="hexed"
          :class="{
            ' -translate-y-1 bg-teal-400 dark:bg-teal-400':
              selectedFrameworkIndex === 2,
          }"
          class="relative mx-auto flex items-center justify-center size-16 scale-90 bg-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-teal-400 dark:bg-neutral-500/20 dark:group-hover:bg-teal-400"
        >
          <BaseIconBox
            size="lg"
            rounded="none"
            mask="hexed"
            class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
          >
            <Icon
              name="tabler:christmas-tree-off"
              class="icon size-6 text-teal-400"
            />
          </BaseIconBox>
        </BaseIconBox>
        <BaseHeading
          size="md"
          weight="medium"
          lead="tight"
          class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
          :class="{
            ' text-muted-600 dark:text-muted-100': selectedFrameworkIndex === 2,
          }"
        >
          Blädning
        </BaseHeading>
      </div>
      <div
        class="flex flex-col items-center group hover:cursor-pointer"
        @click="selectedFrameworkIndex = 1"
      >
        <BaseIconBox
          size="lg"
          rounded="none"
          mask="hexed"
          class="relative mx-auto flex items-center justify-center size-16 scale-90 bg-neutral-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-green-400 dark:bg-neutral-500/20 dark:group-hover:bg-green-400"
          :class="{
            ' -translate-y-1 bg-primary-400 dark:bg-primary-400 ':
              selectedFrameworkIndex === 1,
          }"
        >
          <BaseIconBox
            size="lg"
            rounded="none"
            mask="hexed"
            class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
          >
            <Icon
              name="pepicons-pop:tree-circle"
              class="icon size-6 text-green-400"
            />
          </BaseIconBox>
        </BaseIconBox>
        <BaseHeading
          size="md"
          weight="medium"
          lead="tight"
          class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
          :class="{
            ' text-muted-600 dark:text-muted-100': selectedFrameworkIndex === 1,
          }"
        >
          Naturskydd
        </BaseHeading>
      </div>
    </div>
    <div class="col-span-1 items-end flex relative">
      <transition name="fade" mode="out-in">
        <BaseHeading size="4xl" weight="light" :key="currentFramework">
          {{ currentFramework.label }}
        </BaseHeading>
      </transition>
      <transition name="fade" mode="out-in">
        <BaseHeading
          size="xl"
          weight="light"
          class="absolute -bottom-6"
          :key="currentStartskog"
        >
          {{ currentStartskog.label }}
        </BaseHeading>
      </transition>
    </div>
  </div>

  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-3">
      <div class="zoomable-image relative">
        <div class="absolute top-4 left-4">
          <BaseButtonGroup>
            <BaseButton
              @click="selectedStartskogIndex = 0"
              color="default"
              size="sm"
              shape="full"
            >
              <Icon
                name="fluent-emoji-high-contrast:owl"
                class="-ms-1 siz-5"
                :class="{
                  ' text-primary-500': selectedStartskogIndex === 0,
                }"
              />
              <span
                :class="{
                  ' text-primary-500': selectedStartskogIndex === 0,
                }"
                >Naturskog</span
              >
            </BaseButton>

            <BaseButton
              @click="selectedStartskogIndex = 1"
              color="default"
              size="sm"
              shape="full"
            >
              <Icon
                :class="{
                  ' text-primary-500': selectedStartskogIndex === 1,
                }"
                name="healthicons:plantation-worker-alt"
                class="-ms-1 size-5"
              />
              <span
                :class="{
                  ' text-primary-500': selectedStartskogIndex === 1,
                }"
                >Produktionsskog</span
              >
            </BaseButton>
          </BaseButtonGroup>
        </div>
        <div class="flex gap-2 absolute top-4 right-4">
          <BaseButtonIcon shape="full" size="sm" @click="showTree = !showTree">
            <Icon
              name="lucide:trees"
              class="size-5"
              :class="{ ' text-primary-500': showTree }"
            />
          </BaseButtonIcon>

          <BaseButtonIcon
            shape="full"
            size="sm"
            @click="showFungi = !showFungi"
          >
            <Icon
              name="fluent:shape-organic-24-filled"
              class="size-5"
              :class="{ ' text-primary-500': showFungi }"
            />
          </BaseButtonIcon>
        </div>

        <NuxtImg
          width="1200"
          :src="currentImagePath"
          class="z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
          format="webp"
          quality="70"
        />
        <div class="absolute bottom-0 w-full p-5">
          <URange
            :step="25"
            v-model="time"
            size="sm"
            :ui="{
              track: {
                background:
                  '[&::-webkit-slider-runnable-track]:bg-gray-200/40 [&::-moz-range-track]:bg-gray-200/40 [&::-webkit-slider-runnable-track]:dark:bg-gray-700/40 [&::-moz-range-track]:dark:bg-gray-700/40',
              },
            }"
          />
        </div>
      </div>
    </div>
    <div class="relative flex flex-col h-full">
      <div
        class="relative p-3 h-full backdrop-blur-3xl rounded-xl text-neutral-500 bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200 flex flex-col justify-between"
      >
        Övergripande information om valt skogsbrukssätts påverkan på marksvampar
      </div>

      <transition name="fade" mode="out-in">
        <BaseHeading size="xl" weight="light" :key="timeLabel" class="mt-2">
          {{ timeLabel }}
        </BaseHeading>
      </transition>

      <div
        class="relative p-3 h-full backdrop-blur-3xl rounded-xl text-neutral-500 bg-neutral-50 dark:bg-neutral-900 dark:bg-opacity-60 border dark:border-neutral-800 border-stone-200 flex flex-col justify-between"
      >
        Tidsspecifik information, förklara vad som händer i just den bilden som
        visas
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useTitleStore } from "~/stores/titleStore";

// Reactive references for state management
const time = ref(25);
const showTree = ref(true); // State for tree visibility switch
const showFungi = ref(true); // State for fungi visibility switch
const selectedFrameworkIndex = ref(0); // Index of selected framework
const selectedStartskogIndex = ref(0); // Reactive state for selected startskog

const selectedTimeIndex = ref(0); // Index of selected time from times array

const frameworks = [
  {
    id: 1,
    label: "Trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
  },
  {
    id: 4,
    label: "Naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
  },

  {
    id: 2,
    label: "Blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
  },
  {
    id: 5,
    label: "Luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
  },
  {
    id: 3,
    label: "Skärmträd",
    text: "Fröträd lämnas",
    icon: "simple-icons:redwoodjs",
  },
];

const timesLabels = [
  "Innan avverkning",
  "Efter avverkning",
  "20 år efter avverkning",
  "50 år efter avverkning",
  "80 år efter avverkning",
];

const times = ["före", "efter", "20", "50", "80"];

const startskog = [
  {
    label: "Naturskog",
    value: "naturskog",
    icon: "i-heroicons-information-circle",
  },
  {
    label: "Produktionsskog",
    value: "produktionsskog_",
    icon: "i-heroicons-arrow-down-tray",
  },
];

const currentFramework = computed(
  () => frameworks[selectedFrameworkIndex.value]
);
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value]
); // Use value for filename

const currentTime = computed(() => times[selectedTimeIndex.value]);

// Map slider values to time labels for filenames
function mapTimeToLabel(value) {
  const labels = [0, 25, 50, 75, 100]; // Slider values
  const index = labels.indexOf(value);
  return times[index] || times[0]; // Default to 'före' if not found
}

// Current image path computed with mapped time label
const currentImagePath = computed(() => {
  const framework = currentFramework.value.label.toLowerCase(); // Get the label of the selected framework and convert to lowercase
  const timeLabel = mapTimeToLabel(time.value); // Map the current time to the appropriate label
  const treeVisibility = showTree.value ? "visa" : "dölj"; // Determine tree visibility
  const fungiVisibility = showFungi.value ? "visa" : "dölj"; // Determine fungi visibility
  const startskogValue = currentStartskog.value.value; // Access the value property of the selected startskog

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});
// Computed property to convert numeric time value to index
const timeIndex = computed({
  get: () => time.value / 25,
  set: (index) => {
    time.value = index * 25; // Ensure this triggers updates to both URange and USelectMenu
  },
});

const timeLabel = computed(() => mapTimeToLabel(time.value));

// Sync timeIndex with a human-readable format for USelectMenu
const time_value = computed({
  get: () => times[timeIndex.value],
  set: (val) => {
    const index = times.indexOf(val);
    if (index !== -1) timeIndex.value = index; // Update the index which updates time
  },
});
// Setup the title store
// const titleStore = useTitleStore();
// onMounted(() => titleStore.setTitle("Skogsbruk"));

// Compute all possible image paths
const allImagePaths = computed(() => {
  const paths = [];

  frameworks.forEach(({ label }) => {
    times.forEach((timeLabel) => {
      [true, false].forEach((showTree) => {
        [true, false].forEach((showFungi) => {
          startskog.forEach(({ value: startskogValue }) => {
            const framework = label.toLowerCase();
            const treeVisibility = showTree ? "visa" : "dölj";
            const fungiVisibility = showFungi ? "visa" : "dölj";
            const path = `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
            paths.push(path);
          });
        });
      });
    });
  });

  return paths;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
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
