<template>
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
                      src="images/SkogsbrukIcons/InteKalavverkad.svg"
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
                      src="images/SkogsbrukIcons/Kalavverkad.svg"
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
          <NuxtLink to="skogsbruk/metod">
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
