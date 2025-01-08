<template>
  <div class="pt-8">
    <div class="w-full grid grid-cols-4">
      <div
        class="col-span-3 items-center flex relative justify-between"
        v-if="!frameworksVisible"
      >
        <div class="flex gap-2 items-center mb-2">
          <!-- Existing Framework Selection Dropdown -->
          <Icon
            :name="currentFramework.icon"
            :class="[
              'icon size-10 transition-all duration-300',
              currentFramework.iconColor,
            ]"
          />
          <div>
            <BaseDropdown
              flavor="text"
              class="text-xl font-thin text-neutral-800"
              :label="currentFramework.label"
              placement="bottom-start"
              shape="full"
            >
              <BaseDropdownItem
                v-for="(framework, index) in frameworks"
                :key="framework.id"
                @click="selectedFrameworkIndex = index"
                :title="framework.label"
                :text="framework.text"
                shape="md"
                rounded="md"
                class="rounded-md overflow-hidden"
              >
                <template #start>
                  <Icon
                    :name="framework.icon"
                    :class="['icon size-6 mr-1', framework.iconColor]"
                  />
                </template>
              </BaseDropdownItem>
              <BaseDropdownDivider />
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
                    shape="sm"
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
            <p class="text-md text-gray-400">{{ currentStartskog.label }}</p>
          </div>
        </div>

        <div class="z-50">
          <!-- If NOT in framework compare mode AND NOT in before/after compare mode -->
          <template v-if="!isFrameworkCompareMode && !isCompare">
            <BaseDropdown
              flavor="button"
              class="inline-block text-neural-400 rounded-full"
              placement="bottom-end"
              label="Jämför"
              shape="full"
            >
              <template #activator>
                <BaseButtonIcon shape="full" @click.stop="toggle">
                  <Icon
                    name="material-symbols:add-2-rounded"
                    class="w-10 h-10"
                  />
                </BaseButtonIcon>
              </template>

              <BaseDropdownItem
                @click="onClickFrameworkCompare"
                title="Skogsskötsel"
                text="Jämför två olika metoder"
                class="rounded-md overflow-hidden"
              >
                <template #start>
                  <Icon
                    name="simple-icons:forestry"
                    class="icon size-6 mr-1 text-primary-500"
                  />
                </template>
              </BaseDropdownItem>

              <BaseDropdownItem
                @click="onClickBeforeAfterCompare"
                title="Innan / efter avverkning"
                text="Jämför utveckling över tid"
                class="rounded-md overflow-hidden"
              >
                <template #start>
                  <Icon
                    name="material-symbols:clock-loader-40"
                    class="icon size-7 mr-1 text-primary-500"
                  />
                </template>
              </BaseDropdownItem>
            </BaseDropdown>
          </template>

          <!-- If in framework compare mode -->
          <template v-else-if="isFrameworkCompareMode">
            <div class="flex gap-2 items-center mb-2 z-50">
              <div>
                <BaseDropdown
                  flavor="text"
                  class="text-xl font-thin text-neutral-800"
                  :label="currentFramework2.label"
                  placement="bottom-start"
                >
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
              </div>
              <div class="relative">
                <BaseButtonIcon
                  shape="full"
                  size="xs"
                  @click="onClickFrameworkCompare"
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

          <!-- If in before/after compare mode -->
          <template v-else-if="isCompare">
            <div
              class="flex items-center gap-2 text-xl font-thin text-neutral-400 relative"
            >
              <BaseDropdown
                flavor="text"
                class="text-xl font-thin text-neutral-400"
                :label="currentTimeLabel"
                placement="bottom-start"
              >
                <BaseDropdownItem
                  v-for="(stepItem, idx) in availableTimeSteps"
                  :key="idx"
                  @click="time = stepItem.value"
                  :title="stepItem.label"
                  :text="stepItem.label"
                  rounded="sm"
                >
                  <template #start>
                    <Icon
                      :name="timeIconMap[stepItem.timeLabel]"
                      class="icon size-6 mr-1 text-primary-500"
                    />
                  </template>
                </BaseDropdownItem>
              </BaseDropdown>
              <div class="relative">
                <BaseButtonIcon
                  shape="full"
                  size="xs"
                  @click="onClickBeforeAfterCompare"
                  class="absolute -top-6 -right-6"
                >
                  <Icon name="material-symbols:close" class="size-4 m-1" />
                </BaseButtonIcon>
                <Icon
                  :name="currentTimeIcon"
                  class="icon size-10 text-primary-500"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-5">
      <div class="col-span-3">
        <div class="relative">
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
          </div>

          <!-- External zoom controls -->
          <div class="absolute top-2 left-2 bg-white p-2 z-50 rounded shadow">
            <button @click="zoomAllIn" class="m-1 px-2 py-1 border rounded">
              Zoom In
            </button>
            <button @click="zoomAllOut" class="m-1 px-2 py-1 border rounded">
              Zoom Out
            </button>
            <button @click="resetAll" class="m-1 px-2 py-1 border rounded">
              Reset
            </button>
          </div>

          <!-- Single View -->
          <div
            v-if="!isCompare && !isFrameworkCompareMode"
            class="relative w-full h-[650px]"
          >
            <OpenSeadragonViewer
              :key="currentImagePath"
              ref="singleViewerRef"
              :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
              @viewportChanged="($event) => onViewportChanged('single', $event)"
              @opened="onViewerOpened('single')"
              class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
            />
            <UBadge
              size="xs"
              :label="currentTimeLabel"
              color="white"
              variant="solid"
              class="absolute bottom-4 right-4"
            />
            <Circle
              v-for="circle in filteredCircles"
              :key="circle.id"
              :position="circle.position"
              :info="circle.info"
            />
          </div>

          <!-- Before/After Compare -->
          <img-comparison-slider
            ref="comparisonSliderRef"
            v-else-if="isCompare"
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
          >
            <div class="relative w-full h-[650px]" slot="first">
              <OpenSeadragonViewer
                :key="currentImagePath"
                ref="beforeViewerRef"
                :dziUrl="comparisonImagePath1.replace('.png', '.png_dzi.dzi')"
                @viewportChanged="
                  ($event) => onViewportChanged('before', $event)
                "
                @opened="onViewerOpened('before')"
                class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
              />
              <UBadge
                size="xs"
                label="Innan avverkning"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>
            <div class="relative w-full h-[650px]" slot="second">
              <OpenSeadragonViewer
                :key="currentImagePath2"
                ref="afterViewerRef"
                :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                @viewportChanged="
                  ($event) => onViewportChanged('after', $event)
                "
                @opened="onViewerOpened('after')"
                class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
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

          <!-- Framework Compare -->
          <img-comparison-slider
            v-else-if="isFrameworkCompareMode"
            class="slider-example-focus z-0 w-full p-0! m-0! -mb-1.5"
          >
            <div
              class="relative w-full h-[650px] pointer-events-none"
              slot="first"
            >
              <OpenSeadragonViewer
                :key="currentImagePath"
                ref="framework1ViewerRef"
                :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                @viewportChanged="
                  ($event) => onViewportChanged('framework1', $event)
                "
                @opened="onViewerOpened('framework1')"
                class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-4 left-4"
              />
            </div>
            <div
              class="relative w-full h-[650px] pointer-events-none"
              slot="second"
            >
              <OpenSeadragonViewer
                :key="currentImagePath2"
                ref="framework2ViewerRef"
                :dziUrl="currentImagePath2.replace('.png', '.png_dzi.dzi')"
                @viewportChanged="
                  ($event) => onViewportChanged('framework2', $event)
                "
                @opened="onViewerOpened('framework2')"
                class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
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
            <div class="flex justify-between items-center w-full mt-4">
              <div
                v-for="step in sliderSteps"
                :key="step.value"
                @click="handleTimeSelection(step)"
                class="flex flex-col items-center cursor-pointer"
              >
                <BaseButtonAction
                  shape="full"
                  :class="
                    time === step.value &&
                    '!border-primary-500 !text-primary-500'
                  "
                  :disabled="isCompare && step.value === 3"
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
                <BaseHeading size="2xl" weight="thin" class="text-neutral-600">
                  {{ currentFramework.label }}
                </BaseHeading>
              </div>
              <BaseProse class="text-sm font-neutral-500">
                <!-- Modal content here -->
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
            v-if="isFrameworkCompareMode"
            class="cursor-pointer transition-all bg-white w-full p-4 rounded-xl h-40 border-[1px] border-neutral-100 mb-2 hover:border-neutral-200 hover:border-opacity-80 hover:bg-neutral-50 hover:bg-opacity-80"
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
              <BaseHeading size="md" weight="thin" class="text-neutral-600">
                {{ currentFramework2.label }}
              </BaseHeading>
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
                <BaseHeading size="2xl" weight="thin" class="text-neutral-600">
                  {{ currentFramework2.label }}
                </BaseHeading>
              </div>
              <BaseProse class="text-sm font-neutral-500">
                <!-- Modal content here -->
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

