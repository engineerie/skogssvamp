<template>
  <client-only>
    <div class="transition-all duration-300">
      <MySlideover
        v-model="showSlideover"
        :pinned="isPinned"
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
              <h1 size="3xl" weight="thin" lead="snug" class="mb-2">
                {{
                  selectedTabKey === "framework1"
                    ? currentFramework.label
                    : currentFramework2.label
                }}
              </h1>
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
              <h1 size="lg" weight="medium">Om metoden</h1>
              <h1 weight="thin" size="md" class="text-neutral-500 mb-2">
                {{
                  selectedTabKey === "framework1"
                    ? modalInfo.description
                    : modalInfo2.description
                }}
              </h1>
              <h1 size="lg" weight="medium">Påverkan på mykorrhizasvampar</h1>
              <h1 weight="thin" size="md" class="text-neutral-500 mb-2">
                {{
                  selectedTabKey === "framework1"
                    ? modalInfo.impact
                    : modalInfo2.impact
                }}
              </h1>
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

      <div class="pt-4">
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
                  'icon size-6 transition-all duration-300',
                  currentFramework.iconColor,
                ]"
              />
              <div>
                <!-- Custom popover-based select for main framework -->
                <UPopover
                  :ui="{ rounded: 'rounded-xl' }"
                  :popper="{ placement: 'bottom-start' }"
                >
                  <h1 class="text-neutral-800 text-2xl flex items-center">
                    {{ currentFramework.label }}
                    <Icon
                      name="i-heroicons-chevron-down-solid"
                      class="size-5 ml-1 mt-1"
                    />
                  </h1>

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
                  <h1 class="text-neutral-800 text-2xl">/</h1>

                  <Icon
                    :name="currentFramework2.icon"
                    :class="[
                      ' size-6 transition-all duration-300',
                      currentFramework2.iconColor,
                    ]"
                  />

                  <div>
                    <UPopover
                      :ui="{ rounded: 'rounded-xl' }"
                      :popper="{ placement: 'bottom-start' }"
                    >
                      <h1 class="text-neutral-800 text-2xl flex items-center">
                        {{ currentFramework2.label }}
                        <Icon
                          name="i-heroicons-chevron-down-solid"
                          class="size-5 ml-1 mt-1"
                        />
                      </h1>

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
                <UBadge
                  size="lg"
                  variant="subtle"
                  class="w-full shrink-0"
                  :ui="{ rounded: 'rounded-lg' }"
                  >{{ currentStartskog.label }}
                  <Icon name="i-heroicons-chevron-down-solid" class="ml-1"
                /></UBadge>
                <template #panel>
                  <div class="p-1 flex flex-col gap-1">
                    <div v-for="option in startskog" :key="option.value">
                      <UButton
                        @click="selectOption(option)"
                        color="white"
                        variant="ghost"
                        class="hover:bg-neutral-100 w-full"
                        :class="{
                          ' w-full  text-primary-500':
                            currentStartskog.value === option.value,
                        }"
                        >{{ option.label }}
                      </UButton>
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
              <div class="flex justify-end mb-2">
                <UButton
                  variant="ghost"
                  color="primary"
                  @click="toggleComparisonLayout"
                >
                  Toggle Layout
                </UButton>
              </div>
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
                <div class="absolute w-full justify-between flex p-2 z-10">
                  <UButtonGroup
                    class="size-xs"
                    :ui="{
                      rounded: 'rounded-lg',
                    }"
                  >
                    <UButton
                      color="white"
                      icon="i-fluent-tree-deciduous-20-regular"
                      @click="showTree = !showTree"
                      :ui="{
                        color: {
                          white: {
                            solid: showTree
                              ? 'text-neutral-700 '
                              : 'text-neutral-400',
                          },
                        },
                      }"
                    >
                      Visa träd
                    </UButton>

                    <UButton
                      :ui="{
                        color: {
                          white: {
                            solid: showFungi
                              ? 'text-neutral-700 '
                              : 'text-neutral-400',
                          },
                        },
                      }"
                      color="white"
                      icon="i-fluent-shape-organic-24-regular"
                      @click="showFungi = !showFungi"
                    >
                      Visa svampmycel
                    </UButton>
                    <UButton
                      :ui="{ color: { white: { solid: 'text-neutral-600' } } }"
                      color="white"
                      @click="zoomActiveIn"
                      icon="i-heroicons-magnifying-glass-plus"
                    />
                    <UButton
                      :ui="{ color: { white: { solid: 'text-neutral-600' } } }"
                      color="white"
                      @click="zoomActiveOut"
                      icon="i-heroicons-magnifying-glass-minus"
                    />
                  </UButtonGroup>
                </div>
                <!-- <div class="absolute w-full justify-between flex p-4 z-10">
                  <div>
                    <div class="mb-2">
                      <UButton @click="zoomAllIn" shape="full" size="sm">
                        <Icon
                          name="heroicons:magnifying-glass-plus"
                          class="h-5 w-5"
                        />
                      </UButton>
                    </div>
                    <div class="mb-2">
                      <UButton
                        @click="zoomAllOut"
                        shape="full"
                        size="sm"
                      >
                        <Icon
                          name="heroicons:magnifying-glass-minus-solid"
                          class="h-5 w-5"
                        />
                      </UButton>
                    </div>
                    <div class="mb-2">
                      <UButton
                        shape="full"
                        size="sm"
                        @click="showTree = !showTree"
                      >
                        <Icon
                          name="lucide:trees"
                          class="size-5"
                          :class="{ ' text-primary-500': showTree }"
                        />
                      </UButton>
                    </div>
                    <div class="mb-2">
                      <UButton
                        shape="full"
                        size="sm"
                        @click="showFungi = !showFungi"
                      >
                        <Icon
                          name="fluent:shape-organic-24-filled"
                          class="size-5"
                          :class="{ ' text-primary-500': showFungi }"
                        />
                      </UButton>
                    </div>
                    <div>
                    <UButton @click="resetAll" shape="full">
                      <Icon
                        name="heroicons:magnifying-glass-solid"
                        class="h-5 w-5"
                      />
                    </UButton>
                  </div>
                  </div>
                </div> -->
                <!-- Single View -->
                <div
                  v-if="!isCompare && !isFrameworkCompareMode"
                  class="w-full h-full overflow-hidden rounded-xl relative border border-neutral-200"
                >
                  <OpenSeadragonViewer
                    ref="singleViewerRef"
                    :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                    :allowPan="true"
                    :annotations="filteredAnnotations"
                    :selectedAnnotation="selectedAnnotation"
                    @annotationClicked="handleAnnotationClicked"
                    class="w-full h-full"
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
                  <transition name="slide-out">
                    <div
                      v-if="selectedAnnotation"
                      class="absolute inset-y-0 right-0 p-1.5 m-2 w-64 bg-neutral-50 overflow-auto z-10 pointer-events-auto border-neutral-300 border rounded-xl"
                    >
                      <NuxtImg
                        v-if="selectedAnnotation.thumbnail"
                        :src="selectedAnnotation.thumbnail"
                        width="300"
                        height="300"
                        alt="Thumbnail"
                        class="rounded-xl border border-neutral-300"
                      />
                      <UButton
                        color="white"
                        :ui="{ rounded: 'rounded-full' }"
                        icon="heroicons:x-mark"
                        @click="closeAnnotation"
                        class="absolute bottom-2 right-2"
                      />
                      <div class="px-1.5 py-1">
                        <h3 class="text-lg font-semibold text-neutral-800">
                          {{ selectedAnnotation.title }}
                        </h3>
                        <p class="text-neutral-500">
                          {{ selectedAnnotation.text }}
                        </p>
                      </div>
                    </div>
                  </transition>
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
                      :allowPan="true"
                      @opened="onViewerOpened('before')"
                      @activated="activeViewer.valueOf = 'before'"
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
                      :allowPan="true"
                      @opened="onViewerOpened('after')"
                      @activated="activeViewer.valueOf = 'after'"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
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
                  ref="comparisonSliderRef"
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
                      @activated="activeViewer.valueOf = 'framework1'"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
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
                      @activated="activeViewer.valueOf = 'framework2'"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
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
            <div class="p-2 rounded-lg bg-neutral-200/50 mt-1 flex gap-1">
              <!-- Timeline Info Box -->

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

              <!-- Annotations List -->
              <div
                class="w-64 shrink-0"
                v-if="!isCompare && !isFrameworkCompareMode"
              >
                <ul>
                  <li
                    v-for="annotation in filteredAnnotations"
                    :key="annotation.id"
                    class="mb-0.5"
                  >
                    <UButton
                      :color="
                        selectedAnnotation &&
                        selectedAnnotation.id === annotation.id
                          ? 'green'
                          : 'white'
                      "
                      :variant="
                        selectedAnnotation &&
                        selectedAnnotation.id === annotation.id
                          ? 'soft'
                          : 'solid'
                      "
                      size="xs"
                      class="w-full"
                      @click="handleAnnotationClicked(annotation)"
                    >
                      <template #leading>
                        <Icon
                          :name="annotation.icon"
                          :class="
                            selectedAnnotation &&
                            selectedAnnotation.id === annotation.id
                              ? 'text-green-500'
                              : ['text-' + annotation.color]
                          "
                          class="size-4"
                        />
                      </template>
                      {{ annotation.title }}
                    </UButton>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import SvampLineChart from "~/components/SvampLineChart.vue";
