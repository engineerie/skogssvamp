<template>
  <div class="pt-8">
    <div class="hidden">
      <NuxtImg
        v-for="imagePath in allImagePaths"
        :key="imagePath"
        :src="imagePath"
        width="2000"
        format="webp"
        alt="Preload Image"
      />
    </div>

    <div class="w-full grid grid-cols-4">
      <div
        class="col-span-3 items-center flex relative justify-between"
        v-if="!frameworksVisible"
      >
        <div class="flex gap-2 items-center mb-2">
          <Icon
            :name="currentFramework.icon"
            :class="[
              'icon size-10 transition-all duration-300',
              currentFramework.iconColor,
            ]"
          />
          <!-- Updated BaseDropdown -->
          <div>
            <BaseDropdown
              flavor="text"
              class="text-xl font-thin text-neutral-800"
              :label="currentFramework.label"
              placement="bottom-start"
            >
              <!-- Framework Items -->
              <BaseDropdownItem
                v-for="(framework, index) in frameworks"
                :key="framework.id"
                @click="selectedFrameworkIndex = index"
                :title="framework.label"
                :text="framework.text"
                rounded="sm"
              >
                <template #start>
                  <Icon
                    :name="framework.icon"
                    :class="['icon size-6 mr-1', framework.iconColor]"
                  />
                </template>
              </BaseDropdownItem>

              <!-- Divider -->
              <BaseDropdownDivider />

              <!-- Single Checkbox for Startskog -->
              <div
                class="hover:bg-muted-100 dark:hover:bg-muted-800 rounded-md transition-colors duration-300"
              >
                <BaseCheckboxHeadless
                  v-model="startskogModel"
                  value="produktionsskog"
                >
                  <BaseDropdownItem
                    to="#"
                    title="Tidigare kalavverkad"
                    text="Skogens historik"
                    rounded="sm"
                    class="pointer-events-none"
                  >
                    <template #start>
                      <BaseCheckbox
                        v-model="startskogModel"
                        value="produktionsskog"
                        shape="full"
                        color="warning"
                      />
                    </template>
                  </BaseDropdownItem>
                </BaseCheckboxHeadless>
              </div>
            </BaseDropdown>
            <p class="text-md text-gray-400">
              {{ currentStartskog.label }}
            </p>
          </div>
        </div>
        <div class="z-50">
          <template v-if="!isFrameworkCompareMode">
            <div
              v-if="isCompare"
              @click.stop="handleDisabledToggleFrameworkCompareClick"
              class="cursor-not-allowed"
            >
              <BaseButtonIcon shape="full" disabled class="pointer-events-none">
                <Icon name="material-symbols:add-2-rounded" class="w-10 h-10" />
              </BaseButtonIcon>
            </div>
            <BaseButtonIcon shape="full" v-else>
              <Icon
                name="material-symbols:add-2-rounded"
                class="w-10 h-10"
                @click="toggleFrameworkCompare"
              />
            </BaseButtonIcon>
          </template>

          <template v-else>
            <div class="flex gap-2 items-center mb-2 z-50">
              <!-- Second BaseDropdown -->
              <div>
                <BaseDropdown
                  flavor="text"
                  class="text-xl font-thin text-neutral-800"
                  :label="currentFramework2.label"
                  placement="bottom-start"
                >
                  <!-- Framework Items -->
                  <BaseDropdownItem
                    v-for="(framework, index) in frameworks"
                    :key="'framework2-' + framework.id"
                    @click="selectedFrameworkIndex2 = index"
                    :title="framework.label"
                    :text="framework.text"
                    rounded="sm"
                  >
                    <template #start>
                      <Icon
                        :name="framework.icon"
                        :class="['icon size-6 mr-1', framework.iconColor]"
                      />
                    </template>
                  </BaseDropdownItem>
                </BaseDropdown>
                <!-- You can include currentStartskog label if needed -->
              </div>
              <div class="relative">
                <BaseButtonIcon
                  shape="full"
                  size="xs"
                  @click="toggleFrameworkCompare"
                  class="absolute -top-6 -right-6"
                >
                  <Icon name="material-symbols:close" class="size-4 m-1" />
                </BaseButtonIcon>
                <Icon
                  :name="currentFramework2.icon"
                  :class="[
                    'icon size-10 transition-all duration-300',
                    currentFramework2.iconColor,
                  ]"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Icon boxes row -->

    <div class="grid grid-cols-4 gap-5">
      <div class="col-span-3">
        <div class="relative">
          <Transition name="fade">
            <div
              v-if="showCloseupOverlay && !isCloseup"
              class="absolute inset-0 pointer-events-none z-50"
            >
              <div
                class="absolute rounded-lg ring-1 ring-neutral-100"
                :style="{
                  top: '23.5%', // Adjust this value to move up or down
                  left: '32%', // Adjust this value to move left or right
                  width: '28.5%', // Adjust the size as needed
                  height: '28.5%', // Adjust the size as needed
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent background
                }"
              ></div>
            </div>
          </Transition>
          <div
            class="flex gap-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 bg-neutral-100 ring-neutral-400 ring-1 rounded-full p-1.5"
          >
            <BaseButtonIcon
              shape="full"
              size="sm"
              @click="showTree = !showTree"
            >
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

            <!-- New Compare Button -->
            <div class="relative inline-block">
              <!-- Ping effect -->
              <span
                v-if="showPingEffectCompareButton"
                class="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"
              ></span>
              <!-- Toggle Compare Button -->
              <BaseButtonIcon
                v-if="isFrameworkCompareMode"
                shape="full"
                size="sm"
                @click="toggleCompare"
                disabled
              >
                <Icon
                  name="iconamoon:compare"
                  class="size-5"
                  :class="{ ' text-primary-500': isCompare }"
                />
              </BaseButtonIcon>
              <BaseButtonIcon
                v-else
                shape="full"
                size="sm"
                @click="toggleCompare"
              >
                <Icon
                  name="iconamoon:compare"
                  class="size-5"
                  :class="{ ' text-primary-500': isCompare }"
                />
              </BaseButtonIcon>
            </div>
            <BaseButtonIcon
              shape="full"
              size="sm"
              @click="toggleCloseup"
              @mouseenter="showCloseupOverlay = true"
              @mouseleave="showCloseupOverlay = false"
            >
              <Icon
                name="heroicons:magnifying-glass-plus"
                class="size-5"
                :class="{ ' text-primary-500': isCloseup }"
              />
            </BaseButtonIcon>
          </div>

          <img-comparison-slider
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
            v-if="isCloseup && isFrameworkCompareMode"
          >
            <!-- First Image (First Framework Closeup) -->
            <div class="relative w-full" slot="first">
              <NuxtImg
                width="2000"
                :src="currentImagePathCloseup"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentFramework.label"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>
            <!-- Second Image (Second Framework Closeup) -->
            <div class="relative w-full" slot="second">
              <NuxtImg
                width="2000"
                :src="currentImagePath2Closeup"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentFramework2.label"
                color="white"
                variant="solid"
                class="absolute bottom-4 right-4"
              />
            </div>
          </img-comparison-slider>
          <img-comparison-slider
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
            v-if="isCloseup && isCompare"
          >
            <!-- First Image (Before) -->
            <div class="relative w-full" slot="first">
              <NuxtImg
                width="2000"
                :src="comparisonImagePath1Closeup"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
                format="webp"
              />
              <UBadge
                size="xs"
                label="Innan avverkning"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>
            <!-- Second Image (After) -->
            <div class="relative w-full" slot="second">
              <NuxtImg
                width="2000"
                :src="currentImagePathCloseup"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-4 right-4"
              />
            </div>
          </img-comparison-slider>

          <!-- Single Closeup Image -->
          <div
            v-else-if="isCloseup && !isFrameworkCompareMode"
            class="relative w-full"
          >
            <NuxtImg
              width="2000"
              :src="currentImagePathCloseup"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
              format="webp"
            />
            <UBadge
              size="xs"
              :label="currentTimeLabel"
              color="white"
              variant="solid"
              class="absolute bottom-4 right-4"
            />
          </div>
          <div
            v-if="!isCompare && !isFrameworkCompareMode && !isCloseup"
            class="relative w-full"
          >
            <NuxtImg
              width="2000"
              :src="currentImagePath"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
              format="webp"
            />
            <UBadge
              size="xs"
              :label="currentTimeLabel"
              color="white"
              variant="solid"
              class="absolute bottom-4 right-4"
            />

            <!-- Conditionally render the circle for Trakthygge -->
            <!-- <div
              v-if="currentFramework.label === 'Trakthygge'"
              class="absolute"
              :style="{
                top: '45%', // Adjust the top percentage as needed
                left: '25%', // Adjust the left percentage as needed
                transform: 'translate(-50%, -50%)',
              }"
            >
             
              <div
                class="circle w-6 h-6 hover:w-8 hover:h-8 transition-all bg-green-500 rounded-full cursor-pointer border-white border-2"
                @click="handleCircleClick"
              ></div>

              
              <Transition name="fade">
                <div
                  v-if="showInfoBox"
                  class="info-box absolute"
                  :style="{
                    top: '50%',
                    left: '120%', 
                    transform: 'translateY(-50%)',
                  }"
                >
                  <div
                    class="bg-white border border-gray-300 rounded-lg shadow-md w-80 overflow-hidden"
                  >
                    <NuxtImg
                      width="400"
                      src="/images/3Trees.png"
                      class="w-full border-b-[0.5px] border-neutral-300"
                      format="webp"
                    />
                    <div class="p-3">
                      <BaseHeading size="md">Grupp av hänsynsträd </BaseHeading>
                      <p class="text-sm text-gray-700">
                        Mykorrhizasvamparnas mycel lever vidare i rötterna av
                        hänsynsträdens rötter efter avverkning.
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div> -->
            <Circle
              v-for="circle in filteredCircles"
              :key="circle.id"
              :position="circle.position"
              :info="circle.info"
            />
          </div>
          <img-comparison-slider
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
            v-else-if="isCompare && !isCloseup"
          >
            <div class="relative w-full" slot="first">
              <NuxtImg
                width="2000"
                :src="comparisonImagePath1"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
                format="webp"
              />
              <UBadge
                size="xs"
                label="Innan avverkning"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>

            <div class="relative w-full" slot="second">
              <NuxtImg
                width="2000"
                :src="currentImagePath"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-4 right-4"
              />
            </div>
          </img-comparison-slider>

          <!-- Framework Comparison Mode -->
          <img-comparison-slider
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
            v-else-if="isFrameworkCompareMode && !isCloseup"
          >
            <div class="relative w-full" slot="first">
              <NuxtImg
                width="2000"
                :src="currentImagePath"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>
            <div class="relative w-full" slot="second">
              <NuxtImg
                width="2000"
                :src="currentImagePath2"
                class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
                format="webp"
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-4 right-4"
              />
            </div>
          </img-comparison-slider>
        </div>

        <!-- Slider Container -->
        <div class="w-full p-5">
          <div class="slider-container flex flex-col items-center w-full">
            <BaseProgress
              title="Default progress bar"
              size="sm"
              :value="time"
              color="primary"
            />
            <!-- Buttons -->
            <div
              class="flex justify-between items-center w-full mt-4"
              style="margin-top: 1rem"
            >
              <div
                v-for="step in sliderSteps"
                :key="step.value"
                @click="time = step.value"
                class="flex flex-col items-center cursor-pointer"
              >
                <!-- Button -->
                <BaseButtonAction
                  shape="full"
                  :class="
                    time === step.value &&
                    '!border-primary-500 !text-primary-500'
                  "
                >
                  {{ step.label }}
                </BaseButtonAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full p-4 bg-white bg-opacity-50 rounded-xl">
        <div class="flex gap-3">
          <div
            class="cursor-pointer transition-all bg-white p-4 w-full rounded-xl h-40 border-[1px] border-neutral-100 mb-2 hover:border-neutral-200 hover:border-opacity-80 hover:bg-neutral-50 hover:bg-opacity-80"
            @click="Modal1 = true"
          >
            <div class="flex items-center gap-2 mb-4">
              <Icon
                :name="currentFramework.icon"
                :class="[
                  'icon size-5 transition-all duration-300',
                  currentFramework.iconColor,
                ]"
              />
              <BaseHeading size="md" weight="thin" class="text-neutral-600">{{
                currentFramework.label
              }}</BaseHeading>
            </div>
            <BaseProse class="text-sm font-neutral-500">
              Text om valt skogsbrukssätt...
            </BaseProse>
          </div>
          <UModal v-model="Modal1">
            <BaseButtonIcon
              shape="full"
              size="xs"
              @click="Modal1 = false"
              class="absolute top-4 right-4"
            >
              <Icon name="material-symbols:close" class="size-4 m-1" />
            </BaseButtonIcon>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-4">
                <Icon
                  :name="currentFramework.icon"
                  :class="[
                    'icon size-8 transition-all duration-300',
                    currentFramework.iconColor,
                  ]"
                />
                <BaseHeading
                  size="2xl"
                  weight="thin"
                  class="text-neutral-600"
                  >{{ currentFramework.label }}</BaseHeading
                >
              </div>
              <BaseProse class="text-sm font-neutral-500">
                <b>Beskrivning skogsbrukssätt</b>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus rhoncus facilisis ornare. Donec ullamcorper fermentum
                sem rhoncus commodo. Phasellus convallis dapibus sodales. Proin
                placerat eros sed ligula dignissim ullamcorper. Vivamus faucibus
                imperdiet arcu, non ullamcorper nunc varius iaculis. Phasellus
                et lorem eu lacus scelerisque porta non elementum turpis. Sed
                bibendum interdum pretium.
                <br /><br />

                Vestibulum vestibulum in ante at gravida. Curabitur nec leo eget
                odio feugiat gravida. Suspendisse iaculis nibh mauris, at
                interdum velit tristique nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                <br />
                <br />
                <b>Skogsbrukssättetets påverkan på mykkorhizasvampar</b>
                <br />

                Duis fringilla non purus lobortis sollicitudin. Nunc pharetra
                fermentum tincidunt. Donec interdum dolor lectus, ac ultricies
                lorem lobortis quis. Mauris aliquet vel nulla vitae viverra.
                Etiam ut quam vel eros consectetur lobortis. Proin rutrum justo
                erat, vitae laoreet dui rutrum eu. Proin elementum malesuada
                volutpat. In condimentum sem risus, vitae varius massa euismod
                ut.
              </BaseProse>
            </div>
          </UModal>
          <div
            class="cursor-pointer transition-all bg-white w-full p-4 rounded-xl h-40 border-[1px] border-neutral-100 mb-2 hover:border-neutral-200 hover:border-opacity-80 hover:bg-neutral-50 hover:bg-opacity-80"
            v-if="isFrameworkCompareMode"
            @click="Modal2 = true"
          >
            <div class="flex items-center gap-2 mb-4">
              <Icon
                :name="currentFramework2.icon"
                :class="[
                  'icon size-5 transition-all duration-300',
                  currentFramework2.iconColor,
                ]"
              />
              <BaseHeading size="md" weight="thin" class="text-neutral-600">{{
                currentFramework2.label
              }}</BaseHeading>
            </div>
            <BaseProse class="text-sm font-neutral-500">
              Text om valt skogsbrukssätt...
            </BaseProse>
          </div>
          <UModal v-model="Modal2">
            <BaseButtonIcon
              shape="full"
              size="xs"
              @click="Modal2 = false"
              class="absolute top-4 right-4"
            >
              <Icon name="material-symbols:close" class="size-4 m-1" />
            </BaseButtonIcon>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-4">
                <Icon
                  :name="currentFramework2.icon"
                  :class="[
                    'icon size-8 transition-all duration-300',
                    currentFramework2.iconColor,
                  ]"
                />
                <BaseHeading
                  size="2xl"
                  weight="thin"
                  class="text-neutral-600"
                  >{{ currentFramework2.label }}</BaseHeading
                >
              </div>
              <BaseProse class="text-sm font-neutral-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus rhoncus facilisis ornare. Donec ullamcorper fermentum
                sem rhoncus commodo. Phasellus convallis dapibus sodales. Proin
                placerat eros sed ligula dignissim ullamcorper. Vivamus faucibus
                imperdiet arcu, non ullamcorper nunc varius iaculis. Phasellus
                et lorem eu lacus scelerisque porta non elementum turpis. Sed
                bibendum interdum pretium.
                <br /><br />

                Vestibulum vestibulum in ante at gravida. Curabitur nec leo eget
                odio feugiat gravida. Suspendisse iaculis nibh mauris, at
                interdum velit tristique nec. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                <br />
                <br />

                Duis fringilla non purus lobortis sollicitudin. Nunc pharetra
                fermentum tincidunt. Donec interdum dolor lectus, ac ultricies
                lorem lobortis quis. Mauris aliquet vel nulla vitae viverra.
                Etiam ut quam vel eros consectetur lobortis. Proin rutrum justo
                erat, vitae laoreet dui rutrum eu. Proin elementum malesuada
                volutpat. In condimentum sem risus, vitae varius massa euismod
                ut.
              </BaseProse>
            </div>
          </UModal>
        </div>
        <BarChartSkogsbruk
          :currentFramework="currentFramework"
          :currentFramework2="isFrameworkCompareMode ? currentFramework2 : null"
          :currentStartskog="currentStartskog"
          :timeLabel="timeLabelForDataFiltering"
          :timeLabel2="isCompare ? timeLabelForDataFiltering2 : null"
          :currentTimeLabel="currentTimeLabel"
          :isCompareMode="isCompare"
          :isFrameworkCompareMode="isFrameworkCompareMode"
        />
        <BarChartSkogsbrukRödMat
          :currentFramework="currentFramework"
          :currentFramework2="isFrameworkCompareMode ? currentFramework2 : null"
          :currentStartskog="currentStartskog"
          :timeLabel="timeLabelForDataFiltering"
          :timeLabel2="isCompare ? timeLabelForDataFiltering2 : null"
          :currentTimeLabel="currentTimeLabel"
          :isCompareMode="isCompare"
          :isFrameworkCompareMode="isFrameworkCompareMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";
