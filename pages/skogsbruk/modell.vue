<template>
  <client-only>
    <div class="transition-all duration-300">
      <MySlideover
        v-model="showSlideover"
        :pinned="isPinned"
        :expanded="activeSlideOverOption === 'both'"
        @update:pinned="(val) => (isPinned = val)"
      >
        <!-- Header with three buttons using compareItemsSlideOver -->

        <template #header>
          <UTabs
            v-model="selectedIndex"
            :items="tabItems"
            class="w-full"
            v-if="isFrameworkCompareMode"
          />
        </template>

        <!-- Content -->
        <div class="p-6 pt-3">
          <div class="flex gap-6">
            <div class="w-[336px]">
              <BaseHeading size="3xl" weight="thin" lead="snug" class="mb-2">
                {{
                  selectedTabKey === "framework1"
                    ? currentFramework.label
                    : currentFramework2.label
                }}
              </BaseHeading>
              <NuxtImg
                :src="
                  selectedTabKey === 'framework1'
                    ? frameworkImage
                    : frameworkImage2
                "
                alt="Framework image"
                class="rounded-lg mb-4"
                width="500"
                height="320"
                format="webp"
              />
              <BaseHeading size="lg" weight="medium">Om metoden</BaseHeading>
              <BaseHeading
                weight="thin"
                size="md"
                class="text-neutral-500 mb-2"
              >
                {{
                  selectedTabKey === "framework1"
                    ? modalInfo.description
                    : modalInfo2.description
                }}
              </BaseHeading>
              <BaseHeading size="lg" weight="medium">
                Påverkan på mykorrhizasvampar
              </BaseHeading>
              <BaseHeading
                weight="thin"
                size="md"
                class="text-neutral-500 mb-2"
              >
                {{
                  selectedTabKey === "framework1"
                    ? modalInfo.impact
                    : modalInfo2.impact
                }}
              </BaseHeading>
              <FullFrameworkTimeline
                :frameworkValue="
                  selectedTabKey === 'framework1'
                    ? currentFramework.value
                    : currentFramework2.value
                "
                :startskogValue="currentStartskog.value"
              />
            </div>
          </div>
        </div>
      </MySlideover>

      <div class="pt-8">
        <div class="w-full flex gap-2">
          <div
            class="items-center flex relative w-full gap-2"
            v-if="!frameworksVisible"
          >
            <div class="flex gap-2 items-center">
              <!-- Main framework icon -->

              <Icon
                :name="currentFramework.icon"
                :class="[
                  'icon size-7 transition-all duration-300',
                  currentFramework.iconColor,
                ]"
              />
              <div>
                <!-- Custom popover-based select for main framework -->
                <UPopover
                  :ui="{ rounded: 'rounded-xl' }"
                  :popper="{ placement: 'bottom-start' }"
                >
                  <BaseHeading
                    size="3xl"
                    weight="semi-bold"
                    class="text-neutral-800"
                  >
                    {{ currentFramework.label }}
                  </BaseHeading>

                  <template #panel>
                    <div class="p-2 flex flex-col gap-2">
                      <div
                        v-for="(framework, index) in frameworks"
                        :key="framework.id"
                        @click="selectedFrameworkIndex = index"
                        class="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 p-2 rounded-md"
                      >
                        <Icon
                          :name="framework.icon"
                          :class="[' size-6 mr-1', framework.iconColor]"
                        />
                        <div>
                          <div class="font-medium">{{ framework.label }}</div>
                          <div class="text-sm text-neutral-500">
                            {{ framework.text }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </UPopover>
              </div>
            </div>

            <!-- Compare mode: second framework selection -->
            <div class="flex gap-2">
              <template v-if="isFrameworkCompareMode">
                <div class="flex gap-2 items-center">
                  <BaseHeading
                    size="3xl"
                    weight="semi-bold"
                    class="text-neutral-800"
                  >
                    /
                  </BaseHeading>

                  <div class="relative">
                    <Icon
                      :name="currentFramework2.icon"
                      :class="[
                        ' size-7 transition-all duration-300',
                        currentFramework2.iconColor,
                      ]"
                    />
                  </div>
                  <div>
                    <UPopover
                      :ui="{ rounded: 'rounded-xl' }"
                      :popper="{ placement: 'bottom-start' }"
                    >
                      <BaseHeading
                        size="3xl"
                        weight="semi-bold"
                        class="text-neutral-800"
                      >
                        {{ currentFramework2.label }}
                      </BaseHeading>

                      <template #panel>
                        <div class="p-2 flex flex-col gap-2">
                          <div
                            v-for="(framework, index) in frameworks"
                            :key="'framework2-' + framework.id"
                            @click="selectedFrameworkIndex2 = index"
                            class="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 p-2 rounded-md"
                          >
                            <Icon
                              :name="framework.icon"
                              :class="['icon size-6 mr-1', framework.iconColor]"
                            />
                            <div>
                              <div class="font-medium">
                                {{ framework.label }}
                              </div>
                              <div class="text-sm text-neutral-500">
                                {{ framework.text }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </UPopover>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="w-96"></div>
        </div>

        <div class="flex">
          <div>
            <div class="p-1 flex my-1">
              <UPopover
                v-model:open="open"
                :popper="{ placement: 'bottom-start' }"
                :ui="{ rounded: 'rounded-xl' }"
              >
                <UButton
                  class="w-full shrink-0"
                  :ui="{ rounded: 'rounded-lg' }"
                  >{{ currentStartskog.label }}</UButton
                >
                <template #panel>
                  <div class="p-2 flex flex-col gap-1">
                    <div v-for="option in startskog" :key="option.value">
                      <UButton
                        @click="selectOption(option)"
                        color="white"
                        variant="ghost"
                        class="hover:bg-neutral-100 w-full"
                        :class="{
                          'bg-neutral-200 w-full hover:bg-neutral-200':
                            currentStartskog.value === option.value,
                        }"
                        >{{ option.label }}</UButton
                      >
                    </div>
                  </div>
                </template>
              </UPopover>
            </div>
            <div
              class="rounded-lg h-fit p-2 w-72 shrink-0 bg-neutral-200/50 mr-2"
            >
              <!-- <h1 class="text-sm text-neutral-500 mb-1">
                <Icon name="iconamoon:compare-duotone" class="" />
                Jämförelseläge
              </h1> -->
              <!-- <div class="grid grid-cols-2 gap-2">
                <NuxtImg
                  :src="frameworkImage"
                  alt="Framework image"
                  class="rounded-lg border border-neutral-200"
                  width="500"
                  height="320"
                  format="webp"
                />
                <NuxtImg
                  v-if="isFrameworkCompareMode"
                  :src="frameworkImage2"
                  alt="Framework image"
                  class="rounded-lg border border-neutral-200"
                  width="500"
                  height="320"
                  format="webp"
                />
              </div> -->

              <!-- Add a  -->

              <h1 class="text-sm text-neutral-500 mb-1">
                <Icon name="iconamoon:compare-duotone" class="" />
                Jämförelseläge
              </h1>
              <UTabs
                orientation="vertical"
                v-model="selectedCompareIndex"
                :items="compareTabItems"
                class="w-full"
                :ui="{
                  wrapper: 'relative space-y-2',

                  list: {
                    background: 'bg-neutral-200/50',
                    rounded: 'rounded-lg',
                    marker: {
                      rounded: 'rounded-lg',
                    },
                    tab: {
                      active: 'text-neutral-900',
                      inactive: 'text-neutral-600',
                    },
                  },
                }"
              />
              <h1 class="text-sm text-neutral-500 mb-1">
                <Icon name="heroicons:chart-bar-solid" class="" />
                Artsammansättning
              </h1>
              <div class="p-2 bg-neutral-100 rounded-lg">
                <UTabs
                  v-model="selectedChartIndex"
                  :items="chartTabItems"
                  class="w-full"
                  :ui="{
                    wrapper: 'relative space-y-0',

                    list: {
                      background: 'bg-neutral-200/50',
                      rounded: 'rounded-lg',
                      marker: {
                        rounded: 'rounded-lg',
                      },
                      tab: {
                        active: 'text-neutral-900',
                        inactive: 'text-neutral-600',
                      },
                    },
                  }"
                />
                <SvampLineChart
                  v-if="chartType === 'line'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :visibleGroups="['Rödlistade + signalarter']"
                  :decimals="2"
                />
                <SvampBarChart
                  v-if="chartType === 'bar'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :timeLabel="timeLabelForDataFiltering"
                  :timeLabel2="isCompare ? timeLabelForDataFiltering2 : null"
                  :currentTimeLabel="currentTimeLabel"
                  :isCompareMode="isCompare"
                  :isFrameworkCompareMode="isFrameworkCompareMode"
                  :visibleGroups="['Rödlistade + signalarter']"
                  :yaxisMax="0.1"
                  :decimals="2"
                />
                <SvampLineChart
                  v-if="chartType === 'line'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :visibleGroups="['Matsvamp']"
                  :decimals="1"
                />
                <SvampBarChart
                  v-if="chartType === 'bar'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :timeLabel="timeLabelForDataFiltering"
                  :timeLabel2="isCompare ? timeLabelForDataFiltering2 : null"
                  :currentTimeLabel="currentTimeLabel"
                  :isCompareMode="isCompare"
                  :isFrameworkCompareMode="isFrameworkCompareMode"
                  :visibleGroups="['Matsvamp']"
                  :yaxisMax="1"
                  :decimals="1"
                />
                <SvampBarChart
                  v-if="chartType === 'bar'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :timeLabel="timeLabelForDataFiltering"
                  :timeLabel2="isCompare ? timeLabelForDataFiltering2 : null"
                  :currentTimeLabel="currentTimeLabel"
                  :isCompareMode="isCompare"
                  :isFrameworkCompareMode="isFrameworkCompareMode"
                  :visibleGroups="[
                    'Skinnsvampar',
                    'Övriga svampar',
                    'Spindelskivlingar',
                    'Kremlor och riskor',
                  ]"
                  :decimals="0"
                />

                <SvampLineChart
                  v-if="chartType === 'line'"
                  :currentFramework="currentFramework"
                  :currentFramework2="
                    isFrameworkCompareMode ? currentFramework2 : null
                  "
                  :currentStartskog="currentStartskog"
                  :visibleGroups="[
                    'Skinnsvampar',
                    'Övriga svampar',
                    'Spindelskivlingar',
                    'Kremlor och riskor',
                  ]"
                  :decimals="0"
                />
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="flex gap-2 items-center w-full justify-between">
              <UTabs
                v-model="selectedTimeIndex"
                :items="timeItems"
                class="w-auto shrink"
                :ui="{
                  wrapper: 'relative space-y-0',

                  list: {
                    background: 'bg-neutral-200/50',
                    rounded: 'rounded-lg',
                    marker: {
                      rounded: 'rounded-lg',
                    },
                    tab: {
                      active: 'text-neutral-900',
                      inactive: 'text-neutral-600',
                    },
                  },
                }"
              />
              <UButton
                icon="i-heroicons-document-text"
                @click="openSlideover"
                color="gray"
                variant="solid"
                class="mb-1 mt-2"
                :ui="{
                  rounded: 'rounded-lg',
                  color: {
                    gray: {
                      solid: 'text-neutral-700 ring-neutral-300',
                    },
                  },
                }"
              >
                <!-- <Icon name="solar:sidebar-minimalistic-outline"/> -->
                Text om skogsskötselmetod</UButton
              >
            </div>
            <div
              class="relative w-full h-96 resize-y overflow-auto flex mt-1 bg-neutral-200/50 p-2 rounded-lg"
            >
              <StackedBarSkogsbruk
                class="h-full border border-neutral-300 rounded-full mr-1 w-3"
                v-if="isCompare"
                :currentFramework="currentFramework"
                :currentStartskog="currentStartskog"
                :timeLabel="timeLabelForDataFiltering"
                :overrideTimeLabel="timeLabelForDataFiltering2"
                :isCompareMode="isCompare"
                :isFrameworkCompareMode="isFrameworkCompareMode"
              />
              <StackedBarSkogsbruk
                class="h-full border border-neutral-300 rounded-full mr-1 w-3"
                v-if="isFrameworkCompareMode"
                :currentFramework="currentFramework"
                :currentStartskog="currentStartskog"
                :timeLabel="timeLabelForDataFiltering"
                :isCompareMode="isCompare"
                :isFrameworkCompareMode="isFrameworkCompareMode"
              />

              <div class="relative w-full">
                <div class="absolute w-full justify-between flex p-4 z-10">
                  <div>
                    <div class="mb-2">
                      <BaseButtonIcon @click="zoomAllIn" shape="full" size="sm">
                        <Icon
                          name="heroicons:magnifying-glass-plus"
                          class="h-5 w-5"
                        />
                      </BaseButtonIcon>
                    </div>
                    <div class="mb-2">
                      <BaseButtonIcon
                        @click="zoomAllOut"
                        shape="full"
                        size="sm"
                      >
                        <Icon
                          name="heroicons:magnifying-glass-minus-solid"
                          class="h-5 w-5"
                        />
                      </BaseButtonIcon>
                    </div>
                    <div class="mb-2">
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
                    </div>
                    <div class="mb-2">
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
                    <!-- <div>
                    <BaseButtonIcon @click="resetAll" shape="full">
                      <Icon
                        name="heroicons:magnifying-glass-solid"
                        class="h-5 w-5"
                      />
                    </BaseButtonIcon>
                  </div> -->
                  </div>
                </div>
                <!-- Single View -->
                <div
                  v-if="!isCompare && !isFrameworkCompareMode"
                  class="w-full h-full"
                >
                  <OpenSeadragonViewer
                    ref="singleViewerRef"
                    :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                    :allowPan="!isCompare && !isFrameworkCompareMode"
                    @viewportChanged="
                      ($event) => onViewportChanged('single', $event)
                    "
                    @opened="onViewerOpened('single')"
                    class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                  />
                  <!-- <UBadge
                    size="xs"
                    :label="currentTimeLabel"
                    color="white"
                    variant="solid"
                    class="absolute bottom-4 left-4"
                  />
                  <UBadge
                    size="xs"
                    :label="currentFramework.label"
                    color="white"
                    variant="solid"
                    class="absolute bottom-12 left-4"
                  /> -->
                  <Circle
                    v-for="circle in filteredCircles"
                    :key="circle.id"
                    :position="circle.position"
                    :info="circle.info"
                  />
                </div>

                <!-- Before/After Compare -->

                <CustomImageComparisonSlider
                  class="w-full h-full"
                  ref="comparisonSliderRef"
                  v-else-if="isCompare"
                >
                  <template #first>
                    <OpenSeadragonViewer
                      ref="beforeViewerRef"
                      :dziUrl="
                        comparisonImagePath1.replace('.png', '.png_dzi.dzi')
                      "
                      :allowPan="!isCompare && !isFrameworkCompareMode"
                      @viewportChanged="
                        ($event) => onViewportChanged('before', $event)
                      "
                      @opened="onViewerOpened('before')"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                    />
                    <!-- <UBadge
                      size="xs"
                      label="Före avverkning"
                      color="white"
                      variant="solid"
                      class="absolute bottom-4 left-4"
                    />
                    <UBadge
                      size="xs"
                      :label="currentFramework.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 left-4"
                    /> -->
                  </template>
                  <template #second>
                    <OpenSeadragonViewer
                      ref="afterViewerRef"
                      :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                      :allowPan="!isCompare && !isFrameworkCompareMode"
                      @viewportChanged="
                        ($event) => onViewportChanged('after', $event)
                      "
                      @opened="onViewerOpened('after')"
                      class="h-full w-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                    />
                    <!-- <UBadge
                      size="xs"
                      :label="currentTimeLabel"
                      color="white"
                      variant="solid"
                      class="absolute bottom-4 right-4"
                    />
                    <UBadge
                      size="xs"
                      :label="currentFramework.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 right-4"
                    /> -->
                  </template>
                </CustomImageComparisonSlider>

                <!-- Framework Compare -->
                <CustomImageComparisonSlider
                  v-else-if="isFrameworkCompareMode"
                  class="w-full h-full"
                >
                  <template #first>
                    <OpenSeadragonViewer
                      ref="framework1ViewerRef"
                      :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                      :allowPan="!isCompare && !isFrameworkCompareMode"
                      @viewportChanged="
                        ($event) => onViewportChanged('framework1', $event)
                      "
                      @opened="onViewerOpened('framework1')"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
                    />
                    <!-- <UBadge
                      size="xs"
                      :label="currentTimeLabel"
                      color="white"
                      variant="solid"
                      class="absolute bottom-4 left-4"
                    />
                    <UBadge
                      size="xs"
                      :label="currentFramework.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 left-4"
                    /> -->
                  </template>
                  <template #second>
                    <OpenSeadragonViewer
                      ref="framework2ViewerRef"
                      :dziUrl="
                        currentImagePath2.replace('.png', '.png_dzi.dzi')
                      "
                      :allowPan="!isCompare && !isFrameworkCompareMode"
                      @viewportChanged="
                        ($event) => onViewportChanged('framework2', $event)
                      "
                      @opened="onViewerOpened('framework2')"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
                    />
                    <!-- <UBadge
                      size="xs"
                      :label="currentTimeLabel"
                      color="white"
                      variant="solid"
                      class="absolute bottom-4 right-4"
                    />
                    <UBadge
                      size="xs"
                      :label="currentFramework2.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 right-4"
                    /> -->
                  </template>
                </CustomImageComparisonSlider>
              </div>

              <StackedBarSkogsbruk
                class="h-full border border-neutral-300 rounded-full ml-1 w-3"
                v-if="isCompare || !isFrameworkCompareMode"
                :currentFramework="currentFramework"
                :currentStartskog="currentStartskog"
                :timeLabel="timeLabelForDataFiltering"
                :isCompareMode="isCompare"
                :isFrameworkCompareMode="isFrameworkCompareMode"
              />
              <StackedBarSkogsbruk
                class="h-full border border-neutral-300 rounded-full ml-1 w-3"
                v-if="isFrameworkCompareMode"
                :currentFramework="currentFramework"
                :currentStartskog="currentStartskog"
                :timeLabel="timeLabelForDataFiltering"
                :overrideFramework="currentFramework2"
                :isCompareMode="isCompare"
                :isFrameworkCompareMode="isFrameworkCompareMode"
              />
            </div>
            <div class="p-2 rounded-lg bg-neutral-200/50 mt-1">
              <TimelineInfoBox
                :currentFramework="currentFramework"
                :currentTime="timeLabelForDataFiltering"
                :currentStartskog="currentStartskog"
                :isCompare="isCompare"
                :isFrameworkCompareMode="isFrameworkCompareMode"
                :compareFramework="currentFramework2"
                :compareStartskog="currentStartskog"
                :compareTime="timeLabelForDataFiltering2"
                :currentTimeLabel="currentTimeLabel"
                @open-info="openSlideover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";