import OpenSeadragonViewer from "~/components/OpenSeadragonViewer.vue";
import { ref, computed, watch } from "vue";
import { useOnboardingStore } from "~/stores/onboardingStore";

import SvampBarChart from "../../components/SvampBarChart.vue";
import frameworkDescriptions from "public/frameworkDescriptions.json";
import annotationsData from "public/annotations.json"; // NEW: import your annotations JSON
import { useSelectedAnnotationStore } from "~/stores/selectedAnnotationStore";

const selectedAnnotationStore = useSelectedAnnotationStore();
const selectedAnnotation = computed(
  () => selectedAnnotationStore.selectedAnnotation
);

// Now, when a marker or button is clicked, call:
function handleAnnotationClicked(annotation) {
  selectedAnnotationStore.setSelectedAnnotation(annotation);
  // Center the viewer on the annotation if it has a valid position.
  if (annotation.position && singleViewerRef.value) {
    // Use the current zoom level to maintain the current scale.
    const currentZoom = singleViewerRef.value.getZoom();
    // Center the viewport on the annotation's x and y coordinates.
    singleViewerRef.value.setZoomAndCenter(currentZoom, annotation.position);
  }
}

function closeAnnotation() {
  selectedAnnotationStore.clearSelectedAnnotation();
}

// Make sure you have a ref attached to your CustomImageComparisonSlider:
const comparisonSliderRef = ref(null);

