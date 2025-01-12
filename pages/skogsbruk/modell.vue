<template>
  <client-only>
    <div
      class="transition-all duration-300"
      :class="
        isFullScreen
          ? 'fixed left-0 inset-0 w-screen h-screen z-50 bg-white overflow-hidden flex flex-row'
          : ''
      "
    >
      <!-- When fullscreen, we have a flex container: left is image area, right is side panel -->
      <!-- When not fullscreen, revert to original layout -->
      <template v-if="isFullScreen">
        <!-- Fullscreen Mode -->

        <!-- Left Side (Image Area) -->
        <div class="relative flex-1 h-full bg-white">
          <!-- Framework Dropdown (top right corner of entire screen) -->
          <div
            class="w-full z-50 pt-3 pb-1 px-5 flex justify-between bg-white absolute border-b border-neutral-300"
            v-if="!frameworksVisible"
          >
            <!-- Same framework dropdown as before, but now absolutely positioned -->

            <div class="flex gap-2 items-center mb-2">
              <!-- Existing Framework Selection Dropdown -->
              <Icon
                :name="currentFramework.icon"
                :class="[
                  'icon size-10 transition-all duration-300',
                  currentFramework.iconColor,
                ]"
              />
              <!-- <div class="text-neutral-800">
                <BaseDropdown
                  flavor="text"
                  class="text-xl font-thin text-black frameworktitle"
                  :label="currentFramework.label"
                  placement="bottom-start"
                  shape="full"
                  button-color="muted"
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
                <p class="text-md text-neutral-400">
                  {{ currentStartskog.label }}
                </p>
              </div> -->
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
                <!-- <p class="text-md text-gray-400">
                  {{ currentStartskog.label }}
                </p> -->

                <UBadge
                  v-if="currentStartskog.value === 'produktionsskog_'"
                  :ui="{ rounded: 'rounded-full' }"
                  color="violet"
                  variant="outline"
                  size="sm"
                  class="opacity-80"
                >
                  Tidigare kalavverkad
                </UBadge>
              </div>
            </div>

            <!-- Compare UI (top right corner of the image area, left of sidepanel) -->
            <div class="z-50 items-center flex gap-2">
              <!-- The same logic for displaying Jämför dropdown or compare modes -->
              <div>
                <!-- <BaseDropdown
                flavor="button"
                class="inline-block text-neural-400 rounded-full"
                placement="bottom-end"
                label="Jämför"
                shape="full"
              >
                <template #activator>
                  <BaseButtonIcon shape="full">
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
              </BaseDropdown> -->
              </div>

              <template v-if="isFrameworkCompareMode">
                <div class="flex gap-2 items-center mr-4 z-10">
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
                    <!-- <BaseButtonClose
                    rounded="full"
                    color="danger"
                    @click="onClickFrameworkCompare"
                    class="absolute -top-3 -right-3 size-5"
                  /> -->
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

              <!-- <template v-else-if="isCompare">
              <div
                class="flex items-center gap-2 text-xl font-thin text-neutral-400 relative mr-4"
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
                  <BaseButtonClose
                    rounded="full"
                    color="danger"
                    @click="onClickBeforeAfterCompare"
                    class="absolute -top-3 -right-3 size-5"
                  />

                  <Icon
                    :name="currentTimeIcon"
                    class="icon size-11 text-primary-500"
                  />
                </div>
              </div>
            </template> -->
            </div>
          </div>

          <!-- Image / Comparison Area -->
          <div class="absolute inset-0 z-0 w-full h-full">
            <!-- Use the same logic as before for single view, compare modes, etc. -->
            <!-- Ensure w-full h-full are applied so the viewers scale in fullscreen -->
            <div
              class="absolute w-full justify-between flex p-4 z-10 left-0 top-20"
            >
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
                  <BaseButtonIcon @click="zoomAllOut" shape="full" size="sm">
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
              class="w-full h-full relative"
            >
              <OpenSeadragonViewer
                :key="currentImagePath"
                ref="singleViewerRef"
                :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                @viewportChanged="
                  ($event) => onViewportChanged('single', $event)
                "
                @opened="onViewerOpened('single')"
                class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                :class="
                  isFullScreen
                    ? 'rounded-none border-none overflow-visible'
                    : ''
                "
              />
              <UBadge
                size="xs"
                :label="currentTimeLabel"
                color="white"
                variant="solid"
                class="absolute bottom-28 left-4"
              />
              <UBadge
                size="xs"
                :label="currentFramework.label"
                color="white"
                variant="solid"
                class="absolute bottom-36 left-4"
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
              v-else-if="isCompare"
              ref="comparisonSliderRef"
              class="z-0 w-full h-full p-0! m-0!"
            >
              <div class="relative w-full h-full" slot="first">
                <OpenSeadragonViewer
                  :key="currentImagePath"
                  ref="beforeViewerRef"
                  :dziUrl="comparisonImagePath1.replace('.png', '.png_dzi.dzi')"
                  @viewportChanged="
                    ($event) => onViewportChanged('before', $event)
                  "
                  @opened="onViewerOpened('before')"
                  class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                  :class="
                    isFullScreen
                      ? 'rounded-none border-none overflow-visible'
                      : ''
                  "
                />
                <UBadge
                  size="xs"
                  label="Före avverkning"
                  color="white"
                  variant="solid"
                  class="absolute bottom-28 left-4"
                />
                <UBadge
                  size="xs"
                  :label="currentFramework.label"
                  color="white"
                  variant="solid"
                  class="absolute bottom-36 left-4"
                />
              </div>
              <div class="w-full h-screen" slot="second">
                <OpenSeadragonViewer
                  :key="currentImagePath2"
                  ref="afterViewerRef"
                  :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                  @viewportChanged="
                    ($event) => onViewportChanged('after', $event)
                  "
                  @opened="onViewerOpened('after')"
                  class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                  :class="
                    isFullScreen
                      ? 'rounded-none border-none overflow-visible'
                      : ''
                  "
                />
                <UBadge
                  size="xs"
                  :label="currentTimeLabel"
                  color="white"
                  variant="solid"
                  class="absolute bottom-28 right-4"
                />
                <UBadge
                  size="xs"
                  :label="currentFramework.label"
                  color="white"
                  variant="solid"
                  class="absolute bottom-36 right-4"
                />
              </div>
            </img-comparison-slider>

            <!-- Framework Compare -->
            <img-comparison-slider
              v-else-if="isFrameworkCompareMode"
              class="z-0 w-full h-full p-0! m-0!"
            >
              <div
                class="relative w-full h-screen pointer-events-none"
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
                  class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
                  :class="
                    isFullScreen
                      ? 'rounded-none border-none overflow-visible'
                      : ''
                  "
                />
                <UBadge
                  size="xs"
                  :label="currentTimeLabel"
                  color="white"
                  variant="solid"
                  class="absolute bottom-28 left-4"
                />
                <UBadge
                  size="xs"
                  :label="currentFramework.label"
                  color="white"
                  variant="solid"
                  class="absolute bottom-36 left-4"
                />
              </div>
              <div
                class="relative w-full h-screen pointer-events-none"
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
                  class="w-full h-full rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 pointer-events-none overflow-hidden"
                  :class="
                    isFullScreen
                      ? 'rounded-none border-none overflow-visible'
                      : ''
                  "
                />
                <UBadge
                  size="xs"
                  :label="currentTimeLabel"
                  color="white"
                  variant="solid"
                  class="absolute bottom-28 right-4"
                />
                <UBadge
                  size="xs"
                  :label="currentFramework2.label"
                  color="white"
                  variant="solid"
                  class="absolute bottom-36 right-4"
                />
              </div>
            </img-comparison-slider>
          </div>

          <!-- Timeline at the bottom of the image area -->
          <div
            class="absolute bottom-0 bg-neutral-50/90 backdrop-blur-xl z-50 p-5 w-full"
          >
            <div class="slider-container flex flex-col items-center w-full">
              <BaseProgress
                title="Default progress bar"
                size="sm"
                :value="time"
                color="primary"
              />
              <div class="flex justify-between items-center w-full mt-4 gap-10">
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

        <!-- Side Panel (Right) -->
        <div
          class="relative w-[400px] h-full bg-neutral-50 overflow-auto p-4 border-l-[1px] border-neutral-300"
        >
          <!-- <div class="flex gap-3">
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
                <BaseHeading size="md" weight="thin" class="text-neutral-600">
                  {{ currentFramework.label }}
                </BaseHeading>
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
                  >
                    {{ currentFramework.label }}
                  </BaseHeading>
                </div>
                <BaseProse class="text-sm font-neutral-500">
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
                  <BaseHeading
                    size="2xl"
                    weight="thin"
                    class="text-neutral-600"
                  >
                    {{ currentFramework2.label }}
                  </BaseHeading>
                </div>
                <BaseProse class="text-sm font-neutral-500">
                </BaseProse>
              </div>
            </UModal>
          </div> -->
          <div class="flex justify-end items-end mb-3 gap-2 -mt-3">
            <BaseListbox
              v-model="compareChoice"
              placeholder="Jämför"
              label="Jämför"
              :items="compareItems"
              :properties="{
                value: 'id',
                label: 'name',
                sublabel: 'text',
                icon: 'icon',
              }"
              size="md"
              shape="full"
              class="text-neutral-400 w-72 ps-4"
            />
            <BaseButtonIcon shape="full" @click="toggleFullScreen">
              <Icon
                v-if="!isFullScreen"
                name="material-symbols:open-in-full"
                class="size-5"
              />
              <Icon
                v-else
                name="material-symbols:close-fullscreen"
                class="size-5"
              />
            </BaseButtonIcon>
          </div>
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
          />

          <BarChartSkogsbruk
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
          />
          <BarChartSkogsbrukRödMat
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
          />
        </div>
      </template>

      <template v-else>
        <!-- Normal Mode (Your original layout) -->
        <!-- Just place your original code here as it was before the fullscreen changes -->
        <!-- ... original non-fullscreen code ... -->
        <!-- For brevity, not included fully here. Restore from your working version. -->

        <div class="pt-8">
          <div class="w-full grid grid-cols-4">
            <div
              class="col-span-3 items-center flex relative justify-between"
              v-if="!frameworksVisible"
            >
              <div class="flex gap-2 items-center">
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
                  <!-- <p class="text-md text-gray-400">
                  {{ currentStartskog.label }}
                </p> -->

                  <UBadge
                    v-if="currentStartskog.value === 'produktionsskog_'"
                    :ui="{ rounded: 'rounded-full' }"
                    color="violet"
                    variant="outline"
                    size="sm"
                    class="opacity-80"
                  >
                    Tidigare kalavverkad
                  </UBadge>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- If NOT in framework compare mode AND NOT in before/after compare mode -->

                <!-- If in framework compare mode -->
                <template v-if="isFrameworkCompareMode">
                  <div class="flex gap-2 items-center">
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
                      <!-- <BaseButtonClose
                      rounded="full"
                      color="default"
                      @click="onClickFrameworkCompare"
                      class="absolute -top-3 -right-3 size-5"
                    /> -->

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
                <!-- <template v-else-if="isCompare">
                <div
                  class="flex items-center gap-2 text-xl font-thin text-neutral-400 relative mr-4"
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
                    <BaseButtonClose
                      rounded="full"
                      color="default"
                      @click="onClickBeforeAfterCompare"
                      class="absolute -top-3 -right-3 size-5"
                    />
                    <Icon
                      :name="currentTimeIcon"
                      class="icon size-10 text-primary-500"
                    />
                  </div>
                </div>
              </template> -->
              </div>
            </div>
            <div class="flex justify-end items-end gap-2 mb-3">
              <div>
                <!-- <BaseDropdown
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
              </BaseDropdown> -->
                <BaseListbox
                  v-model="compareChoice"
                  placeholder="Jämför"
                  label="Jämför"
                  :items="compareItems"
                  :properties="{
                    value: 'id',
                    label: 'name',
                    sublabel: 'text',
                    icon: 'icon',
                  }"
                  size="md"
                  shape="full"
                  class="text-neutral-400 w-72 ps-4"
                />
              </div>
              <BaseButtonIcon shape="full" @click="toggleFullScreen">
                <Icon
                  v-if="!isFullScreen"
                  name="material-symbols:open-in-full"
                  class="size-5"
                />
                <Icon
                  v-else
                  name="material-symbols:close-fullscreen"
                  class="size-5"
                />
              </BaseButtonIcon>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-5">
            <div class="col-span-3">
              <div class="relative">
                <!-- External zoom controls -->
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
                  class="relative w-full h-[650px]"
                >
                  <OpenSeadragonViewer
                    :key="currentImagePath"
                    ref="singleViewerRef"
                    :dziUrl="currentImagePath.replace('.png', '.png_dzi.dzi')"
                    @viewportChanged="
                      ($event) => onViewportChanged('single', $event)
                    "
                    @opened="onViewerOpened('single')"
                    class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                  />
                  <UBadge
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
                      :dziUrl="
                        comparisonImagePath1.replace('.png', '.png_dzi.dzi')
                      "
                      @viewportChanged="
                        ($event) => onViewportChanged('before', $event)
                      "
                      @opened="onViewerOpened('before')"
                      class="w-full h-full z-0 rounded-xl border-[0.5px] border-neutral-300 dark:border-neutral-800 overflow-hidden"
                    />
                    <UBadge
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
                    <UBadge
                      size="xs"
                      :label="currentFramework.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 right-4"
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
                    <UBadge
                      size="xs"
                      :label="currentFramework.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 left-4"
                    />
                  </div>
                  <div
                    class="relative w-full h-[650px] pointer-events-none"
                    slot="second"
                  >
                    <OpenSeadragonViewer
                      :key="currentImagePath2"
                      ref="framework2ViewerRef"
                      :dziUrl="
                        currentImagePath2.replace('.png', '.png_dzi.dzi')
                      "
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
                    <UBadge
                      size="xs"
                      :label="currentFramework2.label"
                      color="white"
                      variant="solid"
                      class="absolute bottom-12 right-4"
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
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="relative backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-20 mt-3.5 p-6 object-bottom"
                >
                  <BaseHeading size="md">Svampgrupper</BaseHeading>
                  <BaseHeading
                    size="sm"
                    weight="thin"
                    class="text-neutral-500 mb-4"
                    >Visar hur stor del av den totala svampmängden olika grupper
                    utgör inom avverkningsytan</BaseHeading
                  >
                  <BarChartSkogsbruk
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
                    class="h-full inline-block align-bottom"
                  />
                </div>
                <div
                  class="relative backdrop-blur-3xl overflow-clip rounded-xl bg-white bg-opacity-80 dark:bg-neutral-700 dark:bg-opacity-20 border dark:border-neutral-600 dark:border-opacity-30 border-stone-20 mt-3.5 p-6 object-bottom"
                >
                  <BaseHeading size="md">Rödlistade och matsvampar</BaseHeading>
                  <BaseHeading
                    size="sm"
                    weight="thin"
                    class="text-neutral-500 mb-4"
                    >Visar hur stor del av den totala svampmängden olika grupper
                    utgör inom avverkningsytan</BaseHeading
                  >

                  <BarChartSkogsbrukRödMat
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
                    class="h-full"
                  />
                </div>
              </div>
            </div>

            <div class="p-4 bg-white bg-opacity-50 rounded-xl h-fit">
              <!-- <div class="flex gap-3">
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
                  <BaseHeading
                    size="md"
                    weight="thin"
                    class="text-neutral-600"
                    >{{ currentFramework.label }}</BaseHeading
                  >
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
                    >
                      {{ currentFramework.label }}
                    </BaseHeading>
                  </div>
                  <BaseProse class="text-sm font-neutral-500">
                    <b>Beskrivning skogsbrukssätt</b>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus rhoncus facilisis ornare. Donec ullamcorper
                    fermentum sem rhoncus commodo. Phasellus convallis dapibus
                    sodales. Proin placerat eros sed ligula dignissim
                    ullamcorper. Vivamus faucibus imperdiet arcu, non
                    ullamcorper nunc varius iaculis. Phasellus et lorem eu lacus
                    scelerisque porta non elementum turpis. Sed bibendum
                    interdum pretium.
                    <br /><br />

                    Vestibulum vestibulum in ante at gravida. Curabitur nec leo
                    eget odio feugiat gravida. Suspendisse iaculis nibh mauris,
                    at interdum velit tristique nec. Class aptent taciti
                    sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos.
                    <br />
                    <br />
                    <b>Skogsbrukssättetets påverkan på mykkorhizasvampar</b>
                    <br />

                    Duis fringilla non purus lobortis sollicitudin. Nunc
                    pharetra fermentum tincidunt. Donec interdum dolor lectus,
                    ac ultricies lorem lobortis quis. Mauris aliquet vel nulla
                    vitae viverra. Etiam ut quam vel eros consectetur lobortis.
                    Proin rutrum justo erat, vitae laoreet dui rutrum eu. Proin
                    elementum malesuada volutpat. In condimentum sem risus,
                    vitae varius massa euismod ut.
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
                    <BaseHeading
                      size="2xl"
                      weight="thin"
                      class="text-neutral-600"
                    >
                      {{ currentFramework2.label }}
                    </BaseHeading>
                  </div>
                  <BaseProse class="text-sm font-neutral-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus rhoncus facilisis ornare. Donec ullamcorper
                    fermentum sem rhoncus commodo. Phasellus convallis dapibus
                    sodales. Proin placerat eros sed ligula dignissim
                    ullamcorper. Vivamus faucibus imperdiet arcu, non
                    ullamcorper nunc varius iaculis. Phasellus et lorem eu lacus
                    scelerisque porta non elementum turpis. Sed bibendum
                    interdum pretium.
                    <br /><br />

                    Vestibulum vestibulum in ante at gravida. Curabitur nec leo
                    eget odio feugiat gravida. Suspendisse iaculis nibh mauris,
                    at interdum velit tristique nec. Class aptent taciti
                    sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos.
                    <br />
                    <br />

                    Duis fringilla non purus lobortis sollicitudin. Nunc
                    pharetra fermentum tincidunt. Donec interdum dolor lectus,
                    ac ultricies lorem lobortis quis. Mauris aliquet vel nulla
                    vitae viverra. Etiam ut quam vel eros consectetur lobortis.
                    Proin rutrum justo erat, vitae laoreet dui rutrum eu. Proin
                    elementum malesuada volutpat. In condimentum sem risus,
                    vitae varius massa euismod ut.
                  </BaseProse>
                </div>
              </UModal>
            </div> -->
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
              />
            </div>
          </div>
        </div>
      </template>

      <!-- <ForestryTimeLine /> -->
    </div>
  </client-only>