import Circle from "~/components/Circle.vue";
import BarChart from "~/components/BarChartSkogsbruk.vue";
import BarChartSkogsbrukRödMat from "~/components/BarChartSkogsbrukRödMat.vue";
import SvampLineChart from "~/components/SvampLineChart.vue";
import OpenSeadragonViewer from "~/components/OpenSeadragonViewer.vue";
import { ref, computed, watch, nextTick } from "vue";
import { useOnboardingStore } from "~/stores/onboardingStore";
import circleDataJson from "public/circles.json";
import SvampBarChart from "../../components/SvampBarChart.vue";
import frameworkDescriptions from "public/frameworkDescriptions.json";

const frameworkImage = computed(() => {
  const images = {
    naturskydd: "/images/ingen_åtgärd.jpg",
    trakthygge: "/images/kalhygge.jpg",
    luckhuggning: "/images/luckhuggning.jpg",
    skärmträd: "/images/överhållenskärm.jpg",
    blädning: "/images/blädning.jpg",
  };
  // Assuming currentFramework.value holds the key (e.g. 'naturskydd')
  return images[currentFramework.value.value] || "/images/default.jpg";
});

const frameworkImage2 = computed(() => {
  const images = {
    naturskydd: "/images/ingen_åtgärd.jpg",
    trakthygge: "/images/kalhygge.jpg",
    luckhuggning: "/images/luckhuggning.jpg",
    skärmträd: "/images/överhållenskärm.jpg",
    blädning: "/images/blädning.jpg",
  };
  // Assuming currentFramework.value holds the key (e.g. 'naturskydd')
  return images[currentFramework2.value.value] || "/images/default.jpg";
});