function toggleComparisonLayout() {
  if (comparisonSliderRef.value && comparisonSliderRef.value.toggleLayoutMode) {
    comparisonSliderRef.value.toggleLayoutMode();
    console.log("Layout mode toggled");
  }
}

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

// Other refs
const frameworksVisible = ref(false);
const showTree = ref(true);
const showFungi = ref(true);
const isFrameworkCompareMode = ref(false);
const isCompare = ref(false);

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
    compareChoice.value = "framework1";
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
    key: String(step.value), // Ensure the key is a string
    label: step.label,
    disabled: isCompare.value && step.value === 3,
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

// Guard flags to prevent infinite loops
let beforeSyncGuard = false;
let afterSyncGuard = false;

// Synchronization handlers for before/after viewers
function beforeViewerSyncHandler() {
  if (afterSyncGuard) return;
  beforeSyncGuard = true;
  const zoom = beforeViewerRef.value?.getZoom();
  const center = beforeViewerRef.value?.getCenter();
  if (zoom && center && afterViewerRef.value) {
    afterViewerRef.value.setZoomAndCenter(zoom, center);
  }
  beforeSyncGuard = false;
}

function afterViewerSyncHandler() {
  if (beforeSyncGuard) return;
  afterSyncGuard = true;
  const zoom = afterViewerRef.value?.getZoom();
  const center = afterViewerRef.value?.getCenter();
  if (zoom && center && beforeViewerRef.value) {
    beforeViewerRef.value.setZoomAndCenter(zoom, center);
  }
  afterSyncGuard = false;
}