import Circle from "~/components/Circle.vue";
import BarChart from "~/components/BarChartSkogsbruk.vue";

export default {
  name: "ExampleComponent",
  components: {
    Circle,
    BarChart,
    ImgComparisonSlider,
  },
};
</script>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  computed,
  watch,
} from "vue";
import { useTitleStore } from "~/stores/titleStore";
import { useOnboardingStore } from "~/stores/onboardingStore";
import circleDataJson from "public/circles.json";

// Define time2 for "Before" state when in comparison mode
const time2 = computed(() => (isCompare.value ? 3 : null)); // 3 corresponds to "Innan avverkning"

const timeLabelForDataFiltering2 = computed(() =>
  time2.value !== null ? mapTimeValueToDataAlder(time2.value) : null
);

const circleData = ref(circleDataJson);

const showPingEffectCompareButton = ref(false);

const handleDisabledToggleFrameworkCompareClick = () => {
  // Show the ping effect around the toggleCompare button
  showPingEffectCompareButton.value = true;

  // Hide the ping effect after a short delay
  setTimeout(() => {
    showPingEffectCompareButton.value = false;
  }, 500);
};

const Modal1 = ref(false);
const Modal2 = ref(false);

const onboardingStore = useOnboardingStore();

const selectedFrameworkIndex = computed({
  get() {
    return onboardingStore.selectedFramework;
  },
  set(value) {
    onboardingStore.selectedFramework = value;
  },
});