// Reactive property for controlling the slideover
const showSlideover = ref(false);
const isPinned = ref(true);

// Example method to open the slideover (triggered by the TimelineInfoBox)
function openSlideover() {
  showSlideover.value = true;
}

const modalInfo = computed(() => {
  if (!currentFramework.value?.value || !currentStartskog.value?.value) {
    return {};
  }
  const info =
    frameworkDescriptions[currentStartskog.value.value][
      currentFramework.value.value
    ] || {};
  // Return a shallow copy so that changes are detected
  return { ...info };
});
const modalInfo2 = computed(() => {
  if (!currentFramework2.value?.value || !currentStartskog.value?.value) {
    return {};
  }
  const info =
    frameworkDescriptions[currentStartskog.value.value][
      currentFramework2.value.value
    ] || {};
  return { ...info };
});

// Define your chart tab items:
const chartTabItems = computed(() => [
  { key: "bar", label: "Stapeldiagram" },
  { key: "line", label: "Linjediagram" },
]);

// Use a ref for the selected tab index (default: 0, meaning 'bar')
const selectedChartIndex = ref(0);

// Derive chartType from the selected index
const chartType = computed(() => {
  return chartTabItems.value[selectedChartIndex.value].key;
});

// Initialize the store
const onboardingStore = useOnboardingStore();