<script setup>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";
import Circle from "~/components/Circle.vue";
import BarChart from "~/components/BarChartSkogsbruk.vue";
import OpenSeadragonViewer from "~/components/OpenSeadragonViewer.vue";
import { ref, computed, watch } from "vue";
import { useOnboardingStore } from "~/stores/onboardingStore";
import circleDataJson from "public/circles.json";

// Using script setup: no export default, directly write your logic here.

const onboardingStore = useOnboardingStore();

const Modal1 = ref(false);
const Modal2 = ref(false);
const circleData = ref(circleDataJson);
const showPingEffectCompareButton = ref(false);

const handleDisabledToggleFrameworkCompareClick = () => {
  showPingEffectCompareButton.value = true;
  setTimeout(() => {
    showPingEffectCompareButton.value = false;
  }, 500);
};

const selectedFrameworkIndex = computed({
  get: () => onboardingStore.selectedFramework,
  set: (value) => (onboardingStore.selectedFramework = value),
});

const selectedStartskogIndex = computed({
  get: () => onboardingStore.selectedStartskog,
  set: (value) => (onboardingStore.selectedStartskog = value),
});

const frameworksVisible = ref(false);
const toggleFrameworks = () =>
  (frameworksVisible.value = !frameworksVisible.value);

const frameworks = [
  {
    id: 0,
    label: "Trakthygge",
    value: "trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
    iconColor: "text-violet-400",
  },
  {
    id: 1,
    label: "Ingen åtgärd",
    value: "naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-400",
  },
  {
    id: 2,
    label: "Blädning",
    value: "blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
    iconColor: "text-teal-400",
  },
  {
    id: 3,
    label: "Luckhuggning",
    value: "luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-400",
  },
  {
    id: 4,
    label: "Skärmträd",
    value: "skärmträd",
    text: "Överhållen skärm",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-400",
  },
];