function onViewerOpened(source) {
  if (source === "before" && beforeViewerRef.value) {
    beforeViewerRef.value.addSyncHandler("zoom", beforeViewerSyncHandler);
    beforeViewerRef.value.addSyncHandler("pan", beforeViewerSyncHandler);
  } else if (source === "after" && afterViewerRef.value) {
    afterViewerRef.value.addSyncHandler("zoom", afterViewerSyncHandler);
    afterViewerRef.value.addSyncHandler("pan", afterViewerSyncHandler);
  } else if (source === "framework1" && framework1ViewerRef.value) {
    framework1ViewerRef.value.addSyncHandler("zoom", framework1SyncHandler);
    framework1ViewerRef.value.addSyncHandler("pan", framework1SyncHandler);
  } else if (source === "framework2" && framework2ViewerRef.value) {
    framework2ViewerRef.value.addSyncHandler("zoom", framework2SyncHandler);
    framework2ViewerRef.value.addSyncHandler("pan", framework2SyncHandler);
  }
}

// Define new guard flags for framework compare mode:
let framework1SyncGuard = false;
let framework2SyncGuard = false;

// Define sync handler for framework1 viewer.
function framework1SyncHandler() {
  if (framework2SyncGuard) return;
  framework1SyncGuard = true;
  const zoom = framework1ViewerRef.value?.getZoom();
  const center = framework1ViewerRef.value?.getCenter();
  if (zoom && center && framework2ViewerRef.value) {
    framework2ViewerRef.value.setZoomAndCenter(zoom, center);
  }
  framework1SyncGuard = false;
}

// Define sync handler for framework2 viewer.
function framework2SyncHandler() {
  if (framework1SyncGuard) return;
  framework2SyncGuard = true;
  const zoom = framework2ViewerRef.value?.getZoom();
  const center = framework2ViewerRef.value?.getCenter();
  if (zoom && center && framework1ViewerRef.value) {
    framework1ViewerRef.value.setZoomAndCenter(zoom, center);
  }
  framework2SyncGuard = false;
}

const framework1ViewerRef = ref(null);
const framework2ViewerRef = ref(null);

// Viewport synchronization
let viewportChangeSource = null;
const globalViewport = ref({ zoom: 1, center: null });

function onViewportChanged(source, { zoom, center } = {}) {
  if (!zoom || !center) return;
  if (viewportChangeSource !== source) {
    viewportChangeSource = source;
    globalViewport.value = { zoom, center };
  }
}

// Helper: Return an object mapping identifiers to viewer component instances.
function getActiveViewerComponents() {
  if (!isCompare.value && !isFrameworkCompareMode.value) {
    return { single: singleViewerRef.value };
  } else if (isCompare.value) {
    return { before: beforeViewerRef.value, after: afterViewerRef.value };
  } else if (isFrameworkCompareMode.value) {
    return {
      framework1: framework1ViewerRef.value,
      framework2: framework2ViewerRef.value,
    };
  }
  return {};
}

// Whenever globalViewport changes, update all viewers (except the one that was the source).
watch(globalViewport, ({ zoom, center }) => {
  const viewers = getActiveViewerComponents();
  Object.entries(viewers).forEach(([key, viewerComp]) => {
    if (
      key !== viewportChangeSource &&
      viewerComp &&
      viewerComp.setZoomAndCenter
    ) {
      viewerComp.setZoomAndCenter(zoom, center);
    }
  });
});
// Make sure activeViewer is a reactive ref (e.g., 'single', 'before', 'after', 'framework1', 'framework2')
const activeViewer = ref("single");

// Zoom in function
function zoomActiveIn() {
  // Single view mode:
  if (!isCompare.value && !isFrameworkCompareMode.value) {
    singleViewerRef.value?.zoomIn();
    return;
  }

  // Before/After compare mode: default to using "before" as the active viewer
  if (isCompare.value) {
    const newZoom = beforeViewerRef.value?.zoomIn();
    const center = beforeViewerRef.value?.getCenter();
    afterViewerRef.value?.setZoomAndCenter(newZoom, center);
    return;
  }

  // Framework compare mode: default to using "framework1" as the active viewer
  if (isFrameworkCompareMode.value) {
    const newZoom = framework1ViewerRef.value?.zoomIn();
    const center = framework1ViewerRef.value?.getCenter();
    framework2ViewerRef.value?.setZoomAndCenter(newZoom, center);
    return;
  }
}

