<template>
  <div class="grid grid-cols-2 gap-4 mt-12">
    <div>
      <BaseHeading size="xl" weight="light">
        Se hur mykorrhizasvampar påverkas av olika skogsskötsel
      </BaseHeading>
      <BaseHeading size="lg" weight="light" class="text-neutral-500">
        Välj först om skogen har varit kalavverkad tidigare eller inte. I nästa
        steg väljer du skogsbruksätt. Du kan sedan interaktivt undersöka hur
        mykorrhizasvampar påverkas under en skogsgeneration. Valen av
        skogshistorik och skogsskötsel går att ändra justera inne i modellen.
      </BaseHeading>
    </div>
  </div>
  <div class="w-full h-full overflow-auto p-4 pr-2">
    <form class="mx-auto w-full max-w-7xl px-4 pt-12">
      <!-- Header -->
      <div class="pt-8 text-center">
        <p
          class="nui-heading nui-heading-3xl nui-weight-medium nui-lead-normal mb-2"
        >
          Välj skogsbrukssätt
        </p>
        <p
          class="nui-paragraph nui-paragraph-md nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 mb-8"
        >
          Visa hur en metod påverkar mykkorhizasvampar eller jämför flera.
        </p>
      </div>

      <!-- Radio options grid -->
      <div class="w-full">
        <div class="mx-auto w-full">
          <div class="w-full">
            <div class="mx-auto mb-8 grid max-w-5xl gap-6 sm:grid-cols-5">
              <!-- Inga åtgärder -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedFramework"
                :value="0"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-7 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <BaseIconBox
                      size="lg"
                      rounded="none"
                      mask="hexed"
                      class="mx-auto mb-3 max-w-[160px]"
                    >
                      <Icon
                        name="pepicons-pop:tree-circle"
                        class="icon size-9 text-green-400"
                      />
                    </BaseIconBox>
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Inga åtgärder
                    </BaseHeading>
                    <!-- <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Vad som händer när du väljer att inte avverka skogen.
                    </p> -->
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>
              <!-- Trakthygge -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedFramework"
                :value="1"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-7 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <BaseIconBox
                      size="lg"
                      rounded="none"
                      mask="hexed"
                      class="mx-auto mb-3 max-w-[160px]"
                    >
                      <Icon
                        name="material-symbols:resize"
                        class="icon size-10 text-violet-400"
                      />
                    </BaseIconBox>
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Trakthyggesbruk
                    </BaseHeading>
                    <!-- <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Trakthyggesbruk med hänsynsträd och högstubbar.
                    </p> -->
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>

              <!-- Luckhuggning -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedFramework"
                :value="2"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-7 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <BaseIconBox
                      size="lg"
                      rounded="none"
                      mask="hexed"
                      class="mx-auto mb-3 max-w-[160px]"
                    >
                      <Icon
                        name="pixelarticons:chess"
                        class="icon size-9 text-sky-400"
                      />
                    </BaseIconBox>
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Hyggesfritt - luckhuggning
                    </BaseHeading>
                    <!-- <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Luckors storlek, kanteffekt och avverkningsomlopp.
                    </p> -->
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>

              <!-- Skärmträd -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedFramework"
                :value="3"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-7 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <BaseIconBox
                      size="lg"
                      rounded="none"
                      mask="hexed"
                      class="mx-auto mb-3 max-w-[160px]"
                    >
                      <Icon
                        name="catppuccin:redwood"
                        class="icon size-10 text-orange-400"
                      />
                    </BaseIconBox>
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Hyggesfritt - överhållen skärm
                    </BaseHeading>
                    <!-- <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Förberedande gallring, skärmställning och avverkning.
                    </p> -->
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>

              <!-- Blädning -->
              <BaseRadioHeadless
                v-model="onboardingStore.selectedFramework"
                :value="4"
              >
                <BaseCard
                  rounded="lg"
                  class="peer-checked:!border-primary-500 peer-checked:!bg-primary-500/10 relative border-2 p-7 opacity-60 grayscale peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100"
                >
                  <div class="flex flex-col items-center text-center">
                    <BaseIconBox
                      size="lg"
                      rounded="none"
                      mask="hexed"
                      class="mx-auto mb-3 max-w-[160px]"
                    >
                      <Icon
                        name="tabler:christmas-tree-off"
                        class="icon size-9 text-teal-400"
                      />
                    </BaseIconBox>
                    <BaseHeading
                      size="md"
                      weight="medium"
                      class="text-muted-600 dark:text-muted-100"
                    >
                      Hyggesfritt - blädning
                    </BaseHeading>
                    <!-- <p
                      class="nui-paragraph nui-paragraph-xs nui-weight-normal nui-lead-snug text-muted-500 dark:text-muted-400"
                    >
                      Blädningsbruk, ger också bild av enstaka gallring.
                    </p> -->
                  </div>
                  <div class="child absolute end-2 top-3 opacity-0">
                    <Icon
                      name="ph:check-circle-duotone"
                      class="text-primary-500 size-7"
                    />
                  </div>
                </BaseCard>
              </BaseRadioHeadless>
            </div>
          </div>
        </div>

        <!-- Confirmation Button -->
        <div class="mx-auto flex flex-col items-center">
          <NuxtLink to="/skogsbruk/modell">
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

const onboardingStore = useOnboardingStore();

// Watch for changes in the store and log them
watch(
  () => onboardingStore.selectedFramework,
  (newValue) => {
    console.log("Selected Framework value in component:", newValue);
  }
);
</script>