// Reactive variable to track framework comparison mode
const isFrameworkCompareMode = ref(false);

// Function to toggle framework comparison mode
const toggleFrameworkCompare = () => {
  isFrameworkCompareMode.value = !isFrameworkCompareMode.value;
};

// Reactive variable for the second framework index
const selectedFrameworkIndex2 = ref(selectedFrameworkIndex.value); // Default to the first framework

// Computed property for the second current framework
const currentFramework2 = computed(
  () => frameworks[selectedFrameworkIndex2.value]
);

const isCompare = ref(false);
const toggleCompare = () => {
  isCompare.value = !isCompare.value;
};

const isCloseup = ref(false);
const toggleCloseup = () => {
  isCloseup.value = !isCloseup.value;
};

const comparisonImagePath1 = computed(() => {
  // Image path for "before" state
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = "före"; // "Before"
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

// Computed property for the second current image path
const currentImagePath2 = computed(() => {
  const framework = currentFramework2.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImagePath2Closeup = computed(() => {
  const framework = currentFramework2.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder_nära/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const selectedStartskogIndex = computed({
  get() {
    return onboardingStore.selectedStartskog;
  },
  set(value) {
    onboardingStore.selectedStartskog = value;
  },
});

const currentImageKey = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  return `${framework}_${timeLabel}`;
});

const filteredCircles = computed(() => {
  return circleData.value.filter((circle) =>
    circle.images.includes(currentImageKey.value)
  );
});

watch(
  () => onboardingStore.selectedFramework,
  (newValue, oldValue) => {
    console.log(`Dashboard: Framework changed from ${oldValue} to ${newValue}`);
  }
);

watch(
  () => onboardingStore.selectedStartskog,
  (newValue, oldValue) => {
    console.log(`Dashboard: Startskog changed from ${oldValue} to ${newValue}`);
  }
);

// Initialize the checkbox model
const startskogModel = ref([]);

// Initialize the checkbox state based on selectedStartskogIndex
startskogModel.value =
  selectedStartskogIndex.value === 1 ? ["produktionsskog"] : [];

// Watch the checkbox model to update selectedStartskogIndex
watch(startskogModel, (newValue) => {
  selectedStartskogIndex.value = newValue.includes("produktionsskog") ? 1 : 0;
});

// Reactive references for state management
const time = ref(3);
const showTree = ref(true); // State for tree visibility switch
const showFungi = ref(true); // State for fungi visibility switch

const selectedTimeIndex = ref(0); // Index of selected time from times array

const frameworksVisible = ref(false);
const frameworks = [
  {
    id: 0,
    label: "Trakthygge", // Display label
    value: "trakthygge", // Value used for image paths
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
    iconColor: "text-violet-400",
    bgColor: "bg-violet-400",
  },
  {
    id: 1,
    label: "Ingen åtgärd", // Display label changed from "Naturskydd" to "Ingen åtgärd"
    value: "naturskydd", // Value remains "naturskydd" for consistency in image paths
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-400",
    bgColor: "bg-green-400",
  },
  {
    id: 2,
    label: "Blädning",
    value: "blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
    iconColor: "text-teal-400",
    bgColor: "bg-teal-400",
  },
  {
    id: 3,
    label: "Luckhuggning",
    value: "luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-400",
    bgColor: "bg-sky-400",
  },
  {
    id: 4,
    label: "Skärmträd",
    value: "skärmträd",
    text: "Överhållen skärm",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-400",
    bgColor: "bg-orange-400",
  },
];

function mapFrameworkLabelToDataValue(value) {
  const mapping = {
    trakthygge: "trakthygge",
    naturskydd: "inga åtgärder",
    blädning: "blädning",
    luckhuggning: "luckhuggning",
    Skärmträd: "skärmträd",
  };
  return mapping[label] || label.toLowerCase();
}

// Define the slider steps
const sliderSteps = computed(() => {
  const steps = [
    { value: 3, label: "Innan avverkning", timeLabel: "före" },
    { value: 15, label: "Efter avverkning", timeLabel: "efter" },
  ];

  // Add the 10-year step when the framework is "Skärmträd" and not in framework comparison mode
  if (
    currentFramework.value.value === "skärmträd" &&
    !isFrameworkCompareMode.value
  ) {
    steps.push({ value: 30, label: "10 år efter avverkning", timeLabel: "10" });
  }

  steps.push(
    { value: 45, label: "20 år efter avverkning", timeLabel: "20" },
    { value: 70, label: "50 år efter avverkning", timeLabel: "50" },
    { value: 99, label: "80 år efter avverkning", timeLabel: "80" }
  );

  return steps;
});

const timesLabels = [
  "Innan avverkning",
  "Efter avverkning",
  "20 år efter avverkning",
  "50 år efter avverkning",
  "80 år efter avverkning",
];

const currentTimeLabel = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  return step ? step.label : "";
});

const times = computed(() => sliderSteps.value.map((s) => s.timeLabel));
const startskog = [
  {
    label: "I äldre skog som inte kalavverkats",
    value: "naturskog",
    icon: "i-heroicons-information-circle",
  },
  {
    label: "I skog som har kalavverkats",
    value: "produktionsskog_",
    icon: "i-heroicons-arrow-down-tray",
  },
];

const toggleFrameworks = () => {
  frameworksVisible.value = !frameworksVisible.value;
};

const selectFramework = (index) => {
  selectedFrameworkIndex.value = index;
  frameworksVisible.value = false; // Hide the icon boxes after selection
};

const currentFramework = computed(
  () => frameworks[selectedFrameworkIndex.value]
);
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value]
); // Use value for filename