// Zoom out function (similar logic)

function zoomActiveOut() {
  if (!isCompare.value && !isFrameworkCompareMode.value) {
    singleViewerRef.value?.zoomOut();
    return;
  }

  if (isCompare.value) {
    const newZoom = beforeViewerRef.value?.zoomOut();
    const center = beforeViewerRef.value?.getCenter();
    afterViewerRef.value?.setZoomAndCenter(newZoom, center);
    return;
  }

  if (isFrameworkCompareMode.value) {
    const newZoom = framework1ViewerRef.value?.zoomOut();
    const center = framework1ViewerRef.value?.getCenter();
    framework2ViewerRef.value?.setZoomAndCenter(newZoom, center);
    return;
  }
}

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

const currentTimeValue = computed(() => {
  const step = sliderSteps.value.find((s) => s.value === time.value);
  return step ? step.timeLabel : "";
});

const filteredAnnotations = computed(() => {
  const currentFrameworkValue = currentFramework.value.value;
  const currentTimeLower = currentTimeValue.value.toLowerCase();

  return annotationsData.annotations.flatMap((annotation) => {
    if (annotation.positions && Array.isArray(annotation.positions)) {
      return annotation.positions
        .filter((pos) => {
          // Check if the position's framework matches:
          const matchesFramework = Array.isArray(pos.framework)
            ? pos.framework.includes(currentFrameworkValue)
            : pos.framework === currentFrameworkValue;
          // Check if the position's times array includes the current time:
          const matchesTime = Array.isArray(pos.times)
            ? pos.times.map((t) => t.toLowerCase()).includes(currentTimeLower)
            : pos.times.toLowerCase() === currentTimeLower;
          return matchesFramework && matchesTime;
        })
        .map((pos) => ({
          ...annotation,
          position: {
            x: pos.x,
            y: pos.y,
            placement: pos.placement,
          },
        }));
    } else {
      // For global annotations (without positions) use the original arrays:
      const matchesFramework = Array.isArray(annotation.frameworks)
        ? annotation.frameworks.includes(currentFrameworkValue)
        : annotation.framework === currentFrameworkValue;
      const matchesTime = Array.isArray(annotation.times)
        ? annotation.times
            .map((t) => t.toLowerCase())
            .includes(currentTimeLower)
        : annotation.time.toLowerCase() === currentTimeLower;
      return matchesFramework && matchesTime ? [annotation] : [];
    }
  });
});

// function handleAnnotationClicked(viewerKey, annotation) {
//   if (viewerKey === "single" && singleViewerRef.value?.showPopup) {
//     singleViewerRef.value.showPopup(annotation);
//   } else if (viewerKey === "before" && beforeViewerRef.value?.showPopup) {
//     beforeViewerRef.value.showPopup(annotation);
//   } else if (viewerKey === "after" && afterViewerRef.value?.showPopup) {
//     afterViewerRef.value.showPopup(annotation);
//   } else if (
//     viewerKey === "framework1" &&
//     framework1ViewerRef.value?.showPopup
//   ) {
//     framework1ViewerRef.value.showPopup(annotation);
//   } else if (
//     viewerKey === "framework2" &&
//     framework2ViewerRef.value?.showPopup
//   ) {
//     framework2ViewerRef.value.showPopup(annotation);
//   }
// }

watch(activeViewer, (newVal) => {
  console.log("activeViewer updated to:", newVal);
});
</script>

<style scoped>
.slide-out-enter-active,
.slide-out-leave-active {
  transition: transform 0.3s ease;
}
.slide-out-enter-from,
.slide-out-leave-to {
  transform: translateX(100%);
}
.slide-out-enter-to,
.slide-out-leave-from {
  transform: translateX(0);
}
</style>
