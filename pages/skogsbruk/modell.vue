<template>
  <div class="pt-8">
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
            <BaseButtonIcon
              shape="full"
              v-if="isCompare"
              disabled
              @click="toggleFrameworkCompare"
            >
              <Icon name="material-symbols:add-2-rounded" class="w-10 h-10" />
            </BaseButtonIcon>
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

      <!-- <div v-else class="flex gap-4 items-center">
          <div
            v-for="(framework, index) in frameworks"
            :key="framework.id"
            class="flex flex-col items-center hover:cursor-pointer group"
            @click="selectFramework(index)"
          >
            <BaseIconBox
              size="lg"
              rounded="none"
              mask="hexed"
              :class="[
                'relative mx-auto flex items-center justify-center size-16 scale-90 transition-all duration-300',
                framework.bgColor,
                {
                  '-translate-y-1': selectedFrameworkIndex === index,
                  'opacity-50': selectedFrameworkIndex !== index,
                },
              ]"
            >
              <BaseIconBox
                size="lg"
                rounded="none"
                mask="hexed"
                class="absolute inset-0 flex items-center justify-center bg-white size-16 scale-95 dark:bg-muted-800"
              >
                <Icon
                  :name="framework.icon"
                  :class="['icon size-6', framework.iconColor]"
                />
              </BaseIconBox>
            </BaseIconBox>
            <BaseHeading
              size="md"
              weight="medium"
              lead="tight"
              class="text-muted-400 transition-colors duration-300 group-hover:text-muted-600 dark:group-hover:text-muted-300"
              :class="{
                'text-muted-600 dark:text-muted-100':
                  selectedFrameworkIndex === index,
              }"
            >
              {{ framework.label }}
            </BaseHeading>
          </div>
        </div> -->
    </div>

    <!-- Icon boxes row -->

    <div class="grid grid-cols-4 gap-5">
      <div class="col-span-3 relative">
        <div class="flex gap-2 absolute top-4 right-4 z-20">
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

          <!-- New Compare Button -->
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
          <BaseButtonIcon v-else shape="full" size="sm" @click="toggleCompare">
            <Icon
              name="iconamoon:compare"
              class="size-5"
              :class="{ ' text-primary-500': isCompare }"
            />
          </BaseButtonIcon>
          <BaseButtonIcon shape="full" size="sm">
            <Icon name="material-symbols:cameraswitch-rounded" class="size-5" />
          </BaseButtonIcon>
        </div>
        <div
          v-if="!isCompare && !isFrameworkCompareMode"
          class="relative w-full"
        >
          <NuxtImg
            slot="second"
            width="1200"
            :src="currentImagePath"
            class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800"
            format="webp"
            quality="70"
          />
          <UBadge
            size="xs"
            :label="currentTimeLabel"
            color="white"
            variant="solid"
            class="absolute bottom-4 right-4"
          />

          <!-- Conditionally render the circle for Trakthygge -->
          <div
            v-if="currentFramework.label === 'Trakthygge'"
            class="absolute"
            :style="{
              top: '70%', // Adjust the top percentage as needed
              left: '30%', // Adjust the left percentage as needed
              transform: 'translate(-50%, -50%)',
            }"
          >
            <!-- The Circle -->
            <div
              class="circle w-6 h-6 hover:w-8 hover:h-8 transition-all bg-green-500 rounded-full cursor-pointer border-white border-2"
              @click="handleCircleClick"
            ></div>

            <!-- Info Box -->
            <div
              v-if="showInfoBox"
              class="info-box absolute"
              :style="{
                top: '50%', // Adjust as needed
                left: '110%', // Position the box to the right of the circle
                transform: 'translateY(-50%)',
              }"
            >
              <Transition name="fade">
                <div
                  class="bg-white border border-gray-300 rounded-lg p-3 shadow-md w-64"
                >
                  <!-- Content of the info box -->
                  <p class="text-sm text-gray-700">
                    Information om gruppstälda hänsynsträd.
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <img-comparison-slider
          class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
          v-else-if="isCompare"
        >
          <div class="relative w-full" slot="first">
            <NuxtImg
              width="1200"
              :src="comparisonImagePath1"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
              format="webp"
              quality="70"
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
              width="1200"
              :src="currentImagePath"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
              format="webp"
              quality="70"
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
          v-else-if="isFrameworkCompareMode"
        >
          <div class="relative w-full" slot="first">
            <NuxtImg
              width="1200"
              :src="currentImagePath"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
              format="webp"
              quality="70"
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
              width="1200"
              :src="currentImagePath2"
              class="w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 m-0 p-0"
              format="webp"
              quality="70"
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

        <!-- Slider Container -->
        <div class="w-full p-5">
          <div class="slider-container flex flex-col items-center w-full">
            <!-- URange Slider -->
            <!-- <URange
              :step="20"
              v-model="time"
              size="sm"
              :ui="{
                track: {
                  background:
                    '[&::-webkit-slider-runnable-track]:bg-gray-200/40 [&::-moz-range-track]:bg-gray-200/40 [&::-webkit-slider-runnable-track]:dark:bg-gray-700/40 [&::-moz-range-track]:dark:bg-gray-700/40',
                },
              }"
              class="w-full"
            /> -->
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
        <div
          class="cursor-pointer transition-all bg-white p-4 rounded-xl h-40 border-[1px] border-neutral-100 mb-2 hover:border-neutral-200 hover:border-opacity-80 hover:bg-neutral-50 hover:bg-opacity-80"
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
          <div class="p-4">
            <div class="flex items-center gap-2 mb-4">
              <Icon
                :name="currentFramework.icon"
                :class="[
                  'icon size-8 transition-all duration-300',
                  currentFramework.iconColor,
                ]"
              />
              <BaseHeading size="2xl" weight="thin" class="text-neutral-600">{{
                currentFramework.label
              }}</BaseHeading>
            </div>
            <BaseProse class="text-sm font-neutral-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              rhoncus facilisis ornare. Donec ullamcorper fermentum sem rhoncus
              commodo. Phasellus convallis dapibus sodales. Proin placerat eros
              sed ligula dignissim ullamcorper. Vivamus faucibus imperdiet arcu,
              non ullamcorper nunc varius iaculis. Phasellus et lorem eu lacus
              scelerisque porta non elementum turpis. Sed bibendum interdum
              pretium.
              <br /><br />

              Vestibulum vestibulum in ante at gravida. Curabitur nec leo eget
              odio feugiat gravida. Suspendisse iaculis nibh mauris, at interdum
              velit tristique nec. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
              <br />
              <br />

              Duis fringilla non purus lobortis sollicitudin. Nunc pharetra
              fermentum tincidunt. Donec interdum dolor lectus, ac ultricies
              lorem lobortis quis. Mauris aliquet vel nulla vitae viverra. Etiam
              ut quam vel eros consectetur lobortis. Proin rutrum justo erat,
              vitae laoreet dui rutrum eu. Proin elementum malesuada volutpat.
              In condimentum sem risus, vitae varius massa euismod ut.
            </BaseProse>
          </div>
        </UModal>
        <div
          class="cursor-pointer transition-all bg-white p-4 rounded-xl h-40 border-[1px] border-neutral-100 mb-2 hover:border-neutral-200 hover:border-opacity-80 hover:bg-neutral-50 hover:bg-opacity-80"
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
          <div class="p-4">
            <div class="flex items-center gap-2 mb-4">
              <Icon
                :name="currentFramework2.icon"
                :class="[
                  'icon size-8 transition-all duration-300',
                  currentFramework2.iconColor,
                ]"
              />
              <BaseHeading size="2xl" weight="thin" class="text-neutral-600">{{
                currentFramework2.label
              }}</BaseHeading>
            </div>
            <BaseProse class="text-sm font-neutral-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              rhoncus facilisis ornare. Donec ullamcorper fermentum sem rhoncus
              commodo. Phasellus convallis dapibus sodales. Proin placerat eros
              sed ligula dignissim ullamcorper. Vivamus faucibus imperdiet arcu,
              non ullamcorper nunc varius iaculis. Phasellus et lorem eu lacus
              scelerisque porta non elementum turpis. Sed bibendum interdum
              pretium.
              <br /><br />

              Vestibulum vestibulum in ante at gravida. Curabitur nec leo eget
              odio feugiat gravida. Suspendisse iaculis nibh mauris, at interdum
              velit tristique nec. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
              <br />
              <br />

              Duis fringilla non purus lobortis sollicitudin. Nunc pharetra
              fermentum tincidunt. Donec interdum dolor lectus, ac ultricies
              lorem lobortis quis. Mauris aliquet vel nulla vitae viverra. Etiam
              ut quam vel eros consectetur lobortis. Proin rutrum justo erat,
              vitae laoreet dui rutrum eu. Proin elementum malesuada volutpat.
              In condimentum sem risus, vitae varius massa euismod ut.
            </BaseProse>
          </div>
        </UModal>
        <div v-if="VueApexCharts" class="text-neutral-500 justify-end">
          <VueApexCharts
            :key="`${timeLabel}`"
            height="280px"
            width="100%"
            type="bar"
            :options="chartOptions"
            :series="chartSeries"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";

