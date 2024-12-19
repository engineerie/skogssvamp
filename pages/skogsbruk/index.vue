<template>
  <div class="flex mt-12">
    <!-- <NuxtImg src="/images/SvamparSverige4.svg" class="w-56" /> -->
    <div
      class="ring-1 ring-neutral-200 rounded-xl flex justify-between overflow-hidden"
    >
      <div class="grid grid-cols-4 bg-neutral-100">
        <div class="p-6 col-span-3">
          <BaseHeading size="xl" weight="light">
            Se hur olika sorters skogsskötsel påverkar mykorrhizasvampar.
          </BaseHeading>
          <BaseHeading size="lg" weight="light" class="text-neutral-500">
            Välj först om skogen har varit kalavverkad tidigare eller är
            nyetablerad. I nästa steg väljer du skogsbruksätt innan du kommer
            till en interaktiv model. Valen av skogshistorik och skogsbrukssätt
            går också att justera inne i modellen.
          </BaseHeading>
        </div>
      </div>
      <NuxtImg
        src="/images/Skogssbruk.svg"
        class="w-80 pt-2 border-l-[1px] border-neutral-200"
      />
    </div>
  </div>

  <div class="w-full h-full overflow-auto p-4 pr-2">
    <form class="mx-auto w-full max-w-7xl px-4 pt-12">
      <!-- Header -->
      <div class="pt-8 text-center">
        <p
          class="nui-heading nui-heading-3xl nui-weight-medium nui-lead-normal mb-2"
        >
          Välj skogshistorik
        </p>
        <p
          class="nui-paragraph nui-paragraph-md nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 mb-8"
        >
          Har skogen varit kalavverkad tidigare, eller är skogen yngre än 150
          år?
        </p>
      </div>

      <!-- Radio options grid -->
      <div class="w-full">
        <div class="mx-auto w-full">
          <div class="w-full">
            <div class="mx-auto mb-8 grid max-w-5xl gap-6 sm:grid-cols-4">
              <div></div>
              <BaseRadioHeadless
                v-model="onboardingStore.selectedStartskog"
                :value="0"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-9 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <img
                      class="mx-auto mt-12 mb-8 max-w-[120px]"
                      src="public/images/SkogsbrukIcons/InteKalavverkad.png"
                    />
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Inte kalavverkad
                    </BaseHeading>
                    <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Skogen kan ha varit brukad men inte kalavverkad.
                    </p>
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>

              <!-- Kalavverkad -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedStartskog"
                :value="1"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-9 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <img
                      src="public/images/SkogsbrukIcons/Kalavverkad.png"
                      class="mx-auto mt-12 mb-8 max-w-[120px]"
                    />
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Kalavverkad
                    </BaseHeading>
                    <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Skogen har varit kalaverkad eller är nyetablerad.
                    </p>
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>
              <div></div>
            </div>
          </div>
        </div>

        <!-- Confirmation Button -->
        <div class="mx-auto flex flex-col items-center">
          <NuxtLink to="/skogsbruk/metod">
            <BaseButton
              shape=""
              size="lg"
              color="primary"
              class="w-32 rounded-xl"
              >Nästa</BaseButton
            ></NuxtLink
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useOnboardingStore } from "~/stores/onboardingStore";
import { watch } from "vue";

const onboardingStore = useOnboardingStore();

// Watch for changes in the store and log them
watch(
  () => onboardingStore.selectedStartskog,
  (newValue) => {
    console.log("Selected Startskog value in component:", newValue);
  }
);
</script>