const startskog = [
  { label: "I äldre skog som inte kalavverkats", value: "naturskog" },
  { label: "I skog som har kalavverkats", value: "produktionsskog_" },
];

const currentFramework = computed(
  () => frameworks[selectedFrameworkIndex.value]
);
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value]
);

const isFrameworkCompareMode = ref(false);
const toggleFrameworkCompare = () => {
  isFrameworkCompareMode.value = !isFrameworkCompareMode.value;
};

const selectedFrameworkIndex2 = ref(selectedFrameworkIndex.value);
const currentFramework2 = computed(
  () => frameworks[selectedFrameworkIndex2.value]
);

const isCompare = ref(false);
const toggleCompare = () => {
  isCompare.value = !isCompare.value;
};

const onClickFrameworkCompare = () => {
  if (!isFrameworkCompareMode.value) {
    isCompare.value = false;
  }
  toggleFrameworkCompare();
};

const onClickBeforeAfterCompare = () => {
  if (!isCompare.value) {
    // Turning compare mode on
    isFrameworkCompareMode.value = false;
    time.value = 15; // Set to "Efter avverkning"
  }
  toggleCompare();
};

const showTree = ref(true);
const showFungi = ref(true);

const startskogModel = ref([]);
startskogModel.value =
  selectedStartskogIndex.value === 1 ? ["produktionsskog"] : [];
watch(startskogModel, (newVal) => {
  selectedStartskogIndex.value = newVal.includes("produktionsskog") ? 1 : 0;
});

const time = ref(3);

function handleTimeSelection(step) {
  // If in compare mode, do not allow selecting 'innan avverkning' (3)
  if (isCompare.value && step.value === 3) {
    return; // do nothing
  }
  time.value = step.value;
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
  return mapping[value] || "innan";
}

function mapTimeToLabel(value) {
  const step = sliderSteps.value.find((s) => s.value === value);
  return step ? step.timeLabel : "före";
}

const sliderSteps = computed(() => {
  const steps = [
    { value: 3, label: "Innan avverkning", timeLabel: "före" },
    { value: 15, label: "Efter avverkning", timeLabel: "efter" },
  ];
  if (
    currentFramework.value.value === "skärmträd" &&
    !isFrameworkCompareMode.value
  ) {
    steps.push({
      value: 30,
      label: "10 år efter avverkning",
      timeLabel: "10",
    });
  }
  steps.push(
    { value: 45, label: "20 år efter avverkning", timeLabel: "20" },
    { value: 70, label: "50 år efter avverkning", timeLabel: "50" },
    { value: 99, label: "80 år efter avverkning", timeLabel: "80" }
  );
  return steps;
});

const currentTimeLabel = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  return step ? step.label : "";
});

const time2 = computed(() => (isCompare.value ? 3 : null));
const timeLabelForDataFiltering2 = computed(() =>
  time2.value !== null ? mapTimeValueToDataAlder(time2.value) : null
);
const timeLabelForDataFiltering = computed(() =>
  mapTimeValueToDataAlder(time.value)
);