export default {
  name: "ExampleComponent",
  components: {
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

const showInfoBox = ref(false);

const handleCircleClick = () => {
  showInfoBox.value = !showInfoBox.value;
};

const handleOutsideClick = (event) => {
  const circleElement = document.querySelector(".circle");
  const infoBoxElement = document.querySelector(".info-box");

  if (
    showInfoBox.value &&
    !circleElement.contains(event.target) &&
    !infoBoxElement.contains(event.target)
  ) {
    showInfoBox.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

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

const comparisonImagePath1 = computed(() => {
  // Image path for "before" state
  const framework = currentFramework.value.label.toLowerCase();
  const timeLabel = "före"; // "Before"
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

// Computed property for the second current image path
const currentImagePath2 = computed(() => {
  const framework = currentFramework2.value.label.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;

  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const selectedStartskogIndex = computed({
  get() {
    return onboardingStore.selectedStartskog;
  },
  set(value) {
    onboardingStore.selectedStartskog = value;
  },
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
const VueApexCharts = shallowRef(null);

onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
  }
});

const chartSeries = computed(() => {
  const valuesMap = {
    före: {
      white: 20,
      gray: 30,
      black: 20,
      red: currentStartskog.value.value === "produktionsskog_" ? 0 : 2,
    },
    efter: { white: 1, gray: 1, black: 1, red: 0 },
    20: {
      white: 35,
      gray: 8,
      black: 1,
      red: currentStartskog.value.value === "produktionsskog_" ? 0 : 0,
    },
    50: {
      white: 30,
      gray: 10,
      black: 3,
      red: currentStartskog.value.value === "produktionsskog_" ? 0 : 0,
    },
    80: {
      white: 15,
      gray: 18,
      black: 20,
      red: currentStartskog.value.value === "produktionsskog_" ? 0 : 0,
    },
  };

  const timeValues = valuesMap[timeLabel.value] || valuesMap["före"];

  return [
    {
      name: "Series 1",
      data: [
        { x: "Skinnsvampar", y: timeValues.white, fillColor: "#e5e5e5" },
        { x: "Soppar", y: timeValues.gray, fillColor: "#737373" },
        { x: "Spindlingar", y: timeValues.black, fillColor: "#0a0a0a" },
        { x: "Rödlistade", y: timeValues.red, fillColor: "#ef4444" },
      ],
    },
  ];
});
const chartOptions = ref({
  chart: {
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Skinnsvampar", "Soppar", "Spindlingar", "Rödlistade"],
    labels: {
      show: false, // Hide labels on the x-axis
    },
  },
  yaxis: {
    min: 0, // Set the minimum value of the y-axis
    max: 40, // Set the maximum value of the y-axis
    labels: {
      show: false, // Hide labels on the y-axis
    },
  },
  grid: {
    show: false, // Hide the grid lines behind the bars
  },
  fill: {
    opacity: 1,
    colors: undefined,
  },
  legend: {
    show: true,
    markers: {
      fillColors: ["#e5e5e5", "#737373", "#0a0a0a", "#ef4444"], // Match colors with the columns
    },
  },
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
    label: "Trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
    iconColor: "text-violet-400",
    bgColor: "bg-violet-400",
  },
  {
    id: 1,
    label: "Naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-400",
    bgColor: "bg-green-400",
  },
  {
    id: 2,
    label: "Blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
    iconColor: "text-teal-400",
    bgColor: "bg-teal-400",
  },
  {
    id: 3,
    label: "Luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-400",
    bgColor: "bg-sky-400",
  },
  {
    id: 4,
    label: "Skärmträd",
    text: "Fröträd lämnas",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-400",
    bgColor: "bg-orange-400",
  },
];

onMounted(async () => {
  if (process.client) {
    const module = await import("vue3-apexcharts");
    VueApexCharts.value = module.default;
    // Optionally, load data here or elsewhere
  }
});

// Define the slider steps
const sliderSteps = [
  { value: 3, label: "Innan avverkning" },
  { value: 15, label: "Efter avverkning" },
  { value: 45, label: "20 år efter avverkning" },
  { value: 70, label: "50 år efter avverkning" },
  { value: 99, label: "80 år efter avverkning" },
];

const timesLabels = [
  "Innan avverkning",
  "Efter avverkning",
  "20 år efter avverkning",
  "50 år efter avverkning",
  "80 år efter avverkning",
];

const currentTimeLabel = computed(() => {
  const step = sliderSteps.find((s) => s.value === time.value);
  return step ? step.label : "";
});

const times = ["före", "efter", "20", "50", "80"];

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

const currentTime = computed(() => times[selectedTimeIndex.value]);

// Map slider values to time labels for filenames
function mapTimeToLabel(value) {
  const labels = [3, 15, 45, 70, 99]; // Slider values
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