</template>

<script setup>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";
import Circle from "~/components/Circle.vue";
import BarChart from "~/components/BarChartSkogsbruk.vue";
import BarChartSkogsbrukRödMat from "~/components/BarChartSkogsbrukRödMat.vue";
import OpenSeadragonViewer from "~/components/OpenSeadragonViewer.vue";
import { ref, computed, watch, nextTick } from "vue";
import { useOnboardingStore } from "~/stores/onboardingStore";
import circleDataJson from "public/circles.json";

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
const isFullScreen = ref(false);

// Define selectedFrameworkIndex
const selectedFrameworkIndex = computed({
  get: () => onboardingStore.selectedFramework,
  set: (value) => (onboardingStore.selectedFramework = value),
});

// Define selectedStartskogIndex
const selectedStartskogIndex = computed({
  get: () => onboardingStore.selectedStartskog,
  set: (value) => (onboardingStore.selectedStartskog = value),
});

// Define selectedFrameworkIndex2 as an independent ref
const selectedFrameworkIndex2 = ref(selectedFrameworkIndex.value);
const currentFramework2 = computed(
  () => frameworks[selectedFrameworkIndex2.value]
);

// Frameworks array
const frameworks = [
  {
    id: 0,
    label: "Ingen åtgärd",
    value: "naturskydd",
    text: "Orörd skog",
    icon: "pepicons-pop:tree-circle",
    iconColor: "text-green-400",
  },
  {
    id: 1,
    label: "Trakthygge",
    value: "trakthygge",
    text: "Kalavverkning med hänsyn",
    icon: "material-symbols:resize",
    iconColor: "text-violet-400",
  },
  {
    id: 2,
    label: "Luckhuggning",
    value: "luckhuggning",
    text: "Mindre ytor kalavverkas",
    icon: "pixelarticons:chess",
    iconColor: "text-sky-400",
  },
  {
    id: 3,
    label: "Överhållen skärm",
    value: "skärmträd",
    text: "Överhållen skärm",
    icon: "catppuccin:redwood",
    iconColor: "text-orange-400",
  },
  {
    id: 4,
    label: "Blädning",
    value: "blädning",
    text: "Stora träd gallras",
    icon: "tabler:christmas-tree-off",
    iconColor: "text-teal-400",
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
const currentStartskog = computed(
  () => startskog[selectedStartskogIndex.value]
);

// Initialize startskogModel based on selectedStartskogIndex
const startskogModel = ref(
  selectedStartskogIndex.value === 1 ? ["produktionsskog"] : []
);

// Watch for changes in selectedStartskogIndex and update startskogModel
watch(selectedStartskogIndex, (newVal) => {
  startskogModel.value = newVal === 1 ? ["produktionsskog"] : [];
});

// Watch startskogModel and update selectedStartskogIndex accordingly
watch(startskogModel, (newVal) => {
  selectedStartskogIndex.value = newVal.includes("produktionsskog") ? 1 : 0;
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
    { value: 15, label: "Efter avverkning", timeLabel: "efter" },
  ];
  if (
    currentFramework.value?.value === "skärmträd" &&
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
  return `/images/Skogsbruksbilder/${framework}_${timeLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
});

const currentImagePath2 = computed(() => {
  const framework = currentFramework2.value.value.toLowerCase();
  const tLabel = mapTimeToLabel(time.value);
  const treeVisibility = showTree.value ? "visa" : "dölj";
  const fungiVisibility = showFungi.value ? "visa" : "dölj";
  const startskogValue = currentStartskog.value.value;
  return `/images/Skogsbruksbilder/${framework}_${tLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
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
  return `/images/Skogsbruksbilder/${framework}_${tLabel}_${fungiVisibility}_${treeVisibility}_${startskogValue}.png`;
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

// Fullscreen toggling
function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value;
  nextTick(() => {
    applyGlobalViewportToAll();
  });
}

// Compare choices
const compareChoice = ref({
  id: "none",
  name: "Ingen jämförelse",
  text: "Återgå till enkel vy",
  icon: "i-mynaui:rectangle",
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
    name: "Skogsskötsel",
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

// Watch compareChoice changes
watch(compareChoice, (newVal, oldVal) => {
  console.log("compareChoice changed from", oldVal, "to", newVal);
  if (!newVal || !newVal.id) return; // Safety check

  if (newVal.id === "none") {
    isCompare.value = false;
    isFrameworkCompareMode.value = false;
  } else if (newVal.id === "frameworkCompare") {
    console.log("Calling onClickFrameworkCompare()");
    onClickFrameworkCompare();
  } else if (newVal.id === "beforeAfterCompare") {
    console.log("Calling onClickBeforeAfterCompare()");
    onClickBeforeAfterCompare();
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

<style scoped>
.slider-example-focus:focus {
  outline: none;
}

.frameworktitle {
  color: black;
}
</style>