// Modal references
const Modal1 = ref(false);
const Modal2 = ref(false);

// Circle data
const circleData = ref(circleDataJson);

// Other refs
const showPingEffectCompareButton = ref(false);
const frameworksVisible = ref(false);
const toggleFrameworks = () =>
  (frameworksVisible.value = !frameworksVisible.value);
const showTree = ref(true);
const showFungi = ref(true);
const isFrameworkCompareMode = ref(false);
const isCompare = ref(false);

// const selectedComparisonOption = ref("framework1");

// const selectedComparisonObject = computed({
//   get() {
//     return (
//       compareItemsSlideOver.value.find(
//         (item) => item.id === selectedComparisonOption.value
//       ) || null
//     );
//   },
//   set(newVal) {
//     if (newVal && newVal.id) {
//       selectedComparisonOption.value = newVal.id;
//     } else {
//       selectedComparisonOption.value = newVal;
//     }
//   },
// });

// Define selectedFrameworkIndex
const selectedFrameworkIndex = computed({
  get: () => onboardingStore.selectedFramework,
  set: (value) => (onboardingStore.selectedFramework = value),
});

// Define selectedStartskogIndex
const selectedStartskogIndex = computed({
  get: () => onboardingStore.selectedStartskog ?? 0,
  set: (val) => {
    onboardingStore.selectedStartskog = val;
  },
});