const timeIconMap = {
  efter: "material-symbols:clock-loader-10",
  10: "material-symbols:clock-loader-30",
  20: "material-symbols:clock-loader-40",
  50: "material-symbols:clock-loader-60",
  80: "material-symbols:clock-loader-90",
};

const availableTimeSteps = computed(() =>
  sliderSteps.value.filter((s) => s.timeLabel !== "före")
);

const currentTimeIcon = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  if (!step) return "";
  return timeIconMap[step.timeLabel] || "";
});

const comparisonImagePath1 = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = "före";
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImagePath2 = computed(() => {
  const framework = currentFramework2.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImageKey = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  return `${framework}_${timeLabel}`;
});

const filteredCircles = computed(() =>
  circleData.value.filter((circle) =>
    circle.images.includes(currentImageKey.value)
  )
);

const currentImagePath = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

watch([currentFramework, isCompare, isFrameworkCompareMode], () => {
  const validValues = sliderSteps.value.map((s) => s.value);
  if (!validValues.includes(time.value)) {
    time.value = 15;
  }
});

const singleViewerRef = ref(null);
const beforeViewerRef = ref(null);
const afterViewerRef = ref(null);
const framework1ViewerRef = ref(null);
const framework2ViewerRef = ref(null);

let viewportChangeSource = null;
const globalViewport = ref({ zoom: 1, center: null });
const openedViewers = ref({});

function onViewportChanged(source, { zoom, center } = {}) {
  if (!zoom || !center) return;
  if (viewportChangeSource !== source) {
    viewportChangeSource = source;
    globalViewport.value = { zoom, center };
  }
}

function onViewerOpened(source) {
  openedViewers.value[source] = true;
  applyGlobalViewportToAll();
}

function applyToViewer(viewer, fn) {
  if (!viewer || !viewer.viewport) return;
  fn(viewer);
}

function getActiveViewers() {
  if (!isCompare.value && !isFrameworkCompareMode.value) {
    return [singleViewerRef.value?.viewer].filter(Boolean);
  } else if (isCompare.value) {
    return [beforeViewerRef.value?.viewer, afterViewerRef.value?.viewer].filter(
      Boolean
    );
  } else if (isFrameworkCompareMode.value) {
    return [
      framework1ViewerRef.value?.viewer,
      framework2ViewerRef.value?.viewer,
    ].filter(Boolean);
  }
  return [];
}

function applyGlobalViewportToAll() {
  const { zoom, center } = globalViewport.value;
  if (!zoom || !center) return;

  const viewers = getActiveViewers();
  viewers.forEach((viewer) => {
    applyToViewer(viewer, (v) => {
      v.viewport.panTo(center, true);
      v.viewport.zoomTo(zoom);
      v.viewport.applyConstraints();
      v.forceRedraw();
    });
  });
}

function zoomAllIn() {
  const viewers = getActiveViewers();
  const zoomFactor = 1.2;
  viewers.forEach((viewer) => {
    applyToViewer(viewer, (v) => {
      const currentZoom = v.viewport.getZoom();
      v.viewport.zoomTo(currentZoom * zoomFactor);
      v.viewport.applyConstraints();
      v.forceRedraw();
    });
  });
  if (viewers.length > 0) {
    const newZoom = viewers[0].viewport.getZoom();
    const newCenter = viewers[0].viewport.getCenter();
    globalViewport.value = { zoom: newZoom, center: newCenter };
  }
}

function zoomAllOut() {
  const viewers = getActiveViewers();
  const zoomFactor = 1 / 1.2;
  viewers.forEach((viewer) => {
    applyToViewer(viewer, (v) => {
      const currentZoom = v.viewport.getZoom();
      v.viewport.zoomTo(currentZoom * zoomFactor);
      v.viewport.applyConstraints();
      v.forceRedraw();
    });
  });
  if (viewers.length > 0) {
    const newZoom = viewers[0].viewport.getZoom();
    const newCenter = viewers[0].viewport.getCenter();
    globalViewport.value = { zoom: newZoom, center: newCenter };
  }
}

function resetAll() {
  const viewers = getActiveViewers();
  viewers.forEach((viewer) => {
    applyToViewer(viewer, (v) => {
      v.viewport.goHome(true);
      v.viewport.applyConstraints();
      v.forceRedraw();
    });
  });
  globalViewport.value = { zoom: 1, center: { x: 0.5, y: 0.5 } };
}
</script>

<style scoped>
.slider-example-focus:focus {
  outline: none;
}
</style>
