<template>
  <div class="py-16">
    <div class="container mx-auto px-6">
      <BaseHeading size="4xl" class="font-bold text-center mb-12">
        Vilka svampar kan jag se?
      </BaseHeading>
      <!-- <BaseHeading size="2xl" class="font-bold text-center mb-12">
        För tillfället visar vi enbart trädmykorrhiza. Mykorrhizasvampar som
        level med trädrötter.
      </BaseHeading> -->
      <div class="flex flex-col lg:flex-row">
        <!-- Tabs/List on the left -->
        <div class="lg:w-1/3">
          <ul>
            <li
              @click="activeTab = 1"
              :class="{ 'opacity-50 hover:opacity-100': activeTab != 1 }"
              class="cursor-pointer"
            >
              <div>
                <!-- <BaseIconBox
                  size="md"
                  rounded="none"
                  variant="pastel"
                  color="muted"
                  mask="blob"
                  class="absolute right-2 top-2"
                >
                  <Icon name="solar:dna-bold-duotone" class="size-6" />
                </BaseIconBox> -->
                <div class="flex items-end">
                  <div
                    class="dark:opacity-90 w-9 h-9 ml-2 mr-3 rounded-lg text-violet-500 flex justify-center items-center"
                  >
                    <Icon name="solar:dna-linear" class="h-10 w-10" />
                  </div>
                  <BaseHeading
                    size="2xl"
                    weight="medium"
                    class="text-neutral-800 dark:text-neutral-200"
                    >DNA Mykorrhiza</BaseHeading
                  >
                </div>
                <BaseProse class="ml-2 my-4 text-lg text-neutral-500">
                  Mykorrhizasvampar identifierade genom DNA-analyser från
                  Markinventeringens undersökningar
                </BaseProse>
              </div>
            </li>
            <li
              @click="activeTab = 2"
              :class="{ 'font-bold': activeTab === 2 }"
              class="cursor-pointer"
            >
              <div>
                <!-- <BaseIconBox
                  size="md"
                  rounded="none"
                  variant="pastel"
                  color="muted"
                  mask="blob"
                  class="absolute right-2 top-2"
                >
                  <Icon name="solar:dna-bold-duotone" class="size-6" />
                </BaseIconBox> -->
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
                    class="text-neutral-800 dark:text-neutral-200"
                    >Naturvårdsarter</BaseHeading
                  >
                </div>
                <BaseProse class="ml-2 my-4 text-lg text-neutral-500">
                  Svampar som är viktiga för naturvård, baserade på sakkunnigas
                  kunskap och observationer av fruktkroppar.
                </BaseProse>
              </div>
            </li>
            <li
              @click="activeTab = 3"
              :class="{ 'font-bold': activeTab === 3 }"
              class="cursor-pointer"
            >
              <div>
                <!-- <BaseIconBox
                  size="md"
                  rounded="none"
                  variant="pastel"
                  color="muted"
                  mask="blob"
                  class="absolute right-2 top-2"
                >
                  <Icon name="solar:dna-bold-duotone" class="size-6" />
                </BaseIconBox> -->
                <div class="flex items-end">
                  <div
                    class="dark:opacity-90 w-9 h-9 ml-2 mr-3 rounded-lg text-yellow-500 flex justify-center items-center"
                  >
                    <Icon name="icon-park-solid:knife-fork" class="h-10 w-10" />
                  </div>
                  <BaseHeading
                    size="2xl"
                    weight="medium"
                    class="text-neutral-800 dark:text-neutral-200"
                    >Matsvampar</BaseHeading
                  >
                </div>
                <BaseProse class="ml-2 my-4 text-lg text-neutral-500">
                  Ätbara svampar baserade på sakkunnigas bedömningar och
                  rapporter av fruktkroppar.
                </BaseProse>
              </div>
            </li>
          </ul>
        </div>
        <!-- Content/Image on the right -->
        <div class="lg:w-2/3 mt-8 lg:mt-0 lg:pl-12">
          <div v-if="activeTab === 1">
            <div
              class="relative w-full pb-[56.25%] bg-transparent border border-violet-300 rounded-2xl cursor-pointer"
              style="
                background-image: repeating-linear-gradient(
                  -45deg,
                  rgba(196, 181, 253, 0.1) 0px,
                  rgba(196, 181, 253, 0.1) 5px,
                  transparent 5px,
                  transparent 10px
                );
              "
            ></div>
          </div>
          <div v-else-if="activeTab === 2">
            <div
              class="relative w-full pb-[56.25%] bg-transparent border border-teal-300 rounded-2xl cursor-pointer"
              style="
                background-image: repeating-linear-gradient(
                  -45deg,
                  rgba(94, 234, 212, 0.1) 0px,
                  rgba(94, 234, 212, 0.1) 5px,
                  transparent 5px,
                  transparent 10px
                );
              "
            ></div>
          </div>
          <div v-else-if="activeTab === 3">
            <div
              class="relative w-full pb-[56.25%] bg-transparent border border-yellow-300 rounded-2xl cursor-pointer"
              style="
                background-image: repeating-linear-gradient(
                  -45deg,
                  rgba(253, 224, 71, 0.1) 0px,
                  rgba(253, 224, 71, 0.1) 5px,
                  transparent 5px,
                  transparent 10px
                );
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const activeTab = ref(1);
</script>

<style scoped>
li {
  padding: 0.5rem;
}
</style>