// Define selectedFrameworkIndex2 as an independent ref
const selectedFrameworkIndex2 = ref(selectedFrameworkIndex.value);
const currentFramework2 = computed(() => {
  // This ensures that if selectedFrameworkIndex2 is out of bounds, we still get the first framework
  return frameworks[selectedFrameworkIndex2.value] || frameworks[0];
});

watch([isFrameworkCompareMode, isCompare], ([frameworkCompare, compare]) => {
  if (!frameworkCompare || !compare) {
    selectedComparisonOption.value = "framework1";
  }
});

const open = ref(false);

defineShortcuts({
  o: () => (open.value = !open.value),
});

// Function to handle selecting an option
const selectOption = (option) => {
  const newIndex = startskog.findIndex((o) => o.value === option.value);
  if (newIndex !== -1) {
    selectedStartskogIndex.value = newIndex;
  }
  open.value = false;
};

// Frameworks array
const frameworks = [
  {
    id: 0,
    label: "Ingen åtgärd",
    value: "naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-500",
  },
  {
    id: 1,
    label: "Trakthygge",
    value: "trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
    iconColor: "text-violet-500",
  },
  {
    id: 2,
    label: "Luckhuggning",
    value: "luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-500",
  },
  {
    id: 3,
    label: "Överhållen skärm",
    value: "skärmträd",
    text: "Överhållen skärm",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-500",
  },
  {
    id: 4,
    label: "Blädning",
    value: "blädning",
    text: "Stora träd gallras",
    icon: "lineicons:trees",
    iconColor: "text-teal-500",
  },
];