const currentTime = computed(() => times.value[selectedTimeIndex.value]);

// Map slider values to time labels for filenames
function mapTimeToLabel(value) {
  const step = sliderSteps.value.find((s) => s.value === value);
  return step ? step.timeLabel : times.value[0]; // Default to 'före' if not found
}

function mapTimeValueToDataAlder(value) {
  const mapping = {
    3: "innan",
    15: "efter",
    30: "10 år",
    45: "20 år",
    70: "50 år",
    99: "80 år",
  };
  return mapping[value] || "innan"; // Default to 'innan' if not found
}

const timeLabelForDataFiltering = computed(() =>
  mapTimeValueToDataAlder(time.value)
);
// Current image path computed with mapped time label
const currentImagePath = computed(() => {
  const framework = currentFramework.value.value.toLowerCase(); // Get the label of the selected framework and convert to lowercase
  const timeLabel = mapTimeToLabel(time.value); // Map the current time to the appropriate label
  const treeVisibility = showTree.value ? "visa" : "dölj"; // Determine tree visibility
  const fungiVisibility = showFungi.value ? "visa" : "dölj"; // Determine fungi visibility
  const startskogValue = currentStartskog.value.value; // Access the value property of the selected startskog

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

// Current image path computed with mapped time label
const currentImagePathCloseup = computed(() => {
  const framework = currentFramework.value.value.toLowerCase(); // Get the label of the selected framework and convert to lowercase
  const timeLabel = mapTimeToLabel(time.value); // Map the current time to the appropriate label
  const treeVisibility = showTree.value ? "visa" : "dölj"; // Determine tree visibility
  const fungiVisibility = showFungi.value ? "visa" : "dölj"; // Determine fungi visibility
  const startskogValue = currentStartskog.value.value; // Access the value property of the selected startskog

  return `/images/Skogsbruksbilder_nära/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const comparisonImagePath1Closeup = computed(() => {
  // Image path for "before" state closeup
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = "före"; // "Before"
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder_nära/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
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

const allImagePaths = computed(() => {
  const paths = [];

  frameworks.forEach(({ value }) => {
    let frameworkTimes = ["före", "efter", "20", "50", "80"];
    if (
      value === "skärmträd" &&
      !isCompare.value &&
      !isFrameworkCompareMode.value
    ) {
      frameworkTimes = ["före", "efter", "10", "20", "50", "80"];
    }
    frameworkTimes.forEach((timeLabel) => {
      [true, false].forEach((showTree) => {
        [true, false].forEach((showFungi) => {
          startskog.forEach(({ value: startskogValue }) => {
            const framework = value.toLowerCase();
            const treeVisibility = showTree ? "visa" : "dölj";
            const fungiVisibility = showFungi ? "visa" : "dölj";

            // Normal image path
            const path = `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
            paths.push(path);

            // Closeup image path
            const closeupPath = `/images/Skogsbruksbilder_nära/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
            paths.push(closeupPath);
          });
        });
      });
    });
  });

  return paths;
});

const ensureValidTimeValue = () => {
  const validValues = sliderSteps.value.map((s) => s.value);
  if (!validValues.includes(time.value)) {
    // Reset time to a default valid value, such as "Efter avverkning"
    time.value = 15;
  }
};

watch(
  [currentFramework, isCompare, isFrameworkCompareMode],
  ensureValidTimeValue
);

const showCloseupOverlay = ref(false);
</script>

<style scoped>
.slider-example-focus:focus {
  outline: none;
}

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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.fold-out-enter-active,
.fold-out-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform-origin: left;
}

.fold-out-enter-from,
.fold-out-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.fold-out-enter-to,
.fold-out-leave-from {
  transform: translateX(0px);
  opacity: 1;
}
</style>