// Startskog array
const startskog = [
  { label: "I äldre skog som inte kalavverkats", value: "naturskog" },
  { label: "I skog som har kalavverkats", value: "produktionsskog_" },
];

// Current framework and startskog
const currentFramework = computed(
  () => frameworks[selectedFrameworkIndex.value]
);
// Compute the current startskog object based on the store index
// The current startskog object from the options array
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value]
);

// Computed property for the select element's v-model
const selectedStartskogValue = computed({
  get() {
    return currentStartskog.value.value;
  },
  set(newValue) {
    // Find the matching option and update the store's index
    const newIndex = startskog.findIndex((item) => item.value === newValue);
    if (newIndex !== -1) {
      selectedStartskogIndex.value = newIndex;
    }
  },
});

// Compare toggling functions
const toggleFrameworkCompare = () => {
  isFrameworkCompareMode.value = !isFrameworkCompareMode.value;
};

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
    isFrameworkCompareMode.value = false;
    time.value = 15; // Set to "Efter avverkning"
  }
  toggleCompare();
};

// Time references
const time = ref(3);

// Handle time selection
function handleTimeSelection(step) {
  if (isCompare.value && step.value === 3) return;
  time.value = step.value;
}

// Mapping functions
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

// Slider steps
const sliderSteps = computed(() => {
  const steps = [
    { value: 3, label: "Före avverkning", timeLabel: "före" },
    { value: 15, label: "0 - 1 år efter ", timeLabel: "efter" },
  ];
  if (
    currentFramework.value?.value === "skärmträd" &&
    !isFrameworkCompareMode.value
  ) {
    steps.push({ value: 30, label: "10 år efter", timeLabel: "10" });
  }
  steps.push(
    { value: 45, label: "20 år efter ", timeLabel: "20" },
    { value: 70, label: "50 år efter ", timeLabel: "50" },
    { value: 99, label: "+ 80 år efter ", timeLabel: "80" }
  );
  return steps;
});

// Create UTabs items from sliderSteps
const timeItems = computed(() =>
  sliderSteps.value.map((step) => ({
    key: step.value, // using the numeric value as the key
    label: step.label,
    disabled: isCompare.value && step.value === 3, // disable step value 3 in compare mode as before
  }))
);

// Create a computed property that gets/sets the selected tab index
// based on the time value. When set, it calls handleTimeSelection.
// Use a ref for the selected tab index
const selectedTimeIndex = ref(0);

// Watch the selectedTimeIndex and update time when it changes
watch(selectedTimeIndex, (newIndex) => {
  const step = sliderSteps.value[newIndex];
  if (step) {
    handleTimeSelection(step);
  }
});

// Current time labels
const currentTimeLabel = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  return step ? step.label : "";
});

// Time for data filtering
const time2 = computed(() => (isCompare.value ? 3 : null));
const timeLabelForDataFiltering2 = computed(() =>
  time2.value !== null ? mapTimeValueToDataAlder(time2.value) : null
);
const timeLabelForDataFiltering = computed(() =>
  mapTimeValueToDataAlder(time.value)
);

// Time icon mapping
const timeIconMap = {
  efter: "material-symbols:clock-loader-10",
  10: "material-symbols:clock-loader-20",
  20: "material-symbols:clock-loader-40",
  50: "material-symbols:clock-loader-60",
  80: "material-symbols:clock-loader-90",
};

// Available time steps
const availableTimeSteps = computed(() =>
  sliderSteps.value.filter((s) => s.timeLabel !== "före")
);

// Current time icon
const currentTimeIcon = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  if (!step) return "";
  return timeIconMap[step.timeLabel] || "";
});

// Image paths
const comparisonImagePath1 = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const timeLabel = "före";
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/DZI_Images/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImagePath2 = computed(() => {
  const framework = currentFramework2.value.value.toLowerCase();
  const tLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/DZI_Images/${framework}_${tLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImageKey = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const tLabel = mapTimeToLabel(time.value);
  return `${framework}_${tLabel}`;
});

const filteredCircles = computed(() =>
  circleData.value.filter((circle) =>
    circle.images.includes(currentImageKey.value)
  )
);

const currentImagePath = computed(() => {
  const framework = currentFramework.value.value.toLowerCase();
  const tLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/DZI_Images/${framework}_${tLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

// Watchers
watch([currentFramework, isCompare, isFrameworkCompareMode], () => {
  const validValues = sliderSteps.value.map((s) => s.value);
  if (!validValues.includes(time.value)) {
    time.value = 15;
  }
});

// Viewer references
const singleViewerRef = ref(null);
const beforeViewerRef = ref(null);
const afterViewerRef = ref(null);
const framework1ViewerRef = ref(null);
const framework2ViewerRef = ref(null);

// Viewport synchronization
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

// Compare choices
// const compareChoice = ref({
//   id: "none",
//   name: "Ingen jämförelse",
//   text: "Återgå till enkel vy",
//   icon: "i-mynaui:rectangle",
// });
// Our two tabs (we’re omitting “Visa båda”)
const tabItems = computed(() => [
  { key: "framework1", label: currentFramework.value.label },
  { key: "framework2", label: currentFramework2.value.label },
]);
// Use a ref for the selected index (default to 0 for framework1)
const selectedIndex = ref(0);
const selectedTabKey = computed(() => tabItems.value[selectedIndex.value].key);

watch(isFrameworkCompareMode, (newVal) => {
  if (!newVal) {
    selectedIndex.value = 0;
  }
});

const compareItems = [
  {
    id: "none",
    name: "Ingen jämförelse",
    text: "Återgå till enkel vy",
    icon: "i-mynaui:rectangle",
  },
  {
    id: "frameworkCompare",
    name: "Två olika skogsskötselmetoder",
    text: "Jämför två olika metoder",
    icon: "simple-icons:forestry",
  },
  {
    id: "beforeAfterCompare",
    name: "Före / efter avverkning",
    text: "Jämför utveckling över tid",
    icon: "material-symbols:clock-loader-40",
  },
];

// v-model primitive: selected compare choice (id)
const compareChoice = ref("none");

// Map compareItems to a UTabs‑friendly items array:
const compareTabItems = computed(() =>
  compareItems.map((option) => ({
    key: option.id,
    label: option.name,
    icon: option.icon,
    // Optionally, you could pass disabled if needed:
    disabled: option.disabled || false,
  }))
);

// Use a ref for the selected tab index; default should match the index of compareChoice ("none")
const selectedCompareIndex = ref(
  compareTabItems.value.findIndex((item) => item.key === compareChoice.value) ||
    0
);

// Watch selectedCompareIndex: when it changes, update compareChoice
watch(selectedCompareIndex, (newIndex) => {
  const option = compareTabItems.value[newIndex];
  if (option) {
    compareChoice.value = option.key;
  }
});

// This computed property returns a display string for the activator button
const selectedComparisonOption = computed(() => {
  const selected = compareItems.find((item) => item.id === compareChoice.value);
  return selected ? selected.name : "Jämför";
});

// When an option is clicked, update the value and close the popover
function selectCompareOption(option) {
  console.log("Option clicked:", option);
  compareChoice.value = option.id;

  console.log("compareChoice now:", compareChoice.value);
}

watch(compareChoice, (newVal) => {
  if (newVal === "none") {
    isCompare.value = false;
    isFrameworkCompareMode.value = false;
  } else if (newVal === "frameworkCompare") {
    isCompare.value = false;
    isFrameworkCompareMode.value = true;
  } else if (newVal === "beforeAfterCompare") {
    isCompare.value = true;
    isFrameworkCompareMode.value = false;
  }
});

watch(isCompare, (newVal) => {
  if (newVal && time.value === 3) {
    time.value = 15;
  }
});

// Function to nudge OpenSeadragonViewer
function nudgeOpenSeadragon() {
  console.log("[modell.vue] Nudging OpenSeadragonViewer...");
  if (singleViewerRef.value?.viewer && currentImagePath.value) {
    // 1) Force-close the current tile
    singleViewerRef.value.viewer.close();

    // 2) Now open the same tile again
    const dziPath = currentImagePath.value.replace(".png", ".png_dzi.dzi");
    singleViewerRef.value.viewer.open(dziPath);

    // 3) Optionally reset or re-center
    singleViewerRef.value.viewer.addHandler("open", () => {
      // For example, goHome + forceRedraw so you see it refresh:
      singleViewerRef.value.viewer.viewport.goHome(true);
      singleViewerRef.value.viewer.forceRedraw();
    });
  }
}
</script>
